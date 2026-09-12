import React, { useState, useEffect } from 'react';
import { Newspaper, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, BellRing } from 'lucide-react';

interface SyndicateNewsItem {
  id: string;
  badge: string;
  title: string;
  source: string;
  link?: string;
}

const SYNDICATE_NEWS: SyndicateNewsItem[] = [
  {
    id: 'syn-1',
    badge: 'نقابة المحامين العامة',
    title: 'تجديد القيد والاشتراكات السنوية وبطاقات العلاج عبر المنظومة الإلكترونية الموحدة لعام 2026',
    source: 'النقابة العامة للمحامين - القاهرة'
  },
  {
    id: 'syn-2',
    badge: 'نقابة التجاريين',
    title: 'فتح باب القيد بجدول المحاسبين والمراجعين واستخراج شهادات مزاولة المهنة للمكاتب المعتمدة',
    source: 'النقابة العامة للتجاريين'
  },
  {
    id: 'syn-3',
    badge: 'تنبيه نقابي',
    title: 'تيسيرات بروتوكول نقابة المحامين ومصلحة الضرائب بشأن منظومة الفاتورة والإيصال الإلكتروني',
    source: 'لجنة الفكر القانوني والضرائب'
  },
  {
    id: 'syn-4',
    badge: 'المحامين بالنقض',
    title: 'إعلان جدول القيد بنقض الجيزة وتحديث مواعيد الحضور أمام الدوائر المدنية والتجارية بمجمع المحاكم',
    source: 'نقابة محامي شمال وجنوب الجيزة'
  },
  {
    id: 'syn-5',
    badge: 'معهد المحاماة',
    title: 'انطلاق دورات معهد المحاماة والتحكيم التجاري الدولي للدفعة الجديدة من خريجي كليات الحقوق والشريعة',
    source: 'لجنة التدريب ومعهد المحاماة'
  }
];

export const SyndicateTickerBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  // Real-time clock updater every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // News ticker cycling every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const ticker = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SYNDICATE_NEWS.length);
    }, 5500);
    return () => clearInterval(ticker);
  }, [isPaused]);

  // Format date in Egyptian Arabic format (e.g., السبت، 12 سبتمبر 2026)
  const formattedDate = new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentDateTime);

  // Format 12-hour time with seconds and am/pm (e.g., 07:15:20 م)
  const formattedTime = new Intl.DateTimeFormat('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(currentDateTime);

  const activeNews = SYNDICATE_NEWS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SYNDICATE_NEWS.length) % SYNDICATE_NEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SYNDICATE_NEWS.length);
  };

  return (
    <div
      className="bg-gradient-to-r from-[#060D19] via-[#0D1E36] to-[#060D19] border-b border-[#C9A227]/30 text-white relative z-50 text-xs py-2 px-3 sm:px-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="شريط أخبار النقابة العامة والتوقيت المحلي"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Right side: Syndicate News Ticker */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-1 min-w-0">
          {/* Badge indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/50 text-[#FAF0CA] font-bold shrink-0 shadow-sm shadow-[#C9A227]/10">
            <Newspaper className="w-3.5 h-3.5 text-[#C9A227] animate-pulse" />
            <span className="text-[11px] sm:text-xs text-[#DFC377] whitespace-nowrap">
              أخبار النقابة العامة:
            </span>
          </div>

          {/* Active News Item */}
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#112240] text-[#FAF0CA] border border-slate-700/60 shrink-0">
              {activeNews.badge}
            </span>
            <p className="text-[11px] sm:text-xs text-slate-200 hover:text-[#DFC377] transition-colors truncate font-medium">
              {activeNews.title}
            </p>
          </div>

          {/* Mini navigation arrows */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrev}
              title="الخبر السابق"
              className="p-1 rounded bg-[#112240] hover:bg-[#1B335A] border border-slate-700/70 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
            <span className="text-[10px] text-[#C9A227] font-mono px-1">
              {currentIndex + 1}/{SYNDICATE_NEWS.length}
            </span>
            <button
              onClick={handleNext}
              title="الخبر التالي"
              className="p-1 rounded bg-[#112240] hover:bg-[#1B335A] border border-slate-700/70 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Left side: Live Date & Clock Widget */}
        <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-1.5 sm:pt-0 border-slate-800/80 w-full sm:w-auto text-[11px] sm:text-xs">
          {/* Today's Date */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1A2F]/80 border border-slate-800 text-slate-300 shadow-inner">
            <CalendarIcon className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
            <span className="font-medium whitespace-nowrap text-[#FAF0CA]">{formattedDate}</span>
          </div>

          {/* Live Clock */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1A2F]/80 border border-[#C9A227]/30 text-[#DFC377] shadow-inner font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-[#C9A227] shrink-0 animate-spin-slow" />
            <span className="tracking-wide" dir="ltr">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
