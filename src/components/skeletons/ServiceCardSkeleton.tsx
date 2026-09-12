import React from 'react';

export interface ServiceCardSkeletonProps {
  count?: number;
}

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div
      data-testid="service-card-skeleton"
      className="group relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#112240]/90 to-[#0B1A2F]/90 border border-[#C9A227]/15 shadow-xl flex flex-col justify-between overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      {/* Subtle Shimmer Sweep */}
      <div className="absolute inset-0 shimmer-element pointer-events-none opacity-40" />

      <div>
        {/* Header: Icon + Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/60" />
          <div className="h-5 w-20 rounded-full bg-slate-800/80 border border-slate-700/40" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-slate-700/70 rounded-lg mb-3 mt-4" />

        {/* Short Description */}
        <div className="space-y-2 mb-6">
          <div className="h-3.5 w-full bg-slate-800/80 rounded" />
          <div className="h-3.5 w-11/12 bg-slate-800/70 rounded" />
          <div className="h-3.5 w-3/4 bg-slate-800/60 rounded" />
        </div>

        {/* Sub-services list */}
        <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]/50" />
            <div className="h-3 w-3/5 bg-slate-800/70 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]/50" />
            <div className="h-3 w-4/5 bg-slate-800/70 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]/50" />
            <div className="h-3 w-1/2 bg-slate-800/70 rounded" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80">
        <div className="h-9 rounded-xl bg-slate-800/80 border border-slate-700/50" />
        <div className="h-9 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/30" />
      </div>
    </div>
  );
};

export const ServicesGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div
      role="status"
      aria-label="جاري تحميل الخدمات القانونية والمالية..."
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <ServiceCardSkeleton key={`srv-skeleton-${idx}`} />
      ))}
      <span className="sr-only">جاري تحميل الخدمات...</span>
    </div>
  );
};
