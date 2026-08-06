import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const data = await request.json();
    const { name, email, phone, subject, message } = data;

    // --- Validation ---
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Ad, e-posta, konu ve mesaj alanları zorunludur.' }),
        { status: 400, headers }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Geçersiz e-posta adresi.' }),
        { status: 400, headers }
      );
    }

    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Mesaj 5000 karakteri aşamaz.' }),
        { status: 400, headers }
      );
    }

    // --- IP & Rate Limiting ---
    const ip = request.headers.get('cf-connecting-ip')
      || request.headers.get('x-forwarded-for')
      || 'unknown';

    const env = locals.runtime?.env;
    const db = env?.DB;

    if (db) {
      try {
        // Rate limit: aynı IP'den 5 dk içinde max 3 mesaj
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const recentCount = await db
          .prepare('SELECT COUNT(*) as cnt FROM contact_messages WHERE ip_address = ? AND created_at > ?')
          .bind(ip, fiveMinAgo)
          .first<{ cnt: number }>();

        if (recentCount && recentCount.cnt >= 3) {
          return new Response(
            JSON.stringify({ error: 'Çok fazla mesaj gönderdiniz. Lütfen birkaç dakika bekleyin.' }),
            { status: 429, headers }
          );
        }

        // --- D1'e Kaydet ---
        await db
          .prepare(
            'INSERT INTO contact_messages (name, email, phone, subject, message, ip_address) VALUES (?, ?, ?, ?, ?, ?)'
          )
          .bind(name, email, phone || null, subject, message, ip)
          .run();

        console.log('💾 İletişim mesajı D1\'e kaydedildi:', { name, email, subject });
      } catch (dbError: any) {
        console.warn('⚠️ D1 hatası (mesaj yine de gönderilecek):', dbError?.message);
      }
    } else {
      console.log('📩 İletişim formu (D1 yok, sadece log):', { name, email, subject, message });
    }

    // --- E-posta Bildirimi ---
    const resendApiKey = env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    const contactEmail = env?.CONTACT_EMAIL || import.meta.env.CONTACT_EMAIL || 'bilgi@tupbebek.com';

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: 'noreply@tupbebek.com',
          to: contactEmail,
          replyTo: email,
          subject: `[tupbebek.com] Yeni İletişim: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #2563a8; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">Yeni İletişim Formu Mesajı</h2>
                <p style="margin: 5px 0 0; opacity: 0.9; font-size: 14px;">tupbebek.com</p>
              </div>

              <div style="background-color: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 100px;">Ad Soyad:</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: bold;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">E-posta:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563a8;">${escapeHtml(email)}</a></td>
                  </tr>
                  ${phone ? `<tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Telefon:</td>
                    <td style="padding: 8px 0; color: #111827;">${escapeHtml(phone)}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Konu:</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: bold;">${escapeHtml(subject)}</td>
                  </tr>
                </table>

                <div style="margin-top: 16px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 6px;">
                  <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Mesaj</p>
                  <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
                </div>

                <p style="color: #9ca3af; font-size: 12px; margin-top: 16px;">
                  Gönderim: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}
                </p>
              </div>
            </div>
          `
        });

        console.log('✅ İletişim bildirim e-postası gönderildi:', contactEmail);
      } catch (emailError) {
        console.warn('⚠️ E-posta bildirimi başarısız:', emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.'
      }),
      { status: 200, headers }
    );

  } catch (error: any) {
    console.error('İletişim API hatası:', error?.message, error?.stack);
    return new Response(
      JSON.stringify({ error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' }),
      { status: 500, headers }
    );
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
