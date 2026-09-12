import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CloudEmailReminderSimulator } from './CloudEmailReminderSimulator';
import {
  BarChart3,
  Users,
  Calendar,
  FileSpreadsheet,
  Settings,
  Shield,
  Download,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  Tv,
  ArrowLeft,
  FileText,
  Mail
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    cases,
    settings,
    updateSettings,
    exportBookingsToCSV,
    exportClientsToCSV,
    setActiveView,
    logout,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'clients' | 'cloud-reminders' | 'settings'>('analytics');

  // Settings form state
  const [formSettings, setFormSettings] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Compute analytics
  const safeBookings = bookings || [];
  const safeCases = cases || [];
  const totalBookings = safeBookings.length;
  const completedBookings = safeBookings.filter((b) => b.status === 'completed').length;
  const inSessionBookings = safeBookings.filter((b) => b.status === 'in_session').length;
  const waitingBookings = safeBookings.filter((b) => b.status === 'waiting' || b.status === 'arrived').length;
  const activeCasesCount = safeCases.filter((c) => c.status === 'متداولة بالجلسات' || c.status === 'قيد الدراسة').length;

  // Unique clients list
  const clientMap = new Map<string, { name: string; phone: string; email?: string; count: number }>();
  safeBookings.forEach((b) => {
    const existing = clientMap.get(b.phone);
    if (existing) {
      existing.count += 1;
    } else {
      clientMap.set(b.phone, {
        name: b.clientName,
        phone: b.phone,
        email: b.email,
        count: 1,
      });
    }
  });
  const clientsList = Array.from(clientMap.values());

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07101E] text-[#F5F5F0] p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#0B1E38] border border-[#C9A227]/30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A227] text-[#0A192F] font-bold flex items-center justify-center text-xl shadow">
            أ
          </div>
          <div>
            <span className="text-xs text-[#DFC377] font-bold block">لوحة تحكم الإدارة العليا</span>
            <h1 className="font-heading font-black text-xl sm:text-2xl text-white">
              مؤسسة أركان • الإحصائيات والتحكم
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportBookingsToCSV}
            className="px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#1B335A] text-[#DFC377] border border-[#C9A227]/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>تصدير الحجوزات (CSV)</span>
          </button>

          <button
            onClick={() => setActiveView('secretary-dashboard')}
            className="px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#1B335A] text-slate-200 text-xs font-bold border border-slate-700"
          >
            لوحة السكرتارية
          </button>

          <button
            onClick={() => setActiveView('home')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
          >
            الموقع
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl bg-red-950/40 text-red-300 text-xs"
          >
            خروج
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#C9A227] text-[#0A192F]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>المؤشرات والتقارير</span>
        </button>

        <button
          onClick={() => setActiveTab('clients')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'clients'
              ? 'bg-[#C9A227] text-[#0A192F]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>سجل العملاء ({clientsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cloud-reminders')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'cloud-reminders'
              ? 'bg-[#C9A227] text-[#0A192F]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>محاكي تذكير Cloud Function (24h)</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#C9A227] text-[#0A192F]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>إعدادات المؤسسة والتواصل</span>
        </button>
      </div>

      {/* TAB 1: Analytics & Reports */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0B1E38] border border-[#C9A227]/30">
              <span className="text-xs text-slate-400 block mb-1">إجمالي الحجوزات المسجلة</span>
              <div className="text-3xl font-black font-mono text-white">{totalBookings}</div>
              <span className="text-[11px] text-[#C9A227] mt-1 block">شامل كافة التخصصات</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1E38] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">جلسات تم إنجازها</span>
              <div className="text-3xl font-black font-mono text-emerald-400">{completedBookings}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">استشارات منتهية بالكامل</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1E38] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">في الانتظار حالياً</span>
              <div className="text-3xl font-black font-mono text-amber-300">{waitingBookings}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">بمقر المؤسسة وصالة الاستقبال</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1E38] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">ملفات القضايا المتداولة</span>
              <div className="text-3xl font-black font-mono text-[#DFC377]">{activeCasesCount}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">جلسات أمام المحاكم</span>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="p-6 rounded-3xl bg-[#0B1E38] border border-[#C9A227]/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-black text-base text-white">
                أحدث طلبات الحجز والاستشارات المسجلة بالمنظومة
              </h3>
              <button
                onClick={exportBookingsToCSV}
                className="text-xs text-[#DFC377] hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير تقرير كامل (Excel)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="pb-3">رقم الحجز</th>
                    <th className="pb-3">رقم الدور</th>
                    <th className="pb-3">العميل</th>
                    <th className="pb-3">الخدمة</th>
                    <th className="pb-3">الموعد</th>
                    <th className="pb-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {bookings.slice(0, 8).map((b) => (
                    <tr key={b.id} className="hover:bg-[#112240]/40">
                      <td className="py-3 font-mono text-slate-400" dir="ltr">{b.bookingNumber}</td>
                      <td className="py-3 font-mono font-bold text-[#DFC377] text-sm">{b.queueNumber}</td>
                      <td className="py-3 font-bold text-white">{b.clientName}</td>
                      <td className="py-3 text-slate-300">{b.serviceName}</td>
                      <td className="py-3 text-slate-300">{b.date} ({b.time})</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Clients CRM */}
      {activeTab === 'clients' && (
        <div className="p-6 rounded-3xl bg-[#0B1E38] border border-[#C9A227]/25 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-heading font-black text-base text-white">قاعدة بيانات الموكلين</h3>
              <p className="text-xs text-slate-400">سجل العملاء المتواصلين والحاجزين عبر المنظومة</p>
            </div>
            <button
              onClick={exportClientsToCSV}
              className="px-4 py-2 rounded-xl bg-[#C9A227] text-[#0A192F] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير قائمة العملاء (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3">اسم الموكل / العميل</th>
                  <th className="pb-3">رقم الهاتف</th>
                  <th className="pb-3">البريد الإلكتروني</th>
                  <th className="pb-3">عدد الحجوزات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {clientsList.map((cli, idx) => (
                  <tr key={idx} className="hover:bg-[#112240]/40">
                    <td className="py-3 font-bold text-white">{cli.name}</td>
                    <td className="py-3 font-mono text-slate-300" dir="ltr">{cli.phone}</td>
                    <td className="py-3 text-slate-400">{cli.email || '-'}</td>
                    <td className="py-3 font-mono text-[#DFC377] font-bold">{cli.count} موعد</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: System & Contact Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-[#0B1E38] border border-[#C9A227]/25 space-y-6 max-w-3xl">
          <div>
            <h3 className="font-heading font-black text-lg text-white mb-1">
              إعدادات المؤسسة وبيانات الاتصال
            </h3>
            <p className="text-xs text-slate-400">
              يمكنك تحديث أرقام الهواتف، العنوان، مواعيد العمل، والإخلاء القانوني ليتم تطبيقها فوراً على الموقع والإيصالات.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تم حفظ الإعدادات بنجاح في المنظومة.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف الأول:</label>
              <input
                type="text"
                value={formSettings.phone1}
                onChange={(e) => setFormSettings({ ...formSettings, phone1: e.target.value })}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف الثاني:</label>
              <input
                type="text"
                value={formSettings.phone2}
                onChange={(e) => setFormSettings({ ...formSettings, phone2: e.target.value })}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                dir="ltr"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">عنوان المقر الرسمي:</label>
              <input
                type="text"
                value={formSettings.address}
                onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">مواعيد العمل الرسمية:</label>
              <input
                type="text"
                value={formSettings.workHours}
                onChange={(e) => setFormSettings({ ...formSettings, workHours: e.target.value })}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">نص التنبيه والإخلاء القانوني العام:</label>
              <textarea
                rows={3}
                value={formSettings.disclaimerText}
                onChange={(e) => setFormSettings({ ...formSettings, disclaimerText: e.target.value })}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl p-3 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-xs flex items-center gap-2 shadow cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: Cloud Function 24h Email Reminder Simulator */}
      {activeTab === 'cloud-reminders' && (
        <CloudEmailReminderSimulator />
      )}
    </div>
  );
};
