#!/bin/bash
# =============================================================================
# Ollama + Gemma 4 Kurulum Scripti
# VS Code Claude Code eklentisi icin yerel model yapilandirmasi
# =============================================================================
#
# Kullanim:
#   chmod +x scripts/setup-ollama-gemma4.sh
#   ./scripts/setup-ollama-gemma4.sh
#
# Not: Bu script yerel makinenizde calistirilmalidir (sunucu degil).
# =============================================================================

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
warn()  { echo -e "${YELLOW}[UYARI]${NC} $1"; }
error() { echo -e "${RED}[HATA]${NC} $1"; exit 1; }

# -----------------------------------------------------------------------------
# 1. Ollama Kurulumu
# -----------------------------------------------------------------------------
install_ollama() {
    if command -v ollama &>/dev/null; then
        local version
        version=$(ollama --version 2>/dev/null || echo "bilinmiyor")
        info "Ollama zaten yuklu: $version"
        info "Guncelleme kontrol ediliyor..."
        curl -fsSL https://ollama.com/install.sh | sh
    else
        info "Ollama kuruluyor..."
        curl -fsSL https://ollama.com/install.sh | sh
    fi

    if ! command -v ollama &>/dev/null; then
        error "Ollama kurulumu basarisiz!"
    fi
    info "Ollama kurulumu basarili: $(ollama --version)"
}

# -----------------------------------------------------------------------------
# 2. Ollama Servisini Baslat
# -----------------------------------------------------------------------------
start_ollama() {
    if curl -s http://localhost:11434/api/tags &>/dev/null; then
        info "Ollama servisi zaten calisiyor."
    else
        info "Ollama servisi baslatiliyor..."
        ollama serve &>/dev/null &
        sleep 3
        if ! curl -s http://localhost:11434/api/tags &>/dev/null; then
            error "Ollama servisi baslatilamadi! 'ollama serve' komutunu manuel calistirin."
        fi
        info "Ollama servisi baslatildi."
    fi
}

# -----------------------------------------------------------------------------
# 3. Gemma 4 Modelini Indir
# -----------------------------------------------------------------------------
pull_gemma4() {
    local model="gemma4"

    # RAM kontrolu - model boyutunu secmek icin
    local total_ram_gb
    if [[ "$(uname)" == "Darwin" ]]; then
        total_ram_gb=$(( $(sysctl -n hw.memsize) / 1073741824 ))
    else
        total_ram_gb=$(( $(grep MemTotal /proc/meminfo | awk '{print $2}') / 1048576 ))
    fi

    info "Toplam RAM: ${total_ram_gb}GB"

    if [ "$total_ram_gb" -lt 8 ]; then
        warn "RAM yetersiz (${total_ram_gb}GB). Gemma 4 icin en az 8GB oneriliyor."
        model="gemma4:e2b"
        warn "Kucuk model kullanilacak: $model"
    elif [ "$total_ram_gb" -lt 16 ]; then
        model="gemma4:e4b"
        info "Model secildi: $model (4B parametre - 8-16GB RAM icin uygun)"
    elif [ "$total_ram_gb" -ge 32 ]; then
        model="gemma4:26b"
        info "Model secildi: $model (26B parametre - 32GB+ RAM icin)"
    else
        model="gemma4:e4b"
        info "Model secildi: $model (4B parametre - 16GB RAM icin ideal)"
    fi

    info "Gemma 4 indiriliyor: $model (bu islem birkac dakika surebilir)..."
    ollama pull "$model"
    info "Model basariyla indirildi: $model"

    # Context window ayari icin Modelfile olustur (64K token)
    local modelfile_dir="$HOME/.ollama/modelfiles"
    mkdir -p "$modelfile_dir"
    cat > "$modelfile_dir/gemma4-claude" << EOF
FROM $model
PARAMETER num_ctx 65536
EOF

    info "Claude Code icin genisletilmis context window modeli olusturuluyor..."
    ollama create "gemma4-claude" -f "$modelfile_dir/gemma4-claude"
    info "Model 'gemma4-claude' olusturuldu (64K context window)."

    echo "$model"
}

# -----------------------------------------------------------------------------
# 4. Claude Code Yapilandirmasi
# -----------------------------------------------------------------------------
configure_claude_code() {
    local claude_settings_dir="$HOME/.claude"
    mkdir -p "$claude_settings_dir"

    local settings_file="$claude_settings_dir/settings.json"

    if [ -f "$settings_file" ]; then
        info "Mevcut Claude Code ayarlari yedekleniyor..."
        cp "$settings_file" "${settings_file}.backup.$(date +%Y%m%d_%H%M%S)"
    fi

    # Mevcut settings'i oku veya bos olustur
    if [ -f "$settings_file" ] && command -v jq &>/dev/null; then
        # jq ile mevcut ayarlara env ekle
        local tmp_file
        tmp_file=$(mktemp)
        jq '. + {
            "env": {
                "ANTHROPIC_BASE_URL": "http://localhost:11434",
                "ANTHROPIC_AUTH_TOKEN": "ollama",
                "ANTHROPIC_API_KEY": ""
            }
        }' "$settings_file" > "$tmp_file" && mv "$tmp_file" "$settings_file"
    else
        # jq yoksa veya dosya yoksa, yeni olustur
        cat > "$settings_file" << 'EOF'
{
    "env": {
        "ANTHROPIC_BASE_URL": "http://localhost:11434",
        "ANTHROPIC_AUTH_TOKEN": "ollama",
        "ANTHROPIC_API_KEY": ""
    }
}
EOF
    fi

    info "Claude Code ayarlari guncellendi: $settings_file"
}

