import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await request.json();
    const { fullname, email, phone, status } = data;

    // Validasyon
    if (!fullname || !email) {
      return new Response(
        JSON.stringify({ error: 'Ad ve email gerekli' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Geçersiz email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log
    console.log('📧 E-Kitap İndir İsteği:', {
      fullname,
      email,
      phone,
      status,
      timestamp: new Date().toISOString()
    });

    // Email gönder (Resend API ile)
    const env = (locals as any).runtime?.env;
    const resendApiKey = env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: 'noreply@tupbebek.com',
          to: email,
          subject: '30 Günlük Tüp Bebek Beslenme Planı - E-Kitabı İndir',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563a8;">Merhaba ${fullname},</h2>
              <p style="color: #374151; line-height: 1.6;">
                30 Günlük Tüp Bebek Beslenme Planı e-kitabını indirme isteğiniz alındı.
              </p>

              <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1a4d7a; margin-top: 0;">E-Kitap İçeriği:</h3>
                <ul style="color: #374151; line-height: 1.8;">
                  <li>4 Klinik Fazlı Beslenme Planı</li>
                  <li>30 Günlük Detaylı Beslenme Tablosu</li>
                  <li>Besin Rehberi & Vitamin Tablosu</li>
                  <li>Akdeniz Diyeti Temelli Tarifler</li>
                  <li>60+ Yaşanması Kolay Tarif</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://tupbebek.com/e-kitap/tup-bebek-beslenme-plani.pdf"
                   style="background-color: #2563a8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  E-Kitabı İndir (PDF)
                </a>
              </div>

              <p style="color: #6b7280; line-height: 1.6; font-size: 14px;">
                <strong>Tıpkı başarıyla indirdiğiniz gibi,</strong> bu linki kullanarak istediğiniz zaman e-kitabı tekrar indirebilirsiniz.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

              <p style="color: #374151; line-height: 1.6;">
                Sorularınız veya önerileriniz için <a href="mailto:dr@senaiaksoy.net" style="color: #2563a8; text-decoration: none;">bizimle iletişime geçebilirsiniz</a>.
              </p>

              <p style="color: #374151; margin-bottom: 5px;">Sağlıklı kalın,</p>
              <p style="color: #374151; font-weight: bold; margin-top: 5px;">
                Doç. Dr. Senai Aksoy<br>
                <span style="font-size: 13px; font-weight: normal; color: #6b7280;">Üreme Tıbbı Uzmanı</span>
              </p>

              <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; text-align: center;">
                <p>© 2024 tupbebek.com - Tüp Bebek Rehberi</p>
              </footer>
            </div>
          `
        });

        console.log('✅ Email gönderildi:', email);
      } catch (emailError) {
        console.warn('⚠️ Email gönderimi başarısız:', emailError);
        // Email hatası indirmeyi engellemesin
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY tanımlanmadı. Emailler gönderilmiyor.');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'E-kitap indirimi başlatıldı. E-posta adresinize gönderildi.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Sunucu hatası' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
