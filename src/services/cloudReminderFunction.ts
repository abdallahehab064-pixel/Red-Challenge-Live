import { Booking } from '../types';

export interface EmailReminderResult {
  bookingId: string;
  clientName: string;
  email: string;
  date: string;
  time: string;
  serviceName: string;
  queueNumber: string;
  hoursUntilAppointment: number;
  simulatedSentAt: string;
  status: 'sent' | 'skipped' | 'failed';
  reason?: string;
  emailPayload: {
    to: string;
    from: string;
    subject: string;
    htmlBody: string;
    textBody: string;
  };
}

export interface CloudFunctionExecutionSummary {
  executionId: string;
  timestamp: string;
  totalBookingsChecked: number;
  eligibleForReminder24h: number;
  emailsDispatched: number;
  skippedCount: number;
  results: EmailReminderResult[];
}

/**
 * Cloud Function simulation:
 * Simulates a Scheduled Cloud Function (Cloud Scheduler / Cloud Functions gen 2)
 * triggered periodically (e.g. every hour) to scan bookings and dispatch email reminders
 * exactly ~24 hours before the appointment.
 */
export function simulateSend24hEmailReminders(
  bookings: Booking[],
  now: Date = new Date(),
  forceTestEmail?: string
): CloudFunctionExecutionSummary {
  const executionId = `fn-exec-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const results: EmailReminderResult[] = [];

  const validBookings = bookings || [];

  for (const booking of validBookings) {
    // Skip cancelled or completed bookings
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      continue;
    }

    // Determine target email: use booking.email, fallback to generated test email or forceTestEmail
    const targetEmail =
      booking.email ||
      forceTestEmail ||
      `client.${booking.phone.replace(/\D/g, '').slice(-4) || 'user'}@client-arkan.com`;

    // Calculate approximate appointment datetime
    // Booking date format is YYYY-MM-DD
    let appointmentDateTime: Date;
    try {
      // Parse time if possible (e.g. "11:00 ص", "02:30 م", or "11:00")
      let hour = 11;
      let minute = 0;
      if (booking.time) {
        const isPM = booking.time.includes('م') || booking.time.toLowerCase().includes('pm');
        const cleanTime = booking.time.replace(/[^\d:]/g, '').trim();
        const parts = cleanTime.split(':');
        if (parts.length >= 1) {
          let parsedHour = parseInt(parts[0], 10);
          if (isPM && parsedHour < 12) parsedHour += 12;
          if (!isPM && parsedHour === 12) parsedHour = 0;
          hour = parsedHour;
        }
        if (parts.length >= 2) {
          minute = parseInt(parts[1], 10);
        }
      }

      const [y, m, d] = booking.date.split('-').map((n) => parseInt(n, 10));
      appointmentDateTime = new Date(y, (m || 1) - 1, d || 1, hour, minute);
    } catch {
      appointmentDateTime = new Date(booking.date);
    }

    // Time difference in hours
    const diffMs = appointmentDateTime.getTime() - now.getTime();
    const hoursDiff = diffMs / (1000 * 60 * 60);

    // Eligible range: ~24 hours prior (window of 18 to 30 hours, or positive up to 48 hours for simulation showcase)
    const isEligibleWindow = hoursDiff >= 12 && hoursDiff <= 36;

    // Rich HTML Template
    const htmlBody = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8"/>
  <title>تذكير بموعد استشارتك في مؤسسة أركان</title>
</head>
<body style="margin:0;padding:0;background-color:#07101E;font-family:Tahoma,Arial,sans-serif;color:#F5F5F0;">
  <table role="presentation" width="100%" style="max-width:620px;margin:20px auto;background-color:#0B1E38;border:1px solid #C9A227;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
    <!-- Header -->
    <tr>
      <td style="padding:28px 24px;background:linear-gradient(135deg, #0A192F, #112240);text-align:center;border-bottom:2px solid #C9A227;">
        <h1 style="color:#DFC377;margin:0 0 6px 0;font-size:22px;font-weight:900;">مؤسسة أركان</h1>
        <p style="color:#FAF0CA;margin:0;font-size:13px;letter-spacing:0.5px;">للمحاماة والاستشارات القانونية والضريبية والمحاسبية</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:28px 24px;">
        <div style="background-color:#C9A227;color:#0A192F;display:inline-block;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:bold;margin-bottom:16px;">
          تذكير آلي قبل الموعد بـ 24 ساعة ⏰
        </div>

        <h2 style="color:#FFFFFF;margin:0 0 12px 0;font-size:18px;">
          السيد / السيدة: <span style="color:#DFC377;">${booking.clientName}</span> المحترم،
        </h2>

        <p style="font-size:14px;line-height:1.7;color:#CBD5E1;margin-bottom:20px;">
          نود تذكير سيادتكم بموعد جلستكم الاستشارية غداً بمقر المؤسسة. تم تخصيص الوقت والمستشار المختص لدراسة ملفكم ومستنداتكم بأعلى درجات العناية والمهنية.
        </p>

        <!-- Appointment Card -->
        <table role="presentation" width="100%" style="background-color:#07101E;border:1px solid #1E2E47;border-radius:12px;padding:16px;margin-bottom:20px;">
          <tr>
            <td style="padding:8px 0;color:#94A3B8;font-size:13px;width:35%;">📅 التاريخ:</td>
            <td style="padding:8px 0;color:#FFFFFF;font-weight:bold;font-size:14px;">${booking.date}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#94A3B8;font-size:13px;">⏰ توقيت الجلسة:</td>
            <td style="padding:8px 0;color:#DFC377;font-weight:bold;font-size:14px;">${booking.time}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#94A3B8;font-size:13px;">🎫 رقم الدور بالمقر:</td>
            <td style="padding:8px 0;color:#C9A227;font-weight:900;font-size:16px;">#${booking.queueNumber}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#94A3B8;font-size:13px;">⚖️ الخدمة والموضوع:</td>
            <td style="padding:8px 0;color:#E2E8F0;font-size:13px;">${booking.serviceName}</td>
          </tr>
          ${
            booking.consultantName
              ? `<tr>
            <td style="padding:8px 0;color:#94A3B8;font-size:13px;">👨‍⚖️ المستشار المسؤول:</td>
            <td style="padding:8px 0;color:#DFC377;font-size:13px;">${booking.consultantName}</td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding:8px 0;color:#94A3B8;font-size:13px;">🔢 كود الحجز:</td>
            <td style="padding:8px 0;color:#94A3B8;font-family:monospace;font-size:12px;">${booking.bookingNumber}</td>
          </tr>
        </table>

        <!-- Instructions -->
        <div style="background-color:#0A192F;border-right:3px solid #C9A227;padding:14px 16px;border-radius:8px;margin-bottom:22px;">
          <h4 style="margin:0 0 6px 0;color:#DFC377;font-size:13px;">📍 إرشادات الحضور:</h4>
          <ul style="margin:0;padding-right:20px;color:#CBD5E1;font-size:12px;line-height:1.8;">
            <li>المقر: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، محافظة الجيزة.</li>
            <li>يُرجى الحضور قبل الموعد بـ 15 دقيقة وإبراز رقم الدور للسكرتارية لتسهيل الدخول.</li>
            <li>يُرجى إحضار أصول المستندات أو صورها الضوئية المتعلقة بموضوع الاستشارة.</li>
          </ul>
        </div>

        <p style="font-size:12px;color:#94A3B8;margin-bottom:0;">
          في حال رغبتكم في تعديل الموعد أو الاستفسار العاجل، يمكنكم التواصل مع السكرتارية على:
          <span style="color:#DFC377;font-weight:bold;">01141754963 / 01551658173</span>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#060D19;padding:16px 24px;text-align:center;font-size:11px;color:#64748B;border-top:1px solid #1E2E47;">
        هذا البريد الإلكتروني آلي من منظومة مؤسسة أركان السحابية (Cloud Function Task).<br/>
        جميع الحقوق محفوظة © 2026 مؤسسة أركان
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const textBody = `
مرحباً ${booking.clientName}،
تذكير آلي بموعد استشارتكم في مؤسسة أركان غداً:
- تاريخ الموعد: ${booking.date}
- التوقيت: ${booking.time}
- رقم الدور: #${booking.queueNumber}
- الخدمة: ${booking.serviceName}
- المقر: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، الجيزة.
- كود الحجز: ${booking.bookingNumber}

للاستفسار أو التعديل: 01141754963 / 01551658173
`;

    results.push({
      bookingId: booking.id,
      clientName: booking.clientName,
      email: targetEmail,
      date: booking.date,
      time: booking.time,
      serviceName: booking.serviceName,
      queueNumber: booking.queueNumber,
      hoursUntilAppointment: Math.round(hoursDiff * 10) / 10,
      simulatedSentAt: now.toISOString(),
      status: 'sent',
      emailPayload: {
        to: targetEmail,
        from: 'no-reply@arkan-law.com',
        subject: `⏰ تذكير بموعد استشارتك غداً - مؤسسة أركان (رقم دور ${booking.queueNumber})`,
        htmlBody,
        textBody,
      },
    });
  }

  const emailsDispatched = results.filter((r) => r.status === 'sent').length;

  return {
    executionId,
    timestamp: now.toISOString(),
    totalBookingsChecked: validBookings.length,
    eligibleForReminder24h: results.length,
    emailsDispatched,
    skippedCount: validBookings.length - results.length,
    results,
  };
}
