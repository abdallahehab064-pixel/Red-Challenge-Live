import React from 'react';
import { useApp } from '../context/AppContext';
import { ArkanLogo } from './ArkanLogo';
import { ShieldCheck, Scale, FileSpreadsheet, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setActiveView, setIsBookingModalOpen, settings } = useApp();

  return (
    <section className="relative py-20 bg-[#07101E] text-[#F5F5F0] overflow-hidden border-t border-b border-[#1E2E47]">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1B335A]/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#112240] to-[#0A192F] border border-[#C9A227]/30 shadow-2xl">
              {/* Corner Ornaments */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C9A227]/50" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C9A227]/50" />

              <div className="text-center mb-6">
                <ArkanLogo size={140} showText={false} variant="emblem-only" className="mx-auto mb-4" />
                <h4 className="font-heading font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
                  مؤسسة أركان
                </h4>
                <p className="text-xs text-slate-300">
                  للمحاماة والاستشارات القانونية والمحاسبية والضريبية
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-700/60">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0A192F]/60 border border-slate-800">
                  <Scale className="w-5 h-5 text-[#C9A227] shrink-0" />
                  <div>
                    <span className="font-bold text-white block">الدفاع والتمثيل القضائي</span>
                    <span>أمام كافة درجات المحاكم المصرية ومحاكم النقض</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0A192F]/60 border border-slate-800">
                  <FileSpreadsheet className="w-5 h-5 text-[#DFC377] shrink-0" />
                  <div>
                    <span className="font-bold text-white block">الخبرة الضريبية والمحاسبية</span>
                    <span>محاسبون قانونيون وخبراء فحص معتمدون</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0A192F]/60 border border-slate-800">
                  <MapPin className="w-5 h-5 text-[#C9A227] shrink-0" />
                  <div>
                    <span className="font-bold text-white block">مقر المؤسسة بالجيزة</span>
                    <span>{settings.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>من نحن • فلسفة أركان</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white leading-tight">
              حماية متكاملة{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
                تحت سقف واحد
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal text-balance">
              نحن لسنا مجرد مكتب محاماة تقليدي، بل منظومة متكاملة. ندرك أن الحماية القانونية لا تكتمل
              إلا باستقرار محاسبي وضريبي. نقدم حلولاً استباقية تحمي الأفراد والشركات من النزاعات
              قبل وقوعها، وندير الأزمات باحترافية وسرية تامة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#112240]/40 border border-slate-800">
                <CheckCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">الوقاية قبل التقاضي</h4>
                  <p className="text-xs text-slate-400 mt-0.5">صياغة عقود محكمة تمنع النزاعات وتضمن حقوق الأطراف بصرامة.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#112240]/40 border border-slate-800">
                <CheckCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">الأمان المالي والضريبي</h4>
                  <p className="text-xs text-slate-400 mt-0.5">تجنب التقديرات الجزافية وإعداد ميزانيات وفحص ضريبي قانوني دقيق.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#112240]/40 border border-slate-800">
                <CheckCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">سرية تامة وخصوصية</h4>
                  <p className="text-xs text-slate-400 mt-0.5">حماية كاملة لكافة بيانات ومستندات الموكلين عبر أحدث المعايير.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#112240]/40 border border-slate-800">
                <CheckCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">متابعة إلكترونية رقمية</h4>
                  <p className="text-xs text-slate-400 mt-0.5">إمكانية تتبع تطورات القضية ومواعيد الجلسات عبر بوابة الموكلين.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#112240] hover:bg-[#1B335A] border border-[#C9A227]/40 text-white font-bold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>اكتشف تفاصيل المؤسسة</span>
                <ArrowLeft className="w-4 h-4 text-[#C9A227]" />
              </button>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-sm shadow-lg shadow-[#C9A227]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                حجز استشارة فورية
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
