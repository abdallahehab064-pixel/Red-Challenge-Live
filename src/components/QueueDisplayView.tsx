import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArkanLogo } from './ArkanLogo';
import { Volume2, ArrowLeft, Clock, Users, UserCheck, BellRing, Sparkles } from 'lucide-react';

export const QueueDisplayView: React.FC = () => {
  const {
    currentServingQueue,
    nextServingQueue,
    bookings,
    setActiveView,
    callNextQueueItem,
  } = useApp();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = (bookings || []).filter((b) => b.date === todayStr);

  // Audio tone generation for office chime
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#060D17] text-[#F5F5F0] p-4 sm:p-8 flex flex-col justify-between">
      {/* Top Bar for Queue Screen */}
      <div className="flex items-center justify-between pb-6 border-b border-[#C9A227]/30">
        <div className="flex items-center gap-4">
          <ArkanLogo size={60} showText={true} />
          <div className="hidden md:block">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              نظام الاستقبال الرقمي
            </span>
            <h1 className="font-heading font-black text-xl text-white">
              شاشة صالة الانتظار والمواعيد
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Live Clock */}
          <div className="text-left font-mono">
            <div className="text-2xl sm:text-3xl font-black text-[#DFC377]" dir="ltr">
              {currentTime.toLocaleTimeString('ar-EG')}
            </div>
            <div className="text-xs text-slate-400">
              {currentTime.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          <button
            onClick={() => setActiveView('home')}
            className="px-4 py-2 rounded-xl bg-[#112240] hover:bg-[#1B335A] text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A227]" />
            <span>العودة للموقع</span>
          </button>
        </div>
      </div>

      {/* Main Queue Numbers Big Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8">
        {/* CURRENT SERVING NUMBER (Hero Focus) */}
        <div className="lg:col-span-8">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#112240] to-[#0A192F] border-2 border-[#C9A227] shadow-2xl text-center overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-400">جلسة جارية الآن</span>
            </div>

            <span className="text-sm sm:text-lg font-bold text-[#DFC377] uppercase tracking-widest block mb-4">
              الدور الحالي المنادى عليه
            </span>

            {/* Giant Number */}
            <div className="text-8xl sm:text-9xl md:text-[13rem] font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9E6] via-[#DFC377] to-[#C9A227] my-2 drop-shadow-2xl">
              {currentServingQueue}
            </div>

            <div className="pt-6 border-t border-[#C9A227]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">القاعة / المكتب:</span>
                <span className="font-heading font-black text-lg sm:text-xl text-white">
                  المكتب الاستشاري الرئيسي • قاعة المستشار
                </span>
              </div>

              <button
                onClick={() => {
                  playChime();
                  callNextQueueItem();
                }}
                className="px-6 py-3 rounded-xl bg-[#C9A227] hover:bg-[#DFC377] text-[#0A192F] font-bold text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <BellRing className="w-5 h-5" />
                <span>نداء وتنبيه صوتي (التالي)</span>
              </button>
            </div>
          </div>
        </div>

        {/* NEXT NUMBER & UPCOMING WAITING QUEUE */}
        <div className="lg:col-span-4 space-y-6">
          {/* Next in line */}
          <div className="p-6 rounded-3xl bg-[#112240] border border-[#C9A227]/40 shadow-xl text-center">
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block mb-2">
              الدور التالي للاستعداد:
            </span>
            <div className="text-6xl sm:text-7xl font-black font-mono text-white mb-2">
              {nextServingQueue}
            </div>
            <p className="text-xs text-[#DFC377]">
              برجاء التواجد بالقرب من صالة الاستقبال والتجهيز للدخول
            </p>
          </div>

          {/* List of today's waiting */}
          <div className="p-6 rounded-3xl bg-[#0A192F] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C9A227]" />
                <h4 className="font-heading font-bold text-sm text-white">قائمة اليوم الحالية</h4>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {todayBookings.length} موعد مسجل
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {todayBookings.map((b) => (
                <div
                  key={b.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                    b.queueNumber === currentServingQueue
                      ? 'bg-[#C9A227]/20 border-[#C9A227] text-white font-bold'
                      : 'bg-[#112240]/40 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-[#DFC377] w-10 text-center text-sm">
                      {b.queueNumber}
                    </span>
                    <span>{b.clientName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{b.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom instructions footer */}
      <div className="p-4 rounded-2xl bg-[#0B1A2F] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C9A227]" />
          <span>نظام الطابور الذكي لمؤسسة أركان يضمن التباعد، التنظيم، واحترام وقت السادة الموكلين.</span>
        </div>
        <div>
          <span>مقر المؤسسة: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، الجيزة</span>
        </div>
      </div>
    </div>
  );
};
