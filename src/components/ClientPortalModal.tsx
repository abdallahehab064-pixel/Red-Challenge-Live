import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  ArrowLeft,
  Scale,
  Briefcase
} from 'lucide-react';

export const ClientPortalModal: React.FC = () => {
  const {
    isClientPortalOpen,
    setIsClientPortalOpen,
    currentUser,
    login,
    logout,
    cases,
    bookings,
    addCaseUpdate,
  } = useApp();

  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(cases?.[0]?.id || null);

  // New Document upload state for the case
  const [newDocTitle, setNewDocTitle] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isClientPortalOpen) return null;

  // Client cases filtered by logged in user phone or matching
  const clientCases = cases || [];
  const activeSelectedCase = clientCases.find((c) => c.id === selectedCaseId) || clientCases[0];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim()) {
      setLoginError('يرجى إدخال رقم هاتفك أو رقم ملف القضية.');
      return;
    }

    // Match client or mock login
    login('client', loginInput.trim(), 'الموكل الكريم');
    setLoginError('');
  };

  const handleAddClientDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !activeSelectedCase) return;

    addCaseUpdate(
      activeSelectedCase.id,
      `إيداع مستند من الموكل: ${newDocTitle.trim()}`,
      'تم إيداع مستند جديد وفحصه بمعرفة المستشار المختص بالقضية.',
      'السكرتارية القانونية'
    );

    setNewDocTitle('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-8 bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl overflow-hidden shadow-2xl text-right">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#07101E] to-[#0D2240] border-b border-[#C9A227]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C9A227]/20 flex items-center justify-center text-[#DFC377]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-black text-lg sm:text-xl text-white">
                بوابة الموكلين الإلكترونية
              </h2>
              <span className="text-xs text-slate-400">
                متابعة القضايا، الجلسات، الأحكام والملفات بسرية تامة
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsClientPortalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!currentUser || currentUser.role !== 'client' ? (
          /* LOGIN VIEW */
          <div className="p-8 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#112240] border border-[#C9A227]/30 flex items-center justify-center text-[#DFC377]">
                <Shield className="w-8 h-8 text-[#C9A227]" />
              </div>
              <h3 className="font-heading font-black text-xl text-white">
                تسجيل الدخول لبوابة الموكل
              </h3>
              <p className="text-xs text-slate-400">
                أدخل رقم الهاتف المسجل بالحجز أو رقم ملف القضية للوصول الآمن لبياناتك.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رقم الهاتف أو رقم القضية (مثال: 01141754963 أو ARK-2026-00452)
                </label>
                <input
                  type="text"
                  required
                  placeholder="01141754963"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C9A227] focus:outline-none font-mono"
                  dir="ltr"
                />
                {loginError && <p className="text-xs text-red-400 mt-1">{loginError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-sm shadow-lg shadow-[#C9A227]/25 hover:brightness-110 transition-all cursor-pointer"
              >
                الدخول الفوري لملف الموكل
              </button>
            </form>

            <div className="p-3.5 rounded-xl bg-[#0A192F] border border-slate-800 text-[11px] text-slate-400 text-center">
              للعملاء الجدد: يمكنك حجز استشارتك أولاً لتفعيل حسابك وتوليد رقم ملفك الإلكتروني تلقائياً.
            </div>
          </div>
        ) : (
          /* LOGGED IN CLIENT DASHBOARD */
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* User welcome bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-[#112240] border border-[#C9A227]/30 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A227] text-[#0A192F] font-bold flex items-center justify-center">
                  أ
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                    أهلاً بك، {currentUser.name}
                  </h3>
                  <p className="text-xs text-[#DFC377] font-mono" dir="ltr">
                    الهاتف: {currentUser.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={logout}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-300 text-xs font-semibold"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>

            {/* Case Selection Tabs */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">الملفات والقضايا المقيدة:</span>
              <div className="flex flex-wrap gap-2">
                {(clientCases || []).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCaseId === c.id
                        ? 'bg-[#C9A227] text-[#0A192F] shadow'
                        : 'bg-[#0A192F] text-slate-300 border border-slate-800'
                    }`}
                  >
                    {c.caseNumber} - {c.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Case Details Card */}
            {activeSelectedCase && (
              <div className="p-6 rounded-2xl bg-[#0A192F] border border-[#C9A227]/30 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-[#DFC377] font-mono block">
                      رقم القضية: {activeSelectedCase.caseNumber}
                    </span>
                    <h4 className="font-heading font-black text-lg text-white">
                      {activeSelectedCase.title}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                    {activeSelectedCase.status === 'قيد الدراسة' ? 'قيد الدراسة والبحث' : activeSelectedCase.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#112240] border border-slate-800">
                    <span className="text-slate-400 block mb-1">المحكمة والدائرة</span>
                    <span className="font-bold text-white">{activeSelectedCase.court || 'محكمة استئناف القاهرة'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-slate-800">
                    <span className="text-slate-400 block mb-1">الجلسة القادمة</span>
                    <span className="font-bold text-[#DFC377]">
                      {activeSelectedCase.nextSessionDate || 'يتم تحديدها قريباً'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-slate-800">
                    <span className="text-slate-400 block mb-1">المستشار المشرف</span>
                    <span className="font-bold text-white">أ.د. أحمد الهواري</span>
                  </div>
                </div>

                {/* Case Updates Timeline */}
                <div>
                  <h5 className="text-xs font-bold text-[#DFC377] uppercase tracking-wider mb-3">
                    سجل الجلسات وتطورات القضية:
                  </h5>
                  <div className="space-y-3">
                    {(activeSelectedCase.updates || []).map((up) => (
                      <div
                        key={up.id}
                        className="p-3.5 rounded-xl bg-[#112240]/60 border border-slate-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="font-bold text-white text-sm">{up.title}</span>
                          <span className="font-mono text-[11px]">{up.date}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{up.description}</p>
                        <span className="text-[10px] text-slate-500 block">
                          المحرر: {up.lawyerName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload Doc To Case */}
                <form
                  onSubmit={handleAddClientDoc}
                  className="p-4 rounded-xl bg-[#112240] border border-slate-800 flex flex-col sm:flex-row items-center gap-3"
                >
                  <input
                    type="text"
                    required
                    placeholder="إرفاق مستند جديد للقضية (مثال: إيصال سداد، عقد ملحق...)"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    className="flex-1 bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#C9A227] text-[#0A192F] font-bold text-xs hover:bg-[#DFC377] transition-colors shrink-0"
                  >
                    رفع للمستشار
                  </button>
                </form>
                {uploadSuccess && (
                  <p className="text-xs text-emerald-400">
                    ✓ تم إيداع المستند وإشعار سكرتارية المستشار بنجاح.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
