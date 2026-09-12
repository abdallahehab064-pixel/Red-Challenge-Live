import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  simulateSend24hEmailReminders,
  CloudFunctionExecutionSummary,
  EmailReminderResult,
} from '../services/cloudReminderFunction';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  AlertCircle,
  Terminal,
  RotateCw,
  ExternalLink,
  Code,
  Eye,
  X
} from 'lucide-react';

interface CloudEmailReminderSimulatorProps {
  onClose?: () => void;
}

export const CloudEmailReminderSimulator: React.FC<CloudEmailReminderSimulatorProps> = ({ onClose }) => {
  const { bookings } = useApp();
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<CloudFunctionExecutionSummary | null>(null);
  const [selectedResult, setSelectedResult] = useState<EmailReminderResult | null>(null);
  const [testEmailOverride, setTestEmailOverride] = useState('user.test@client-arkan.com');
  const [activePreviewTab, setActivePreviewTab] = useState<'html' | 'text' | 'logs'>('html');

  const handleTriggerCloudFunction = () => {
    setIsRunning(true);
    // Simulate slight Cloud Function latency (600ms)
    setTimeout(() => {
      const summary = simulateSend24hEmailReminders(bookings, new Date(), testEmailOverride);
      setExecutionResult(summary);
      if (summary.results.length > 0) {
        setSelectedResult(summary.results[0]);
      }
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#0A192F] border border-[#C9A227]/40 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#C9A227]" />
            </div>
            <h3 className="font-heading font-black text-lg sm:text-xl text-white">
              محاكي الوظيفة السحابية لتذكير البريد الإلكتروني (Cloud Function 24h)
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            فحص جدول الحجوزات آلياً وإرسال رسائل تذكير رسمية قبل موعد الجلسة الاستشارية بـ 24 ساعة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerCloudFunction}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-xs hover:brightness-110 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'جاري تشغيل الدالة...' : 'تشغيل محاكاة Cloud Function الآن'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Cloud Function Status Info Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-[#0A192F] border border-slate-800">
          <span className="text-slate-400 block mb-1">إجمالي الحجوزات المفحوصة:</span>
          <span className="text-base font-bold font-mono text-white">{bookings?.length || 0} حجز</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0A192F] border border-slate-800">
          <span className="text-slate-400 block mb-1">نوع المشغّل (Trigger):</span>
          <span className="text-xs font-mono text-[#DFC377] font-semibold">Cloud Scheduler (Every 1h)</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0A192F] border border-slate-800">
          <span className="text-slate-400 block mb-1">البريد التجريبي الافتراضي:</span>
          <input
            type="email"
            value={testEmailOverride}
            onChange={(e) => setTestEmailOverride(e.target.value)}
            className="w-full bg-[#07101E] border border-slate-700/80 rounded px-2 py-0.5 text-xs text-[#DFC377] font-mono focus:outline-none"
            dir="ltr"
          />
        </div>
      </div>

      {/* Execution Results */}
      {executionResult && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                اكتمل تنفيذ الدالة بنجاح (معرف التشغيل: <code className="font-mono text-[11px]">{executionResult.executionId}</code>)
              </span>
            </div>
            <span className="font-bold">
              تم إرسال {executionResult.emailsDispatched} رسالة بريد إلكتروني
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Email list */}
            <div className="lg:col-span-5 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 mb-2">قائمة التذكيرات المرسلة:</h4>
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {executionResult.results.map((res) => (
                  <div
                    key={res.bookingId}
                    onClick={() => setSelectedResult(res)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                      selectedResult?.bookingId === res.bookingId
                        ? 'bg-[#112240] border-[#C9A227] shadow-lg'
                        : 'bg-[#0A192F]/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{res.clientName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#07101E] border border-slate-700 text-[#DFC377] font-mono text-[10px]">
                        دور #{res.queueNumber}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] truncate mb-1">{res.serviceName}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{res.date} ({res.time})</span>
                      <span className="text-emerald-400 font-sans">تم الإرسال لـ {res.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Email Preview Panel */}
            <div className="lg:col-span-7 rounded-2xl bg-[#07101E] border border-slate-800 p-4 flex flex-col justify-between">
              {selectedResult ? (
                <div className="space-y-3">
                  {/* Email meta */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div>
                      <div className="text-[11px] text-slate-400">
                        إلى: <span className="text-white font-mono" dir="ltr">{selectedResult.emailPayload.to}</span>
                      </div>
                      <div className="text-xs text-[#DFC377] font-bold mt-0.5">
                        الموضوع: {selectedResult.emailPayload.subject}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-[#0A192F] p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setActivePreviewTab('html')}
                        className={`px-2 py-1 rounded text-[11px] ${
                          activePreviewTab === 'html' ? 'bg-[#C9A227] text-[#0A192F] font-bold' : 'text-slate-400'
                        }`}
                      >
                        معاينة HTML
                      </button>
                      <button
                        onClick={() => setActivePreviewTab('text')}
                        className={`px-2 py-1 rounded text-[11px] ${
                          activePreviewTab === 'text' ? 'bg-[#C9A227] text-[#0A192F] font-bold' : 'text-slate-400'
                        }`}
                      >
                        نص عادي
                      </button>
                      <button
                        onClick={() => setActivePreviewTab('logs')}
                        className={`px-2 py-1 rounded text-[11px] ${
                          activePreviewTab === 'logs' ? 'bg-[#C9A227] text-[#0A192F] font-bold' : 'text-slate-400'
                        }`}
                      >
                        سجل الدالة
                      </button>
                    </div>
                  </div>

                  {/* Body Preview */}
                  <div className="max-h-72 overflow-y-auto rounded-xl bg-white/5 p-2">
                    {activePreviewTab === 'html' && (
                      <div
                        className="prose prose-invert max-w-none text-xs"
                        dangerouslySetInnerHTML={{ __html: selectedResult.emailPayload.htmlBody }}
                      />
                    )}

                    {activePreviewTab === 'text' && (
                      <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed p-2" dir="rtl">
                        {selectedResult.emailPayload.textBody}
                      </pre>
                    )}

                    {activePreviewTab === 'logs' && (
                      <div className="p-3 bg-black/70 rounded-lg text-emerald-400 font-mono text-[11px] space-y-1" dir="ltr">
                        <p>[{selectedResult.simulatedSentAt}] INFO: Cloud Function "send24hEmailReminder" triggered.</p>
                        <p>[{selectedResult.simulatedSentAt}] INFO: Checking booking ID "{selectedResult.bookingId}" for client "{selectedResult.clientName}".</p>
                        <p>[{selectedResult.simulatedSentAt}] INFO: Time until consultation: ~24 hours.</p>
                        <p>[{selectedResult.simulatedSentAt}] SUCCESS: Email dispatched via Cloud SMTP to &lt;{selectedResult.email}&gt;.</p>
                        <p>[{selectedResult.simulatedSentAt}] STATUS: 200 OK - Message-ID: &lt;msg-{Date.now()}@mail.arkan-law.com&gt;</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">
                  اختر حجزا من القائمة لمعاينة البريد الإلكتروني المرسل.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Initial state trigger button if not run yet */}
      {!executionResult && (
        <div className="text-center py-8 bg-[#0A192F]/60 rounded-2xl border border-slate-800/80">
          <Clock className="w-10 h-10 text-[#C9A227] mx-auto mb-3 animate-pulse" />
          <h4 className="font-heading font-bold text-white text-base mb-1">
            جاهز لتشغيل محاكاة الدالة السحابية (Cloud Function)
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            ستقوم الدالة بمسح كافة مواعيد جدول الحجوزات وإعداد قوالب البريد الإلكتروني الرسمية بصيغتي HTML و Text
            وإرسال تذكيرات الموعد الدقيقة.
          </p>
          <button
            onClick={handleTriggerCloudFunction}
            disabled={isRunning}
            className="px-6 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#DFC377] text-[#0A192F] font-bold text-xs transition-all shadow-lg cursor-pointer"
          >
            {isRunning ? 'جاري الفحص...' : 'بدء فحص الحجوزات وإرسال التذكيرات الآن'}
          </button>
        </div>
      )}
    </div>
  );
};
