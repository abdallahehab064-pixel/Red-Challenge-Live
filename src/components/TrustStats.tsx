import React, { useEffect, useState, useRef } from 'react';
import { Award, Briefcase, Building, Layers } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  title: string;
  subtitle: string;
}

const StatCounter: React.FC<StatItemProps> = ({ icon, value, prefix = '', suffix = '', title, subtitle }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1800;
    const steps = 40;
    const increment = value / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasAnimated, value]);

  return (
    <div
      ref={elementRef}
      className="relative p-6 rounded-2xl bg-gradient-to-b from-[#112240]/80 to-[#0B1A2F]/90 border border-[#C9A227]/25 shadow-xl hover:border-[#C9A227]/50 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#C9A227]/15 border border-[#C9A227]/30 flex items-center justify-center text-[#DFC377] group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#0A192F] text-[#C9A227] border border-[#C9A227]/20">
          مؤسسي
        </span>
      </div>

      <div className="mb-2">
        <div className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white flex items-center gap-1" dir="ltr">
          <span className="text-[#C9A227]">{prefix}</span>
          <span>{count}</span>
          <span className="text-[#DFC377]">{suffix}</span>
        </div>
      </div>

      <h3 className="font-heading font-bold text-base sm:text-lg text-slate-100 mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export const TrustStats: React.FC = () => {
  return (
    <section className="relative py-12 -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCounter
          icon={<Award className="w-6 h-6" />}
          value={15}
          prefix="+"
          suffix=" عاماً"
          title="من الخبرة المتراكمة"
          subtitle="سجل حافل في الدفاع والمرافعة والاستشارات في كبرى القضايا التجارية والمدنية."
        />

        <StatCounter
          icon={<Briefcase className="w-6 h-6" />}
          value={500}
          prefix="+"
          suffix=""
          title="قضية واستشارة ناجحة"
          subtitle="بنسب نجاح استثنائية أمام مختلف درجات التقاضي ولجان الطعن الضريبي."
        />

        <StatCounter
          icon={<Building className="w-6 h-6" />}
          value={50}
          prefix="+"
          suffix=" شركة"
          title="تم تأسيسها وهيكلتها"
          subtitle="مرافقة قانونية ومحاسبية متكاملة لرواد الأعمال والشركات الاستثمارية."
        />

        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1B335A] to-[#0D203F] border border-[#C9A227]/40 shadow-xl flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center text-[#DFC377] mb-4">
            <Layers className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs text-[#C9A227] font-semibold uppercase tracking-wider block mb-1">
              مفهوم متكامل
            </span>
            <h3 className="font-heading font-black text-xl text-white mb-2 leading-tight">
              خدمات قانونية ومالية متكاملة
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              تحت سقف واحد ندمج صرامة القانون مع دقة الأرقام لحماية استثماراتك واستقرارك المستقبلي.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
