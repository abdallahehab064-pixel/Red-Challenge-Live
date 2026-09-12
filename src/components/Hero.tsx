import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Play, Shield, Award, CheckCircle2, ChevronDown, PhoneCall, Sparkles } from 'lucide-react';
import { ArkanLogo } from './ArkanLogo';

export const Hero: React.FC = () => {
  const { setIsBookingModalOpen, setActiveView } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A192F] text-[#F5F5F0]">
      {/* Ambient Dark Marble & Geometry Texture Background */}
      <div className="absolute inset-0 z-0">
        {/* Cinematic Video / Ambient Loop Representation with fallback */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity scale-105 filter blur-[1px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-lawyer-leafing-through-a-law-book-42416-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Multi-layered Dark Luxury Gradients & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-[#0A192F]/80 to-[#0A192F] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,162,39,0.15),rgba(255,255,255,0))] z-10" />

        {/* Subtle Geometric Legal & Financial Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A227_1px,transparent_1px),linear-gradient(to_bottom,#C9A227_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.05] z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        {/* Official Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112240]/90 border border-[#C9A227]/40 shadow-lg shadow-[#C9A227]/10 mb-8 backdrop-blur-md animate-fade-in">
          <Shield className="w-4 h-4 text-[#C9A227]" />
          <span className="text-xs sm:text-sm font-semibold text-[#DFC377]">
            منظومة متكاملة: محاماة • استشارات مالية • محاسبة وضريبة
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
          <span className="text-xs text-slate-300 hidden sm:inline">الجيزة - الهرم</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.2] mb-6 text-white">
          مؤسسة أركان..{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] via-[#DFC377] to-[#C9A227] drop-shadow-sm">
            درعك القانوني والمالي
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed mb-10 text-balance">
          كيان متكامل يجمع بين صرامة القانون ودقة الأرقام. نخبة من المحامين والمستشارين لحماية أعمالك،
          تمثيلك أمام كافة درجات المحاكم، وضمان استقرارك المالي والضريبي.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            id="hero-book-consultation"
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A227] via-[#DFC377] to-[#A37E1C] text-[#0A192F] font-bold text-base shadow-xl shadow-[#C9A227]/25 hover:shadow-[#C9A227]/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>احجز استشارتك الآن</span>
          </button>

          <button
            id="hero-watch-video"
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#112240]/80 hover:bg-[#1B335A] border border-[#C9A227]/40 text-slate-100 hover:text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 backdrop-blur-md cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/50 flex items-center justify-center group-hover:bg-[#C9A227] transition-colors">
              <Play className="w-4 h-4 text-[#DFC377] group-hover:text-[#0A192F] fill-current ml-0.5" />
            </div>
            <span>شاهد الفيديو التعريفي</span>
          </button>
        </div>

        {/* Quick Highlights / Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80 text-right">
          <div className="flex items-center gap-2.5 p-2">
            <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              محامون مقيدون بالنقض
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2">
            <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              محاسبون وخبراء ضرائب معتمدون
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2">
            <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              نظام حجز وأرقام دور فورية
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2">
            <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              سرية مطلقة وأمان للمستندات
            </span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1E38] border border-[#C9A227]/40 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#07101E]">
              <div className="flex items-center gap-2">
                <ArkanLogo size={32} showText={false} variant="emblem-only" />
                <h3 className="font-heading font-bold text-white text-base">
                  مؤسسة أركان.. كيان قانوني ومالي متكامل
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-lawyer-leafing-through-a-law-book-42416-large.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="p-4 bg-[#0A192F] flex items-center justify-between">
              <p className="text-xs text-slate-300">
                مقرنا: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، الجيزة
              </p>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-[#C9A227] text-[#0A192F] font-bold text-xs hover:bg-[#DFC377] transition-colors"
              >
                احجز استشارتك الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
