import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Article, LegislationItem, ResourceTemplate } from '../types';
import {
  Newspaper,
  Radio,
  FileDown,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Download,
  Search,
  Tag,
  CheckCircle2,
  X
} from 'lucide-react';

export const ContentAndRadar: React.FC = () => {
  const { articles, legislationRadar, freeResources, setIsBookingModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'news' | 'radar' | 'resources'>('news');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Trigger resource download
  const handleDownloadResource = (template: ResourceTemplate) => {
    // Generate text/markdown document and download directly
    const element = document.createElement('a');
    const fileContent = `
=====================================================
مؤسسة أركان للمحاماة والاستشارات القانونية والمحاسبية والضريبية
${template.title} (${template.category})
=====================================================

تاريخ الإصدار: ${new Date().toLocaleDateString('ar-EG')}
المقر: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، الجيزة
الهواتف: 01141754963 / 01551658173

-----------------------------------------------------
الوصف والإرشادات:
${template.description}

تنبيه هام:
هذا النموذج استرشادي عام ومقدم مجاناً من مؤسسة أركان. يُنصح بمراجعة المستشار القانوني لصياغة البنود الخاصة وضمان أقصى حماية لمصالحك التعاقدية.
=====================================================
`;
    const file = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.title.replace(/\s+/g, '_')}_مؤسسة_أركان.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccessMessage(`تم تحميل نموذج "${template.title}" بنجاح!`);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  return (
    <section id="content-center" className="py-20 bg-[#0A192F] text-[#F5F5F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>مركز المعرفة والرادار التشريعي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-3">
            المعرفة القانونية{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
              والمالية المحدثة
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            متابعة حية لأحدث التعديلات التشريعية، مقالات تحليلية متعمقة، ومكتبة نماذج وعقود استرشادية معتمدة.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#07101E] border border-slate-800">
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-[#C9A227] text-[#0A192F] shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>المقالات والتحليلات</span>
            </button>

            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'radar'
                  ? 'bg-[#C9A227] text-[#0A192F] shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>رادار التشريعات والقرارات</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-[#C9A227] text-[#0A192F] shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileDown className="w-4 h-4" />
              <span>النماذج والعقود المجانية</span>
            </button>
          </div>
        </div>

        {/* Alert Toast for Download */}
        {downloadSuccessMessage && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{downloadSuccessMessage}</span>
            </div>
            <button onClick={() => setDownloadSuccessMessage(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: Legal News & Analysis (Section 20) */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(articles || []).map((article) => (
              <article
                key={article.id}
                className="group rounded-2xl bg-gradient-to-b from-[#112240] to-[#0B1A2F] border border-[#C9A227]/20 hover:border-[#C9A227]/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#0A192F]/90 text-[#DFC377] border border-[#C9A227]/30 backdrop-blur-md">
                    {article.category === 'tax' || article.category === 'الضرائب'
                      ? 'الضرائب والفحص'
                      : article.category === 'corporate' || article.category === 'الشركات'
                      ? 'الشركات والاستثمار'
                      : 'القانون المدني والتجاري'}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                        {article.date || article.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-lg text-white mb-2.5 group-hover:text-[#DFC377] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt || article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#C9A227]" />
                      {article.author}
                    </span>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold text-[#DFC377] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>قراءة المقال</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* TAB 2: Legislation Radar (Section 21) */}
        {activeTab === 'radar' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white">رادار أركان التشريعي:</span>
                <span>رصد دوري للقرارات الوزارية والقوانين الصادرة في الجريدة الرسمية وتأثيرها على الأعمال.</span>
              </div>
              <span className="text-emerald-400 font-mono text-[11px]">محدث 2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(legislationRadar || []).map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#112240]/80 border border-[#C9A227]/25 hover:border-[#C9A227]/50 shadow-lg space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#0A192F] text-[#DFC377] text-xs font-bold border border-[#C9A227]/20">
                      {item.officialNumber || item.officialSource || item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{item.date || item.effectiveDate}</span>
                  </div>

                  <h3 className="font-heading font-black text-base text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-[#0A192F] border border-slate-800 space-y-1 text-xs">
                    <span className="font-bold text-[#DFC377] block">
                      التأثير العملي على الأفراد والشركات:
                    </span>
                    <p className="text-slate-300">
                      {item.impact || 'حماية المركز القانوني والمالي للمنشأة وتفادي أي غرامات أو التزامات غير محسوبة.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Free Resources & Downloadable Templates (Section 22) */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(freeResources || []).map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-[#112240]/80 border border-[#C9A227]/25 hover:border-[#C9A227]/50 shadow-lg flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#0A192F] text-[#DFC377] border border-slate-800 font-mono">
                      {res.format || res.fileFormat}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {res.downloadsCount || res.downloadCount || 120} تحميلة
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-base text-white mb-2 group-hover:text-[#DFC377] transition-colors">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{res.pages ? `${res.pages} صفحات` : (res.fileSize || 'وثيقة رسمية')}</span>
                  <button
                    onClick={() => handleDownloadResource(res)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#C9A227] hover:bg-[#DFC377] text-[#0A192F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل مجاني</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Article Full Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
            <div className="relative w-full max-w-3xl my-8 bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl overflow-hidden shadow-2xl text-right">
              <div className="relative h-64 w-full">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E38] via-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 right-4 left-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#C9A227] text-[#0A192F] inline-block mb-2">
                    تحليل قانوني ومالي
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800">
                  <span>الكاتب: {selectedArticle.author}</span>
                  <span>•</span>
                  <span>التاريخ: {selectedArticle.publishedAt}</span>
                  <span>•</span>
                  <span>وقت القراءة: {selectedArticle.readTime}</span>
                </div>

                <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </div>

                <div className="pt-6 border-t border-slate-800 p-4 rounded-2xl bg-[#0A192F] border border-[#C9A227]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">هل لديك استفسار حول هذا الموضوع؟</h4>
                    <p className="text-xs text-slate-400">تواصل مع فريق مستشاري أركان لدراسة ملفك بدقة.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      setIsBookingModalOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C9A227] text-[#0A192F] font-bold text-xs hover:bg-[#DFC377] transition-all cursor-pointer"
                  >
                    احجز استشارة متخصصة
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
