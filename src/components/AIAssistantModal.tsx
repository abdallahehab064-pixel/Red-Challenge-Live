import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArkanLogo } from './ArkanLogo';
import { generateArkanWordDocument } from '../utils/wordContractGenerator';
import { Send, User, Sparkles, X, Calendar, AlertTriangle, FileDown, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionCta?: boolean;
  contractDownload?: {
    title: string;
    category: string;
  };
}

export const AIAssistantModal: React.FC = () => {
  const { isAIAssistantOpen, setIsAIAssistantOpen, setIsBookingModalOpen, settings } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: `أهلاً بك في المساعد الذكي لمؤسسة أركان للمحاماة والاستشارات القانونية والمحاسبية والضريبية. يسعدني إرشادك بشأن الخدمات، المستندات المطلوبة، تجهيز وتنزيل مسودات العقود بصيغة Word مع العلامة المائية الرسمية، أو حجز موعد فوري بمقرنا في الهرم بالجيزة. كيف يمكنني مساعدتك اليوم؟`,
      timestamp: 'الآن',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'طباعة وتنزيل عقد إيجار Word جاهز',
    'تحميل مسودة عقد شراكة وتأسيس شركة',
    'ما هي المستندات المطلوبة لتأسيس شركة؟',
    'كيف يعمل نظام حجز الاستشارات وأرقام الدور؟',
    'ما هي مواعيد العمل وعنوان المقر؟',
  ];

  useEffect(() => {
    if (isAIAssistantOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAIAssistantOpen]);

  if (!isAIAssistantOpen) return null;

  const handleDownloadWordContract = (title: string, category: string) => {
    generateArkanWordDocument({
      contractTitle: title,
      category: category,
      isDraft: true,
    });
    setDownloadSuccess(`تم تنزيل "${title}" بصيغة Word جاهزاً للإضافة مع العلامة المائية لمؤسسة أركان!`);
    setTimeout(() => setDownloadSuccess(null), 5000);
  };

  const handleSend = (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Context-rich automated responses
    setTimeout(() => {
      let botResponse = '';
      let showBookingCta = false;
      let contractDownload: { title: string; category: string } | undefined = undefined;
      const lower = userText.toLowerCase();

      if (lower.includes('عقد إيجار') || lower.includes('ايجار')) {
        botResponse = `تم إعداد مسودة "عقد إيجار شقة سكنية / مقر إداري" متوافقة مع القانون المدني المصري رقم 4 لسنة 1996. تم تضمين العلامة المائية الرسمية لمؤسسة أركان وسياق النسخة التجريبية المعتمدة، وهو جاهز فوراً للتنزيل بصيغة Word وإضافة بيانات المستأجر والمؤجر.`;
        contractDownload = {
          title: 'عقد إيجار خاضع لأحكام القانون المدني',
          category: 'عقود إيجار وأملاك عقارية',
        };
        showBookingCta = true;
      } else if (lower.includes('عقد شراكة') || lower.includes('شراكة') || (lower.includes('عقد') && lower.includes('شركة'))) {
        botResponse = `تم إعداد مسودة "عقد شراكة وتوزيع حصص تجارية" وفقاً لأحكام القانون التجاري وقانون الشركات المصري. يتضمن العقد ديباجة مؤسسة أركان والووترمارك، ومحدد فيه بنود رأس المال والإدارة والشرط الجزائي، وجاهز للتنزيل بصيغة Word.`;
        contractDownload = {
          title: 'عقد شراكة وتأسيس منشأة تجارية وتوزيع حصص',
          category: 'عقود تجارية وشركات',
        };
        showBookingCta = true;
      } else if (lower.includes('عقد') || lower.includes('طباعة') || lower.includes('ورد') || lower.includes('word')) {
        botResponse = `يسعدنا تزويدك بنماذج العقود الرسمية بصيغة Word قابلة للتعديل والإضافة المباشرة، متضمنة العلامة المائية المعتمدة لمؤسسة أركان وتنويه النسخة التجريبية المعدة بواسطة المكتب. يمكنك النقر على الزر أدناه لتنزيل مسودة العقد فوراً:`;
        contractDownload = {
          title: 'عقد اتفاق وتقديم خدمات استشارية متخصصة',
          category: 'عقود عامة واستشارات',
        };
        showBookingCta = true;
      } else if (lower.includes('تأسيس') || lower.includes('شركة') || lower.includes('شركات')) {
        botResponse = `لتأسيس الشركات (فردية، ذات مسؤولية محدودة، أو مساهمة)، تتطلب الإجراءات الأولية: صورة بطاقات الرقم القومي للشركاء، التوكيل الرسمي، عقد الإيجار مثبت التاريخ ومطابق لاشتراطات السجل التجاري، واسم مقترح للمنشأة. يتولى فريق أركان كافة الخطوات من استخراج السجل والبطاقة الضريبية حتى إشهار العقد.`;
        showBookingCta = true;
      } else if (lower.includes('دور') || lower.includes('حجز') || lower.includes('موعد') || lower.includes('نظام')) {
        botResponse = `نظام الحجز في أركان مؤتمت بالكامل: عند حجز موعدك من الموقع، يصدر لك النظام رقم دور تسلسلي معتمد وإيصال PDF رسمي وفاتورة فورية تُرسل لبريدك الإلكتروني. فور حضورك للمقر، يتم توجيهك لشاشة العرض واستدعاء دورك تلقائياً.`;
        showBookingCta = true;
      } else if (lower.includes('عنوان') || lower.includes('مواعيد') || lower.includes('مقر') || lower.includes('هاتف') || lower.includes('اتصال')) {
        botResponse = `مقر المؤسسة: ${settings.address}.\nأرقام التواصل المباشرة: ${settings.phone1} / ${settings.phone2}.\nمواعيد العمل الرسمية: السبت إلى الخميس من 10:00 صباحاً حتى 09:00 مساءً.`;
      } else if (lower.includes('ضريب') || lower.includes('ضرائب') || lower.includes('فحص') || lower.includes('جزافي')) {
        botResponse = `في حالة التقديرات الجزافية أو نماذج 19 ضرائب، يجب الطعن القانوني في المواعيد المقررة (خلال 30 يوماً). يقوم خبراؤنا المحاسبيون بفحص الدفاتر وإعداد مذكرة دفاع قانونية وحضور لجان الطعن الضريبي لتخفيض المطالبات إلى قيمتها الفعلية العادلة.`;
        showBookingCta = true;
      } else if (lower.includes('أتعاب') || lower.includes('سعر') || lower.includes('تكلفة')) {
        botResponse = `تعتمد أتعاب القضايا والاستشارات على طبيعة النزاع أو الإجراء المطلوب، ونحن نعتمد مبدأ الشفافية الكاملة بدون أي تكاليف خفية، مع إمكانية إعداد عروض أسعار وفواتير معتمدة لشركات باقات الاستشارات. يمكنك حجز استشارة مبدئية لتقييم الموقف.`;
        showBookingCta = true;
      } else {
        botResponse = `شكراً لتواصلك مع مساعد أركان. نقوم بدراسة استفسارك بعناية. يمكنك تنزيل مسودات العقود بصيغة Word، أو حجز موعد استشارة فورية بمقرنا في الهرم لمناقشة أوراقك مع المستشار المختص.`;
        showBookingCta = true;
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        actionCta: showBookingCta,
        contractDownload,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[640px] bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-right">
        {/* Header with Official Arkan Logo Emblem as requested */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#07101E] via-[#0D2240] to-[#0A192F] border-b border-[#C9A227]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#C9A227]/10 border border-[#C9A227]/40 flex items-center justify-center p-1 shadow-inner">
              <ArkanLogo variant="emblem-only" size={38} showText={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-white text-base">
                  مساعد أركان الذكي
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A227]/20 text-[#DFC377] border border-[#C9A227]/30 font-bold">
                  اللوجو المعتمد
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                إجابات قانونية فورية + صياغة وتنزيل عقود Word مع العلامة المائية
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download notification banner */}
        {downloadSuccess && (
          <div className="bg-emerald-900/90 border-b border-emerald-500 text-emerald-100 text-xs px-4 py-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Quick questions pills */}
        <div className="p-3 bg-[#0A192F] border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-[#C9A227] shrink-0">روابط سريعة:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-[#112240] hover:bg-[#1B335A] text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[11px] cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#0A192F]/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#C9A227] text-[#0A192F]'
                    : 'bg-[#112240] text-[#DFC377] border border-[#C9A227]/30 p-1'
                }`}
              >
                {m.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <ArkanLogo variant="emblem-only" size={28} showText={false} />
                )}
              </div>

              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#C9A227] text-[#0A192F] font-medium rounded-tr-none'
                    : 'bg-[#112240] text-slate-200 border border-slate-800 rounded-tl-none shadow-lg'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* Contract Download Trigger in Word Format (User explicit request) */}
                {m.contractDownload && (
                  <div className="mt-3.5 p-3 rounded-xl bg-[#07101E] border border-[#C9A227]/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#DFC377] flex items-center gap-1.5">
                        <FileDown className="w-4 h-4 text-[#C9A227]" />
                        {m.contractDownload.title}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                        صيغة Word (.doc)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      يتضمن علامة مائية: "نسخة تجريبية معتمدة - مؤسسة أركان للمحاماة"، وجاهز للإضافة المباشرة لبيانات العميل والشركاء.
                    </p>
                    <button
                      onClick={() =>
                        handleDownloadWordContract(
                          m.contractDownload!.title,
                          m.contractDownload!.category
                        )
                      }
                      className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#C9A227] to-[#A37E1C] hover:brightness-110 text-[#0A192F] font-bold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer transition-all"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>تنزيل العقد فوراً بصيغة Word (.doc)</span>
                    </button>
                  </div>
                )}

                {m.actionCta && (
                  <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-end">
                    <button
                      onClick={() => {
                        setIsAIAssistantOpen(false);
                        setIsBookingModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#C9A227] text-[#0A192F] font-bold text-xs hover:bg-[#DFC377] transition-all flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>حجز موعد استشارة مع مستشار متخصص</span>
                    </button>
                  </div>
                )}

                <span
                  className={`block text-[10px] mt-1.5 ${
                    m.sender === 'user' ? 'text-[#0A192F]/70' : 'text-slate-500'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ArkanLogo variant="emblem-only" size={20} showText={false} />
              <span>جاري صياغة الإجابة والمسودة القانونية...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Legal Disclaimer Box */}
        <div className="px-4 py-2 bg-[#07101E] border-t border-slate-800 text-[10px] text-amber-300/80 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span>تنبيه: مسودات العقود استرشادية وتجريبية وتحتوي على ووترمارك مؤسسة أركان، ويُنصح باعتمادها نهائياً مع مستشارينا.</span>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#07101E] border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="اكتب استفسارك أو اطلب عقدك (مثال: أريد عقد إيجار Word، تأسيس شركة...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#112240] border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-[#C9A227] focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#C9A227] hover:bg-[#DFC377] text-[#0A192F] transition-all cursor-pointer shadow"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};

