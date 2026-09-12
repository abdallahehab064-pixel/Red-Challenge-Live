import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Phone } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs, setIsBookingModalOpen, setIsAIAssistantOpen, settings } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const categories = [
    { id: 'all', label: 'كافة الأسئلة' },
    { id: 'booking', label: 'الحجز والمواعيد' },
    { id: 'fees', label: 'الأتعاب والتكاليف' },
    { id: 'legal', label: 'الخدمات القانونية' },
    { id: 'tax', label: 'الضرائب والمحاسبة' },
    { id: 'portal', label: 'بوابة الموكلين والسرية' },
  ];

  const filteredFaqs = (faqs || []).filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      (faq.question || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      (faq.answer || '').toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-20 bg-[#07101E] text-[#F5F5F0] border-t border-b border-[#1E2E47]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>إجابات واضحة وشفافة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-3">
            الأسئلة{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
              الشائعة
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            كل ما يهمك معرفته حول نظام الحجز، الأتعاب، آليات العمل وسرية المستندات في مؤسسة أركان.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث في الأسئلة الشائعة (مثلاً: رقم الدور، الأتعاب، الضرائب...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A192F] border border-slate-700/80 rounded-2xl px-5 py-3 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A227] transition-colors"
            />
            <Search className="w-5 h-5 text-slate-400 absolute top-3.5 right-4" />
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#C9A227] text-[#0A192F] font-bold'
                    : 'bg-[#112240] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#0A192F] border border-[#C9A227]/20 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 hover:bg-[#112240]/50 transition-colors cursor-pointer"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#112240] flex items-center justify-center text-[#DFC377] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-[#0A192F] rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-xs sm:text-sm">
                لم نجد إجابة تطابق بحثك. يسعدنا الإجابة على استفسارك مباشرة عبر واتساب أو الهاتف.
              </p>
            </div>
          )}
        </div>

        {/* Quick Help Footer */}
        <div className="mt-10 p-6 rounded-3xl bg-[#112240] border border-[#C9A227]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 flex items-center justify-center text-[#DFC377] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">لديك استفسار قانوني عاجل؟</h4>
              <p className="text-xs text-slate-300">مساعد أركان الذكي وفريق الاستقبال متاحان لمساعدتك.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1B335A] text-[#DFC377] border border-[#C9A227]/40 text-xs font-bold transition-all cursor-pointer"
            >
              اسأل المساعد الذكي
            </button>
            <a
              href={`https://wa.me/201141754963?text=${encodeURIComponent('السلام عليكم، استفسار بشأن خدمات مؤسسة أركان')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
            >
              محادثة واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
