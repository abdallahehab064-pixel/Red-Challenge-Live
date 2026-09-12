import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { simulateSend24hEmailReminders } from '../services/cloudReminderFunction';
import { MessageSquare, Phone, X, CheckCircle2, Send, Copy, AlertCircle, Mail, Eye } from 'lucide-react';

export const ReminderModal: React.FC = () => {
  const {
    isReminderPreviewOpen,
    setIsReminderPreviewOpen,
    reminderBookingTarget,
    settings,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  if (!isReminderPreviewOpen || !reminderBookingTarget) return null;

  const booking = reminderBookingTarget;

  // Automated formatted reminder text
  const messageText = `مرحباً ${booking.clientName}،
نود تذكير سيادتكم بموعد استشارتكم في مؤسسة أركان للمحاماة والاستشارات القانونية والمحاسبية والضريبية:

📌 تاريخ الموعد: ${booking.date}
⏰ توقيت الجلسة: ${booking.time}
🎫 رقم الدور: ${booking.queueNumber}
⚖️ الخدمة: ${booking.serviceName}
📍 العنوان: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، الجيزة.

يرجى الحضور قبل الموعد بـ 15 دقيقة وإبراز رقم الدور للسكرتارية.
للاستفسار: ${settings.phone1} / ${settings.phone2}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppSend = () => {
    const cleanPhone = (booking.whatsapp || booking.phone).replace(/\D/g, '');
    const internationalPhone = cleanPhone.startsWith('01') ? `2${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${internationalPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
    setSentSuccess(true);
  };

  const handleSimulateEmailReminder = () => {
    setEmailSending(true);
    setTimeout(() => {
      simulateSend24hEmailReminders([booking], new Date(), booking.email);
      setEmailSending(false);
      setEmailSentSuccess(true);
      setTimeout(() => setEmailSentSuccess(false), 4000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl overflow-hidden shadow-2xl text-right p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#C9A227]" />
            <h3 className="font-heading font-black text-lg text-white">
              إرسال تذكير بالموعد للموكل
            </h3>
          </div>
          <button
            onClick={() => setIsReminderPreviewOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1">بيانات المستلم:</span>
          <div className="p-3 rounded-xl bg-[#0A192F] border border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-white">{booking.clientName}</span>
            <span className="font-mono text-[#DFC377]" dir="ltr">{booking.phone}</span>
          </div>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1">نص رسالة التذكير الآلية:</span>
          <textarea
            readOnly
            rows={8}
            value={messageText}
            className="w-full bg-[#0A192F] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 font-sans leading-relaxed focus:outline-none"
          />
        </div>

        {sentSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>تم فتح تطبيق واتساب وتجهيز رسالة التذكير للموكل بنجاح.</span>
          </div>
        )}

        {emailSentSuccess && (
          <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-500/50 text-blue-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>تمت محاكاة إرسال تذكير الـ 24 ساعة السحابي (Cloud Function Email) للعميل بنجاح.</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#1B335A] text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
            </button>

            <button
              onClick={handleSimulateEmailReminder}
              disabled={emailSending}
              title="محاكاة إرسال تذكير سحابي للبريد الإلكتروني للعميل قبل 24 ساعة"
              className="px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#1B335A] text-[#DFC377] border border-[#C9A227]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{emailSending ? 'جاري الإرسال...' : 'تذكير إيميل (Cloud Function)'}</span>
            </button>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setIsReminderPreviewOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs"
            >
              إلغاء
            </button>
            <button
              onClick={handleWhatsAppSend}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال عبر واتساب</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