# -----------------------------------------------------------------------------
# 5. VS Code Workspace Ayarlari
# -----------------------------------------------------------------------------
configure_vscode() {
    # Proje dizinini bul (scriptin bulundugu dizinin bir ust dizini)
    local project_dir
    project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
    local vscode_dir="$project_dir/.vscode"
    local settings_file="$vscode_dir/settings.json"

    mkdir -p "$vscode_dir"

    if [ -f "$settings_file" ] && command -v jq &>/dev/null; then
        local tmp_file
        tmp_file=$(mktemp)
        jq '. + {
            "terminal.integrated.env.linux": {
                "ANTHROPIC_BASE_URL": "http://localhost:11434",
                "ANTHROPIC_AUTH_TOKEN": "ollama",
                "ANTHROPIC_API_KEY": ""
            },
            "terminal.integrated.env.osx": {
                "ANTHROPIC_BASE_URL": "http://localhost:11434",
                "ANTHROPIC_AUTH_TOKEN": "ollama",
                "ANTHROPIC_API_KEY": ""
            },
            "terminal.integrated.env.windows": {
                "ANTHROPIC_BASE_URL": "http://localhost:11434",
                "ANTHROPIC_AUTH_TOKEN": "ollama",
                "ANTHROPIC_API_KEY": ""
            }
        }' "$settings_file" > "$tmp_file" && mv "$tmp_file" "$settings_file"
    else
        cat > "$settings_file" << 'VSCODE_EOF'
{
    "terminal.integrated.env.linux": {
        "ANTHROPIC_BASE_URL": "http://localhost:11434",
        "ANTHROPIC_AUTH_TOKEN": "ollama",
        "ANTHROPIC_API_KEY": ""
    },
    "terminal.integrated.env.osx": {
        "ANTHROPIC_BASE_URL": "http://localhost:11434",
        "ANTHROPIC_AUTH_TOKEN": "ollama",
        "ANTHROPIC_API_KEY": ""
    },
    "terminal.integrated.env.windows": {
        "ANTHROPIC_BASE_URL": "http://localhost:11434",
        "ANTHROPIC_AUTH_TOKEN": "ollama",
        "ANTHROPIC_API_KEY": ""
    }
}
VSCODE_EOF
    fi

    info "VS Code workspace ayarlari olusturuldu: $settings_file"
}

# -----------------------------------------------------------------------------
# 6. Shell Profil Yapilandirmasi
# -----------------------------------------------------------------------------
configure_shell_env() {
    local shell_rc=""
    if [ -f "$HOME/.zshrc" ]; then
        shell_rc="$HOME/.zshrc"
    elif [ -f "$HOME/.bashrc" ]; then
        shell_rc="$HOME/.bashrc"
    fi

    if [ -n "$shell_rc" ]; then
        # Eger zaten eklenmemisse ekle
        if ! grep -q "ANTHROPIC_BASE_URL.*localhost:11434" "$shell_rc" 2>/dev/null; then
            cat >> "$shell_rc" << 'EOF'

# --- Ollama + Claude Code Yapilandirmasi ---
export ANTHROPIC_BASE_URL="http://localhost:11434"
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_API_KEY=""
# --- Ollama + Claude Code Yapilandirmasi Sonu ---
EOF
            info "Shell ortam degiskenleri eklendi: $shell_rc"
            warn "Degisikliklerin etkin olmasi icin: source $shell_rc"
        else
            info "Shell ortam degiskenleri zaten mevcut."
        fi
    fi
}

# -----------------------------------------------------------------------------
# Ana Akis
# -----------------------------------------------------------------------------
main() {
    echo ""
    echo "============================================="
    echo "  Ollama + Gemma 4 Kurulum Araci"
    echo "  VS Code Claude Code Yapilandirmasi"
    echo "============================================="
    echo ""

    install_ollama
    start_ollama
    pull_gemma4
    configure_claude_code
    configure_vscode
    configure_shell_env

    echo ""
    echo "============================================="
    info "Kurulum tamamlandi!"
    echo "============================================="
    echo ""
    echo "Kullanim:"
    echo ""
    echo "  Yontem 1 - Otomatik (Ollama v0.14+):"
    echo "    ollama launch claude --model gemma4-claude"
    echo ""
    echo "  Yontem 2 - Manuel:"
    echo "    ollama serve  # (ayri terminalde)"
    echo "    claude --model gemma4-claude"
    echo ""
    echo "  Yontem 3 - VS Code icinde:"
    echo "    VS Code'u acin, Claude Code eklentisini baslatin"
    echo "    /model komutuyla gemma4-claude secin"
    echo ""
    echo "  Not: Context window 64K token olarak ayarlanmistir."
    echo "  OpenRouter ayarlariniz devre disi birakilmistir."
    echo ""
}

main "$@"
