import React from 'react';
import { useApp } from '../context/AppContext';
import { ArkanLogo } from './ArkanLogo';
import {
  MapPin,
  Phone,
  Clock,
  Shield,
  User,
  Tv,
  Bot,
  Calculator,
  ChevronLeft,
  ArrowUp,
  AlertTriangle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActiveView,
    setIsBookingModalOpen,
    setIsClientPortalOpen,
    setIsAdminLoginOpen,
    setIsAIAssistantOpen,
    settings,
  } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن وفلسفة أركان' },
    { id: 'services', label: 'خدماتنا القانونية والضريبية' },
    { id: 'news', label: 'الأخبار ورادار التشريعات' },
    { id: 'case-studies', label: 'دراسات الحالة وقصص النجاح' },
    { id: 'resources', label: 'النماذج والعقود المجانية' },
    { id: 'team', label: 'فريق العمل والمستشارين' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
    { id: 'contact', label: 'تواصل معنا والمقر' },
  ];

  return (
    <footer className="bg-[#050C16] text-[#F5F5F0] border-t border-[#C9A227]/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Firm Overview & Logo (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <ArkanLogo size={58} />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              كيان متكامل يجمع بين صرامة القانون ودقة الأرقام. نخبة من المحامين والمستشارين لحماية أعمالك،
              تمثيلك أمام كافة درجات المحاكم، وضمان استقرارك المالي والضريبي.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setIsClientPortalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1B335A] text-[#DFC377] border border-[#C9A227]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>بوابة الموكلين</span>
              </button>

              <button
                onClick={() => setIsAIAssistantOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1B335A] text-[#DFC377] border border-[#C9A227]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>المساعد الذكي</span>
              </button>

              <button
                onClick={() => setActiveView('queue-display')}
                className="px-3 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1B335A] text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>شاشة الطابور</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-sm text-white border-r-2 border-[#C9A227] pr-2">
              أقسام المنصة
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id as any);
                      scrollToTop();
                    }}
                    className="hover:text-[#DFC377] transition-colors flex items-center gap-1.5 py-1 text-right cursor-pointer"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#C9A227]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-heading font-black text-sm text-white border-r-2 border-[#C9A227] pr-2">
              مقر المؤسسة وأرقام التواصل
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <div className="flex items-center gap-3 font-mono" dir="ltr">
                  <a href={`tel:${settings.phone1}`} className="hover:text-[#C9A227]">
                    {settings.phone1}
                  </a>
                  <span>/</span>
                  <a href={`tel:${settings.phone2}`} className="hover:text-[#C9A227]">
                    {settings.phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>{settings.workHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsBookingModalOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                <span>احجز موعد استشارتك مع مستشار متخصص</span>
              </button>
            </div>
          </div>
        </div>

        {/* MANDATORY LEGAL DISCLAIMER MANDATED BY PROMPT (Section 51) */}
        <div className="my-8 p-4 rounded-2xl bg-[#091524] border border-amber-800/40 text-xs text-slate-300 leading-relaxed space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>إخلاء مسؤولية وتنويه قانوني عام:</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            {settings.disclaimerText}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Dedicated Control Panel Entry (Only at bottom of page as requested) */}
        <div id="footer-control-panel-section" className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-slate-800/80">
          <div>
            <span>© {new Date().getFullYear()} {settings.orgName}. جميع الحقوق محفوظة.</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Control Panel Button: Dedicated entrance at the bottom of the page */}
            <button
              id="bottom-control-panel-btn"
              onClick={() => setIsAdminLoginOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1B335A] border border-[#C9A227]/40 text-[#DFC377] hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow"
              title="لوحة التحكم ونظام تشغيل أركان (المدير، السكرتارية، المحامي)"
            >
              <Shield className="w-4 h-4 text-[#C9A227]" />
              <span className="font-bold">لوحة التحكم ومنظومة أركان</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C9A227]/20 text-amber-200">
                إدارة / سكرتارية / محامي
              </span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#112240] text-[#DFC377] hover:bg-[#1B335A] transition-colors cursor-pointer"
              aria-label="العودة للأعلى"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
