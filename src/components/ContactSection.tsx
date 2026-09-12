import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, setIsBookingModalOpen } = useApp();

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('قانوني');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setSenderName('');
      setSenderPhone('');
      setMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-20 bg-[#0A192F] text-[#F5F5F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>المقر الرئيسي وخدمة الموكلين</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-3">
            تواصل مع{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
              مؤسسة أركان
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            نسعد باستقبالكم بمقرنا الكائن في الجيزة بالهرم، أو الرد الفوري على استفساراتكم الهاتفية وعبر واتساب.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#112240] to-[#0B1A2F] border border-[#C9A227]/30 shadow-xl space-y-6">
              <h3 className="font-heading font-black text-xl text-white">
                بيانات التواصل الرسمية
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0A192F] border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-[#C9A227]/15 flex items-center justify-center text-[#DFC377] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#C9A227]" />
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">مقر المؤسسة الرئيسي:</span>
                    <p className="text-slate-300 leading-relaxed">{settings.address}</p>
                    <span className="text-[11px] text-[#DFC377] block mt-1">سهولة الوصول من شارعي فيصل والهرم ومحور 26 يوليو</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0A192F] border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-[#C9A227]/15 flex items-center justify-center text-[#DFC377] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#C9A227]" />
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">الهواتف المباشرة للاستقبال:</span>
                    <div className="space-y-1 font-mono text-slate-200" dir="ltr">
                      <a href={`tel:${settings.phone1}`} className="block hover:text-[#C9A227] transition-colors">
                        {settings.phone1}
                      </a>
                      <a href={`tel:${settings.phone2}`} className="block hover:text-[#C9A227] transition-colors">
                        {settings.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0A192F] border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-[#C9A227]/15 flex items-center justify-center text-[#DFC377] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#C9A227]" />
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">مواعيد العمل الرسمية:</span>
                    <p className="text-slate-300">{settings.workHours}</p>
                    <span className="text-[11px] text-slate-400 block mt-1">يُفضل الحجز المسبق لضمان مقابلة المستشار المختص بدون انتظار</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={`https://wa.me/201141754963?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن موعد استشارة في مؤسسة أركان')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>محادثة فورية عبر واتساب (خدمة الموكلين)</span>
              </a>
            </div>

            {/* Simulated Interactive Map Display */}
            <div className="rounded-3xl overflow-hidden border border-[#C9A227]/25 shadow-xl bg-[#112240] relative h-48">
              <iframe
                title="مقر مؤسسة أركان للمحاماة بالجيزة"
                src="https://maps.google.com/maps?q=Al+Haram,+Giza,+Egypt&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[40%] contrast-125"
                loading="lazy"
              />
              <div className="absolute bottom-2 right-2 px-3 py-1 rounded-lg bg-[#0A192F]/90 text-[10px] text-[#DFC377] border border-slate-800 backdrop-blur-md">
                5ب أبراج الوطنية، آخر فيصل، الهرم، الجيزة
              </div>
            </div>
          </div>

          {/* Quick Inquiry / Consultation Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#112240] to-[#0A192F] border border-[#C9A227]/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-xl text-white mb-1">
                    أرسل رسالتك أو استفسارك المبدئي
                  </h3>
                  <p className="text-xs text-slate-400">
                    يقوم مستشارو أركان بدراسة استفسارك والتواصل معك خلال ساعات العمل.
                  </p>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C9A227] text-[#0A192F] font-bold text-xs hover:bg-[#DFC377] transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>حجز موعد فوري</span>
                </button>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    تم استلام رسالتك بنجاح
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    شكراً لتواصلك مع مؤسسة أركان. سيتواصل معك أحد مستشارينا أو أمانة السكرتارية القانونية في أقرب وقت.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        الاسم الكريم <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="أحمد محمود"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#C9A227] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        رقم الهاتف للتواصل <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="01141754963"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#C9A227] focus:outline-none font-mono text-right"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      طبيعة الاستفسار أو القضية
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#C9A227] focus:outline-none"
                    >
                      <option value="قانوني">استشارة قانونية أو تمثيل قضائي (مدني، جنائي، عمالي)</option>
                      <option value="تأسيس">تأسيس شركة أو استخراج سجل وبطاقة ضريبية</option>
                      <option value="ضريبي">نزاع أو فحص ضريبي (تقدير جزافي - لجنة طعن)</option>
                      <option value="محاسبي">إمساك دفاتر أو قوائم مالية معتمدة</option>
                      <option value="عقود">صياغة أو مراجعة عقود تجارية واستثمارية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      تفاصيل الموضوع أو الرسالة <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="يرجى كتابة ملخص استفسارك لمساعدتنا في توجيه الرسالة للمستشار المتخصص..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#0A192F] border border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:border-[#C9A227] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      نحافظ على سرية وخصوصية كافة المراسلات والبيانات بنسبة 100%.
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-xs sm:text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/25 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>إرسال الاستفسار الآن</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
