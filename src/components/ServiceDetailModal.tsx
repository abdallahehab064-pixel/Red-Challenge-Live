import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  ArrowLeft,
  Scale,
  Building2,
  Calculator,
  TrendingUp,
  ShieldAlert,
  Coins,
  FileText
} from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const {
    selectedService,
    setSelectedService,
    setIsBookingModalOpen,
    setBookingServicePreset,
  } = useApp();

  if (!selectedService) return null;

  const handleBookNow = () => {
    setBookingServicePreset(selectedService.id);
    setSelectedService(null);
    setIsBookingModalOpen(true);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-7 h-7 text-[#C9A227]" />;
      case 'Building2':
        return <Building2 className="w-7 h-7 text-[#C9A227]" />;
      case 'Calculator':
        return <Calculator className="w-7 h-7 text-[#C9A227]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-7 h-7 text-[#C9A227]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-7 h-7 text-[#C9A227]" />;
      case 'Coins':
        return <Coins className="w-7 h-7 text-[#C9A227]" />;
      default:
        return <FileText className="w-7 h-7 text-[#C9A227]" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'legal':
        return 'قسم الخدمات القانونية والتقاضي';
      case 'accounting':
        return 'قسم الخدمات المحاسبية والمالية';
      case 'tax':
        return 'قسم الاستشارات والنزاعات الضريبية';
      default:
        return 'خدمات مؤسسة أركان';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-8 bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl overflow-hidden shadow-2xl text-right">
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#07101E] via-[#0D2240] to-[#0A192F] border-b border-[#C9A227]/30">
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-6 left-6 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C9A227]/15 border border-[#C9A227]/40 flex items-center justify-center shrink-0">
              {getIcon(selectedService.icon)}
            </div>
            <div>
              <span className="text-xs font-semibold text-[#DFC377] block mb-1">
                {getCategoryLabel(selectedService.category)}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                {selectedService.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Full Description */}
          <div>
            <h3 className="text-sm font-bold text-[#DFC377] uppercase tracking-wider mb-2">
              نظرة عامة على الخدمة
            </h3>
            <p className="text-base text-slate-200 leading-relaxed">
              {selectedService.fullDescription}
            </p>
          </div>

          {/* Sub-services list */}
          <div>
            <h3 className="text-sm font-bold text-[#DFC377] uppercase tracking-wider mb-3">
              نطاق العمل والخدمات المتفرعة
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(selectedService.subServices || []).map((sub, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0A192F] border border-slate-800 text-xs sm:text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Procedure Steps */}
          <div>
            <h3 className="text-sm font-bold text-[#DFC377] uppercase tracking-wider mb-3">
              خطوات ومراحل التعامل
            </h3>
            <div className="space-y-3">
              {(selectedService.procedureSteps || []).map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#112240]/60 border border-[#C9A227]/20"
                >
                  <span className="w-6 h-6 rounded-full bg-[#C9A227] text-[#0A192F] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-sm font-bold text-[#DFC377] uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#C9A227]" />
              <span>المستندات والأوراق المطلوبة</span>
            </h3>
            <ul className="space-y-2">
              {(selectedService.requiredDocuments || []).map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-[#0A192F]/60 p-2.5 rounded-lg border border-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service FAQ */}
          {selectedService.faqs && selectedService.faqs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#DFC377] uppercase tracking-wider mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C9A227]" />
                <span>الأسئلة الشائعة حول هذه الخدمة</span>
              </h3>
              <div className="space-y-3">
                {(selectedService.faqs || []).map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0A192F] border border-slate-800 space-y-1.5"
                  >
                    <h4 className="font-heading font-bold text-sm text-white">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-[#07101E] border-t border-[#C9A227]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            للحصول على دراسة قانونية أو محاسبية مخصصة لحالتك
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              إغلاق
            </button>
            <button
              onClick={handleBookNow}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>احجز استشارتك مع مستشار متخصص</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
