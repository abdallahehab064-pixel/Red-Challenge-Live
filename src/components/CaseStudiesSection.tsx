import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CaseStudy } from '../types';
import { CaseStudiesGridSkeleton } from './skeletons/CaseStudyCardSkeleton';
import { ShieldCheck, Award, ArrowLeft, CheckCircle2, Building, Scale, Calculator, RotateCw } from 'lucide-react';

interface CaseStudiesSectionProps {
  isLoading?: boolean;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ isLoading }) => {
  const { caseStudies, setIsBookingModalOpen, isLoadingCaseStudies, refreshCaseStudies } = useApp();
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const isSectionLoading =
    isLoading !== undefined ? isLoading : (isLoadingCaseStudies || !caseStudies || caseStudies.length === 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tax':
        return <Calculator className="w-5 h-5 text-[#C9A227]" />;
      case 'corporate':
        return <Building className="w-5 h-5 text-[#C9A227]" />;
      default:
        return <Scale className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section id="case-studies" className="py-20 bg-[#07101E] text-[#F5F5F0] border-t border-b border-[#1E2E47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>سجل الإنجازات والحلول الواقعية</span>
            </div>
            <button
              onClick={() => refreshCaseStudies()}
              title="تحديث قصص النجاح"
              disabled={isSectionLoading}
              className="p-1.5 rounded-full bg-[#112240] border border-slate-800 text-slate-400 hover:text-[#DFC377] hover:border-[#C9A227]/40 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSectionLoading ? 'animate-spin text-[#C9A227]' : ''}`} />
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-3">
            قصص نجاح{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
              ودراسات حالة
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            نماذج واقعية لكيفية حماية أركان لكيانات وأفراد في نزاعات قضائية وضريبية ومفاوضات تجارية معقدة.
          </p>
        </div>

        {/* Case Studies Grid or Skeleton Loader */}
        {isSectionLoading ? (
          <CaseStudiesGridSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(caseStudies || []).map((cs) => (
              <div
                key={cs.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#112240] to-[#0B1A2F] border border-[#C9A227]/25 hover:border-[#C9A227]/50 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              >
                <div>
                  {cs.imageUrl && (
                    <div className="w-full h-36 rounded-xl overflow-hidden mb-4 border border-slate-800 relative bg-[#0A192F]">
                      <img
                        src={cs.imageUrl}
                        alt={cs.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2F] via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0A192F] border border-[#C9A227]/30 flex items-center justify-center">
                      {getCategoryIcon(cs.category)}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#DFC377] px-2.5 py-1 rounded-full bg-[#0A192F] border border-slate-800">
                      {cs.timeframe || cs.date || 'منجز'}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-white mb-3 group-hover:text-[#DFC377] transition-colors leading-snug">
                    {cs.title}
                  </h3>

                  <div className="space-y-3 text-xs mb-4">
                    <div className="p-3 rounded-xl bg-[#0A192F]/60 border border-slate-800">
                      <span className="font-bold text-amber-400 block mb-0.5">التحدي والنزاع:</span>
                      <p className="text-slate-300">{cs.challenge || cs.problem}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0A192F]/60 border border-slate-800">
                      <span className="font-bold text-[#DFC377] block mb-0.5">إجراءات فريق أركان:</span>
                      <p className="text-slate-300">{cs.actionTaken || cs.approach || cs.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">النتيجة المحققة:</span>
                      <span className="text-xs text-slate-200">{cs.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#112240] via-[#1B335A] to-[#0A192F] border border-[#C9A227]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-1">
              هل تواجه نزاعاً قانونياً أو مأزقاً ضريبياً مشابهاً؟
            </h4>
            <p className="text-xs text-slate-300">
              فريقنا جاهز لدراسة المستندات ووضع استراتيجية دفاع ومفاوضات محكمة.
            </p>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-[#C9A227] hover:bg-[#DFC377] text-[#0A192F] font-bold text-xs sm:text-sm transition-all shadow-lg cursor-pointer shrink-0"
          >
            احجز موعد دراسة ملف
          </button>
        </div>
      </div>
    </section>
  );
};
