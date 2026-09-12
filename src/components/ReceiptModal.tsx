import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ArkanLogo } from './ArkanLogo';
import { Printer, Download, X, Calendar, Clock, User, Phone, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const {
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    currentBookingForReceipt,
    settings,
  } = useApp();

  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isReceiptModalOpen || !currentBookingForReceipt) return null;

  const booking = currentBookingForReceipt;

  const handlePrint = () => {
    window.print();
  };

  // Format Arabic Date
  const formatArabicDate = (dateString: string) => {
    try {
      const [year, month, day] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B1E38] border border-[#C9A227]/50 rounded-3xl shadow-2xl overflow-hidden text-right">
        {/* Modal Top Actions (Hidden in print) */}
        <div className="no-print flex items-center justify-between p-4 bg-[#07101E] border-b border-[#C9A227]/30">
          <div className="flex items-center gap-2 text-[#DFC377] font-heading font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>تم تأكيد حجز الاستشارة وتوليد الإيصال الرسمي</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-[#C9A227] text-[#0A192F] font-bold text-xs flex items-center gap-1.5 hover:bg-[#DFC377] transition-all cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة / حفظ PDF</span>
            </button>
            <button
              onClick={() => setIsReceiptModalOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE RECEIPT CONTENT (Stylized for both screen & print) */}
        <div
          ref={receiptRef}
          className="receipt-container p-6 sm:p-8 bg-[#0A192F] print:bg-white print:text-black text-[#F5F5F0] space-y-6"
        >
          {/* Receipt Official Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-[#C9A227]/40 print:border-slate-300 gap-4 text-center sm:text-right">
            <ArkanLogo size={70} showText={true} />

            <div className="text-center sm:text-left">
              <span className="inline-block px-3 py-1 rounded-md bg-[#C9A227]/20 print:bg-amber-100 print:text-black text-[#DFC377] text-xs font-bold border border-[#C9A227]/40 mb-1">
                إيصال حجز استشارة رسمي
              </span>
              <p className="text-[11px] text-slate-400 print:text-slate-600 font-mono" dir="ltr">
                NO: {booking.bookingNumber}
              </p>
            </div>
          </div>

          {/* Large Queue Number Highlight */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-r from-[#112240] via-[#1B335A] to-[#112240] print:bg-slate-100 print:border print:border-slate-300 border border-[#C9A227]/50 text-center">
            <span className="text-xs text-[#DFC377] print:text-amber-800 font-bold block mb-1">
              رقم الدور المعتمد في صالة الانتظار
            </span>
            <div className="text-5xl sm:text-6xl font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] via-[#DFC377] to-[#C9A227] print:text-slate-900 drop-shadow-sm">
              {booking.queueNumber}
            </div>
            <span className="text-[11px] text-slate-300 print:text-slate-600 block mt-1">
              يبدأ استقبال الأدوار في موعد الجلسة المحدد أدناه
            </span>
          </div>

          {/* Booking & Client Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-[#112240]/60 print:bg-slate-50 print:border print:border-slate-200 border border-slate-800 space-y-1">
              <span className="text-slate-400 print:text-slate-500 text-xs flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C9A227]" />
                اسم العميل / الموكل
              </span>
              <p className="font-bold text-white print:text-black text-sm sm:text-base">
                {booking.clientName}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#112240]/60 print:bg-slate-50 print:border print:border-slate-200 border border-slate-800 space-y-1">
              <span className="text-slate-400 print:text-slate-500 text-xs flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                رقم الهاتف المسجل
              </span>
              <p className="font-bold text-white print:text-black font-mono text-sm sm:text-base" dir="ltr">
                {booking.phone}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#112240]/60 print:bg-slate-50 print:border print:border-slate-200 border border-slate-800 space-y-1">
              <span className="text-slate-400 print:text-slate-500 text-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                تاريخ الموعد
              </span>
              <p className="font-bold text-white print:text-black">
                {formatArabicDate(booking.date)}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#112240]/60 print:bg-slate-50 print:border print:border-slate-200 border border-slate-800 space-y-1">
              <span className="text-slate-400 print:text-slate-500 text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                توقيت الاستشارة
              </span>
              <p className="font-bold text-white print:text-black font-mono">
                {booking.time}
              </p>
            </div>

            <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#112240]/60 print:bg-slate-50 print:border print:border-slate-200 border border-slate-800 space-y-1">
              <span className="text-slate-400 print:text-slate-500 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
                نوع الاستشارة والخدمة المطلوبة
              </span>
              <p className="font-bold text-[#DFC377] print:text-black text-sm">
                {booking.serviceName}
              </p>
              {booking.consultantName && (
                <p className="text-xs text-slate-300 print:text-slate-600">
                  المستشار المخصص: {booking.consultantName}
                </p>
              )}
            </div>
          </div>

          {/* Official Instructions Mandated by Prompt */}
          <div className="p-4 rounded-xl bg-amber-500/10 print:bg-amber-50 border border-[#C9A227]/40 print:border-amber-300">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-[#DFC377] print:text-amber-900 mb-1">
              تعليمات الحضور للمقر:
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 print:text-black font-semibold leading-relaxed">
              برجاء الحضور قبل الموعد بـ15 دقيقة وإبراز هذا الإيصال أو رقم الدور للسكرتارية.
            </p>
          </div>

          {/* Simulated Barcode / Verification Stamp */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 print:border-slate-300 text-[11px] text-slate-400 print:text-slate-600">
            <div className="font-mono tracking-widest text-slate-400 print:text-slate-600">
              ||| ||||| || |||||| |||| ||| |||||
            </div>
            <span>تاريخ الإصدار: {new Date(booking.createdAt).toLocaleDateString('ar-EG')}</span>
          </div>

          {/* Official Footer */}
          <div className="pt-4 border-t border-[#C9A227]/40 print:border-slate-400 text-center space-y-1.5 text-xs">
            <p className="font-heading font-bold text-white print:text-black">
              {settings.orgName}
            </p>
            <p className="text-slate-400 print:text-slate-700 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C9A227] inline shrink-0" />
              {settings.address}
            </p>
            <p className="text-[#DFC377] print:text-black font-mono" dir="ltr">
              {settings.phone1} | {settings.phone2}
            </p>
          </div>
        </div>

        {/* Modal Bottom CTA (Hidden in print) */}
        <div className="no-print p-4 bg-[#07101E] border-t border-[#1E2E47] flex items-center justify-between">
          <p className="text-xs text-slate-400">
            تم إرسال نسخة من تفاصيل الحجز عبر واتساب/الهاتف المسجل.
          </p>
          <button
            onClick={() => setIsReceiptModalOpen(false)}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            إتمام وإغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
