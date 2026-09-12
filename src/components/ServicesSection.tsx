import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Service, ServiceCategory } from '../types';
import { ServicesGridSkeleton } from './skeletons/ServiceCardSkeleton';
import {
  Scale,
  Building2,
  Calculator,
  TrendingUp,
  ShieldAlert,
  Coins,
  FileText,
  Search,
  ArrowLeft,
  Calendar,
  Sparkles,
  RotateCw
} from 'lucide-react';

interface ServicesSectionProps {
  isLoading?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ isLoading }) => {
  const {
    services,
    setSelectedService,
    setIsBookingModalOpen,
    setBookingServicePreset,
    isLoadingServices,
    refreshServices
  } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isSectionLoading =
    isLoading !== undefined ? isLoading : (isLoadingServices || !services || services.length === 0);

  const filterTabs = [
    { id: 'all', label: 'كافة الخدمات' },
    { id: 'legal', label: 'الخدمات القانونية والتقاضي' },
    { id: 'accounting', label: 'الخدمات المحاسبية والمالية' },
    { id: 'tax', label: 'الخدمات والنزاعات الضريبية' },
  ];

  const filteredServices = (services || []).filter((srv) => {
    const matchesCategory = activeFilter === 'all' || srv.category === activeFilter;
    const matchesSearch =
      (srv.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (srv.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (srv.subServices || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#C9A227]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#C9A227]" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-[#C9A227]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#C9A227]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#C9A227]" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-[#C9A227]" />;
      default:
        return <FileText className="w-6 h-6 text-[#C9A227]" />;
    }
  };

  const getCategoryBadge = (category: ServiceCategory) => {
    switch (category) {
      case 'legal':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/40">قانوني وقضائي</span>;
      case 'accounting':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">محاسبي ومالي</span>;
      case 'tax':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/40">ضرائب وفحص</span>;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-[#0A192F] text-[#F5F5F0] relative">
      {/* Decorative subtle background accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C9A227]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>خدمات متخصصة للأفراد والشركات والمستثمرين</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white mb-4">
            خدمات مؤسسة{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] via-[#DFC377] to-[#C9A227]">
              أركان
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            منظومة عمل متكاملة تقدم حلولاً قانونية ومالية مدروسة بدقة، مصممة لحماية مصالحك التجارية
            واستقرارك المالي أمام كافة الجهات الرسمية والقضائية.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#C9A227] text-[#0A192F] shadow-lg shadow-[#C9A227]/20 font-bold'
                    : 'bg-[#112240] text-slate-300 hover:text-white hover:bg-[#1B335A] border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input and Refresh Button */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                placeholder="ابحث عن خدمة (عقود، ضرائب، شركات...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#112240] border border-slate-700/80 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A227] transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5" />
            </div>

            <button
              onClick={() => refreshServices()}
              title="تحديث قائمة الخدمات"
              disabled={isSectionLoading}
              className="p-2.5 rounded-xl bg-[#112240] border border-slate-700/80 text-slate-300 hover:text-[#DFC377] hover:border-[#C9A227]/40 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isSectionLoading ? 'animate-spin text-[#C9A227]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Services Content: Skeleton Loader or Rendered Services */}
        {isSectionLoading ? (
          <ServicesGridSkeleton count={6} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#112240]/90 to-[#0B1A2F]/90 border border-[#C9A227]/20 hover:border-[#C9A227]/50 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0A192F] border border-[#C9A227]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getIcon(service.icon)}
                      </div>
                      {getCategoryBadge(service.category)}
                    </div>

                    <h3 className="font-heading font-black text-lg sm:text-xl text-white mb-2.5 group-hover:text-[#DFC377] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Sub-services pills */}
                    <div className="space-y-1.5 mb-6 pt-4 border-t border-slate-800">
                      {(service.subServices || []).slice(0, 3).map((sub, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                          <span className="truncate">{sub}</span>
                        </div>
                      ))}
                      {service.subServices && service.subServices.length > 3 && (
                        <span className="text-[11px] text-[#C9A227] block pt-1">
                          +{service.subServices.length - 3} خدمات وتفاصيل إضافية
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="py-2.5 px-3 rounded-xl bg-[#0A192F] hover:bg-[#1B335A] border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>اعرف المزيد</span>
                      <ArrowLeft className="w-3.5 h-3.5 text-[#C9A227]" />
                    </button>

                    <button
                      onClick={() => {
                        setBookingServicePreset(service.id);
                        setIsBookingModalOpen(true);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] hover:brightness-110 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#C9A227]/10"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>احجز الآن</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-16 bg-[#112240]/40 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-sm">
                  لم يتم العثور على خدمات مطابقة للبحث. جرب كلمات أخرى أو تواصل معنا مباشرة.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
