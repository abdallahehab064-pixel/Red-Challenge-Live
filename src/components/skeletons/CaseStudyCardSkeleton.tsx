import React from 'react';

export const CaseStudyCardSkeleton: React.FC = () => {
  return (
    <div
      data-testid="case-study-skeleton"
      className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#112240] to-[#0B1A2F] border border-[#C9A227]/20 shadow-xl flex flex-col justify-between overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      {/* Subtle Shimmer Sweep */}
      <div className="absolute inset-0 shimmer-element pointer-events-none opacity-40" />

      <div>
        {/* Image Skeleton Placeholder */}
        <div className="w-full h-36 rounded-xl bg-[#0A192F] border border-slate-800/80 mb-4" />

        {/* Top bar: Category Icon + Timeframe Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0A192F] border border-slate-700/60" />
          <div className="h-5 w-16 rounded-full bg-[#0A192F] border border-slate-800" />
        </div>

        {/* Title */}
        <div className="h-6 w-5/6 bg-slate-700/70 rounded-lg mb-4 mt-2" />

        {/* Challenge and Team Action blocks */}
        <div className="space-y-3 mb-4">
          {/* Challenge Box */}
          <div className="p-3 rounded-xl bg-[#0A192F]/60 border border-slate-800 space-y-2">
            <div className="h-3 w-20 bg-amber-400/30 rounded" />
            <div className="h-3 w-full bg-slate-800/80 rounded" />
            <div className="h-3 w-3/4 bg-slate-800/70 rounded" />
          </div>

          {/* Action Box */}
          <div className="p-3 rounded-xl bg-[#0A192F]/60 border border-slate-800 space-y-2">
            <div className="h-3 w-24 bg-[#DFC377]/30 rounded" />
            <div className="h-3 w-full bg-slate-800/80 rounded" />
            <div className="h-3 w-4/5 bg-slate-800/70 rounded" />
          </div>
        </div>
      </div>

      {/* Result Footer */}
      <div className="pt-4 border-t border-slate-800">
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-400/30 shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-20 bg-emerald-400/30 rounded" />
            <div className="h-3 w-4/5 bg-slate-800/80 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CaseStudiesGridSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div
      role="status"
      aria-label="جاري تحميل قصص النجاح ودراسات الحالة..."
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <CaseStudyCardSkeleton key={`case-skeleton-${idx}`} />
      ))}
      <span className="sr-only">جاري تحميل دراسات الحالة...</span>
    </div>
  );
};
