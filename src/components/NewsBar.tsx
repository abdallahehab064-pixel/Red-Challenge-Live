import React, { useState, useEffect } from 'react';
import { Newspaper, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, BellRing, Sparkles } from 'lucide-react';

export interface SyndicateNewsItem {
  id: string;
  badge: string;
  title: string;
  source: string;
  link?: string;
}

const SYNDICATE_NEWS_ITEMS: SyndicateNewsItem[] = [
  {
    id: 'news-1',
    badge: 'نقابة المحامين العامة',
    title: 'بدء تجديد بطاقات القيد والاشتراكات ومشروع الرعاية الصحية إلكترونياً لعام 2026',
    source: 'النقابة العامة للمحامين - القاهرة'
  },
  {
    id: 'news-2',
    badge: 'نقابة التجاريين',
    title: 'تحديث سجلات المحاسبين والمراجعين المعتمدين وشهادات الفحص والاعتماد المحاسبي',
    source: 'النقابة العامة للتجاريين'
  },
  {
    id: 'news-3',
    badge: 'تنبيه نقابي وضرائب',
    title: 'تيسيرات بروتوكول نقابة المحامين ومصلحة الضرائب بشأن منظومة الفاتورة والإيصال الإلكتروني',
    source: 'لجنة الفكر القانوني والضرائب'
  },
  {
    id: 'news-4',
    badge: 'محكمة النقض واستئناف الجيزة',
    title: 'جدول القيد ومواعيد انعقاد دوائر النقض والاستئناف العالي بمجمع محاكم الجيزة',
    source: 'نقابة محامي شمال وجنوب الجيزة'
  },
  {
    id: 'news-5',
    badge: 'معهد المحاماة والتحكيم',
    title: 'فتح باب التسجيل لدورات التحكيم التجاري وصياغة العقود الاستثمارية للدفعة الجديدة',
    source: 'لجنة التدريب ومعهد المحاماة'
  }
];

export const NewsBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Real-time clock updater every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle news items automatically
  useEffect(() => {
    if (isPaused) return;
    const ticker = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SYNDICATE_NEWS_ITEMS.length);
    }, 5500);
    return () => clearInterval(ticker);
  }, [isPaused]);

  // Format date in Arabic locale (e.g. السبت، 12 سبتمبر 2026)
  const formattedDate = new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentTime);

  // Format time in Arabic 12-hour format with seconds (e.g. 07:15:30 م)
  const formattedTime = new Intl.DateTimeFormat('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(currentTime);

  const activeNews = SYNDICATE_NEWS_ITEMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SYNDICATE_NEWS_ITEMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SYNDICATE_NEWS_ITEMS.length) % SYNDICATE_NEWS_ITEMS.length);
  };

  return (
    <div
      id="top-news-bar"
      role="region"
      aria-label="شريط أخبار النقابة العامة والوقت والتاريخ"
      className="bg-gradient-to-r from-[#060D19] via-[#0B1E3B] to-[#060D19] border-b border-[#C9A227]/35 text-white relative z-50 text-xs py-2 px-3 sm:px-6 select-none shadow-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Right side: Syndicate News Ticker */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-1 min-w-0">
          {/* Badge indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#FAF0CA] font-bold shrink-0 shadow-sm shadow-[#C9A227]/15">
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

          {/* Mini navigation controls (Without counter as requested) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrev}
              title="الخبر السابق"
              className="p-1 rounded bg-[#112240] hover:bg-[#1B335A] border border-slate-700/70 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              title="الخبر التالي"
              className="p-1 rounded bg-[#112240] hover:bg-[#1B335A] border border-slate-700/70 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Left side: Current Date & Clock */}
        <div className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-3 shrink-0 border-t sm:border-t-0 pt-1.5 sm:pt-0 border-slate-800/80 w-full sm:w-auto text-[11px] sm:text-xs">
          {/* Today's Date */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A192F]/80 border border-slate-800 text-slate-300 shadow-inner">
            <CalendarIcon className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
            <span className="font-medium whitespace-nowrap text-[#FAF0CA]">{formattedDate}</span>
          </div>

          {/* Live Clock */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A192F]/80 border border-[#C9A227]/30 text-[#DFC377] shadow-inner font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
            <span className="tracking-wide" dir="ltr">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
