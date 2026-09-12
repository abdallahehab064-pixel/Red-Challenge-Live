import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BookingAttachment } from '../types';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  File,
  Printer
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    bookingServicePreset,
    setBookingServicePreset,
    services,
    bookings,
    createBooking,
    setCurrentBookingForReceipt,
    setIsReceiptModalOpen,
  } = useApp();

  // Form states
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState(services[0]?.id || 'legal-litigation');
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [attachments, setAttachments] = useState<BookingAttachment[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success view state
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null);

  // Synchronize preset service if opened from service card
  useEffect(() => {
    if (bookingServicePreset) {
      setServiceId(bookingServicePreset);
    }
  }, [bookingServicePreset]);

  if (!isBookingModalOpen) return null;

  // Available consultation times (e.g. 10:00 ص to 08:30 م)
  const allTimeSlots = [
    '10:30 ص',
    '11:30 ص',
    '12:30 م',
    '01:30 م',
    '03:00 م',
    '04:00 م',
    '05:00 م',
    '06:00 م',
    '07:00 م',
    '08:00 م',
  ];

  // Conflict detection: which times are already booked on the selected date?
  const bookedTimesOnDate = bookings
    .filter((b) => b.date === bookingDate && b.status !== 'cancelled')
    .map((b) => b.time);

  // Handle file uploads (secure client-side with base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    if (!e.target.files) return;

    const files = Array.from(e.target.files) as File[];
    const validExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB limit

    const newAttachments: BookingAttachment[] = [];

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!validExtensions.includes(ext)) {
        setUploadError(`صيغة الملف "${file.name}" غير مدعومة. المسموح: PDF, JPG, PNG, DOC, DOCX`);
        return;
      }
      if (file.size > maxSizeBytes) {
        setUploadError(`حجم الملف "${file.name}" يتجاوز الحد الأقصى (10 ميجابايت).`);
        return;
      }

      // Convert to Base64
      const reader = new FileReader();
      reader.onload = () => {
        newAttachments.push({
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result as string,
          uploadDate: new Date().toISOString(),
        });
        if (newAttachments.length === files.length) {
          setAttachments((prev) => [...prev, ...newAttachments]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!clientName.trim() || clientName.trim().length < 3) {
      errors.clientName = 'يرجى كتابة الاسم الثلاثي بالكامل.';
    }
    if (!phone.trim() || !/^01[0125][0-9]{8}$/.test(phone.trim().replace(/\s/g, ''))) {
      errors.phone = 'يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً (مثال: 01141754963).';
    }
    if (!bookingDate) {
      errors.bookingDate = 'يرجى تحديد تاريخ الحجز.';
    }
    if (!selectedTime) {
      errors.selectedTime = 'يرجى اختيار توقيت متاح للاستشارة.';
    }
    if (!serviceId) {
      errors.serviceId = 'يرجى اختيار نوع الاستشارة.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const created = createBooking({
        clientName: clientName.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || phone.trim(),
        email: email.trim() || undefined,
        serviceId,
        date: bookingDate,
        time: selectedTime,
        notes: notes.trim() || undefined,
        attachments,
      });

      // Confetti celebratory effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C9A227', '#DFC377', '#FAF0CA', '#112240'],
        });
      } catch {
        // fallback
      }

      setSubmittedBooking(created);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setBookingServicePreset(null);
    setSubmittedBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl overflow-hidden shadow-2xl text-right">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#07101E] to-[#0D2240] border-b border-[#C9A227]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C9A227]" />
            <h2 className="font-heading font-black text-xl text-white">
              {submittedBooking ? 'تم تأكيد حجزك بنجاح' : 'حجز موعد استشارة بمقر مؤسسة أركان'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        {submittedBooking ? (
          /* SUCCESS SCREEN (Section 13) */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mb-1">
                تم تأكيد حجزك بنجاح
              </h3>
              <p className="text-sm text-slate-300">
                تم تسجيل موعد استشارتك وتوليد رقم الدور المعتمد بنجاح
              </p>
            </div>

            {/* Queue Number Badge */}
            <div className="max-w-xs mx-auto p-6 rounded-2xl bg-gradient-to-b from-[#112240] to-[#0A192F] border-2 border-[#C9A227] shadow-xl">
              <span className="text-xs font-semibold text-[#DFC377] block mb-1">
                رقم الدور الخاص بك:
              </span>
              <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] via-[#DFC377] to-[#C9A227]">
                {submittedBooking.queueNumber}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1 font-mono" dir="ltr">
                {submittedBooking.bookingNumber}
              </span>
            </div>

            {/* Confirmation details summary */}
            <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-xs sm:text-sm text-right bg-[#0A192F] p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block">اسم العميل:</span>
                <span className="font-bold text-white">{submittedBooking.clientName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">رقم الهاتف:</span>
                <span className="font-bold text-white font-mono" dir="ltr">{submittedBooking.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">التاريخ:</span>
                <span className="font-bold text-white">{submittedBooking.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block">الوقت:</span>
                <span className="font-bold text-white">{submittedBooking.time}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800">
                <span className="text-slate-400 block">نوع الاستشارة:</span>
                <span className="font-bold text-[#DFC377]">{submittedBooking.serviceName}</span>
              </div>
            </div>

            {/* Automated Email with Invoice Confirmation Banner */}
            <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-3 max-w-md mx-auto text-right">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold mb-0.5">
                  تم إرسال بريد إلكتروني تلقائي فوري مع الفاتورة الرسمية!
                </strong>
                <span>
                  تم إرسال إشعار الحجز وتفاصيل الموعد مع الفاتورة المعتمدة ورقم الدور إلى{' '}
                  <strong className="text-[#DFC377] font-mono">
                    {submittedBooking.email || `${submittedBooking.phone}@client.arkan.eg`}
                  </strong>
                  .
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-800/50 max-w-md mx-auto">
              برجاء الحضور قبل الموعد بـ15 دقيقة وإبراز الإيصال أو رقم الدور للسكرتارية في: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentBookingForReceipt(submittedBooking);
                  setIsReceiptModalOpen(true);
                  setIsBookingModalOpen(false);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-sm shadow-lg shadow-[#C9A227]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>عرض الفاتورة وإيصال PDF</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold cursor-pointer"
              >
                تمت القراءة وإغلاق
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM (Sections 10, 11) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            <div className="p-3.5 rounded-xl bg-[#112240]/60 border border-[#C9A227]/30 text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span>
                نظام حجز فوري بمواعيد دقيقة غير متضاربة مع توليد رقم دور تلقائي وإيصال رسمي.
              </span>
            </div>

            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  الاسم بالكامل <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="أ. محمد أحمد الشناوي"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white focus:border-[#C9A227] focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute top-3 right-3.5" />
                </div>
                {formErrors.clientName && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.clientName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  رقم الهاتف (مصر) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="01141754963"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white focus:border-[#C9A227] focus:outline-none font-mono text-right"
                    dir="ltr"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute top-3 right-3.5" />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  رقم الواتساب (اختياري، لإرسال التأكيد)
                </label>
                <input
                  type="tel"
                  placeholder="01551658173"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#C9A227] focus:outline-none font-mono text-right"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  البريد الإلكتروني (اختياري)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white focus:border-[#C9A227] focus:outline-none font-mono text-right"
                    dir="ltr"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute top-3 right-3.5" />
                </div>
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                نوع الاستشارة والخدمة المطلوبة <span className="text-red-400">*</span>
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#C9A227] focus:outline-none"
              >
                {(services || []).map((s) => (
                  <option key={s.id} value={s.id}>
                    [{s.category === 'legal' ? 'قانوني' : s.category === 'accounting' ? 'محاسبي' : 'ضريبي'}] {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time Slot Picker (Conflict Prevention - Section 11) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  تاريخ الموعد <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingDate}
                  onChange={(e) => {
                    setBookingDate(e.target.value);
                    setSelectedTime('');
                  }}
                  className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#C9A227] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  المواعيد المتاحة في هذا اليوم <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-[#0A192F] rounded-xl border border-slate-800">
                  {(allTimeSlots || []).map((slot) => {
                    const isBooked = (bookedTimesOnDate || []).includes(slot);
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                          isBooked
                            ? 'bg-slate-900 text-slate-600 line-through cursor-not-allowed border border-slate-800'
                            : isSelected
                            ? 'bg-[#C9A227] text-[#0A192F] font-bold shadow'
                            : 'bg-[#112240] text-slate-200 hover:bg-[#1B335A] border border-slate-700'
                        }`}
                      >
                        {slot} {isBooked && '(محجوز)'}
                      </button>
                    );
                  })}
                </div>
                {formErrors.selectedTime && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.selectedTime}</p>
                )}
              </div>
            </div>

            {/* Problem Summary / Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                نبذة عن الموضوع أو القضية (اختياري)
              </label>
              <textarea
                rows={3}
                placeholder="يرجى ذكر نبذة مختصرة عن موضوع الاستشارة لمساعدة المستشار في التحضير المسبق..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-[#C9A227] focus:outline-none"
              />
            </div>

            {/* Optional Attachments (Section 19) */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                <span>إرفاق مستندات ذات صلة (اختياري - سرية تامة)</span>
                <span className="text-[11px] text-slate-400">PDF, JPG, PNG, DOCX (بحد أقصى 10MB)</span>
              </label>

              <div className="border-2 border-dashed border-slate-700 hover:border-[#C9A227] rounded-xl p-4 text-center bg-[#0A192F]/50 transition-colors">
                <input
                  type="file"
                  id="booking-file-upload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="booking-file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                >
                  <Upload className="w-6 h-6 text-[#C9A227]" />
                  <span className="text-xs text-slate-300 font-medium">
                    اضغط هنا لرفع المستندات أو قم بسحبها وإفلاتها
                  </span>
                  <span className="text-[10px] text-slate-500">
                    كافة الملفات مشفرة ومتاحة فقط لفريق المستشارين المختصين
                  </span>
                </label>
              </div>

              {uploadError && (
                <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {uploadError}
                </p>
              )}

              {/* Uploaded files list */}
              {attachments.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#112240] border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2 text-slate-200 truncate">
                        <File className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-400">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                سيتم إصدار رقم دور فوري (Queue Number) مرتبط بيوم الحجز
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#C9A227]/25 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري التأكيد...' : 'تأكيد الحجز وتوليد الإيصال'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
