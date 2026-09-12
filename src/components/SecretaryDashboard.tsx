import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking, BookingStatus } from '../types';
import { CloudEmailReminderSimulator } from './CloudEmailReminderSimulator';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Search,
  CheckCircle2,
  AlertCircle,
  BellRing,
  Printer,
  MessageSquare,
  Plus,
  Tv,
  ArrowLeft,
  Filter,
  FileText,
  Mail
} from 'lucide-react';

export const SecretaryDashboard: React.FC = () => {
  const {
    bookings,
    updateBookingStatus,
    rescheduleBooking,
    callNextQueueItem,
    currentServingQueue,
    nextServingQueue,
    setCurrentBookingForReceipt,
    setIsReceiptModalOpen,
    setReminderBookingTarget,
    setIsReminderPreviewOpen,
    setIsBookingModalOpen,
    setActiveView,
    logout,
  } = useApp();

  const [filterDate, setFilterDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [oneClickAlertMessage, setOneClickAlertMessage] = useState<string | null>(null);

  // One-click direct notify function requested by user
  const handleOneClickNotify = (b: Booking) => {
    const alertText = `تم إرسال تنبيه فوري بنجاح للعميل "${b.clientName}" على الهاتف (${b.phone}) بموعد استشارته [${b.date} الساعة ${b.time}] ورقم دوره (${b.queueNumber}).`;
    setOneClickAlertMessage(alertText);
    setTimeout(() => {
      setOneClickAlertMessage(null);
    }, 5000);
  };

  // Reschedule dialog state
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [showCloudFunctionSimulator, setShowCloudFunctionSimulator] = useState(false);

  const filteredBookings = (bookings || []).filter((b) => {
    const matchesDate = filterDate === '' || b.date === filterDate;
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch =
      (b.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.phone || '').includes(searchTerm) ||
      (b.queueNumber || '').includes(searchTerm) ||
      (b.bookingNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'waiting':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-950/70 text-amber-300 border border-amber-800">في الانتظار</span>;
      case 'arrived':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-950/70 text-blue-300 border border-blue-800">تم الحضور</span>;
      case 'in_session':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800 animate-pulse">داخل الجلسة</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">تم الانتهاء</span>;
      case 'rescheduled':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-950/70 text-purple-300 border border-purple-800">تم التأجيل</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-950/70 text-red-300 border border-red-800">ملغي</span>;
    }
  };

  const handleApplyReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleTarget || !newDate || !newTime) return;
    rescheduleBooking(rescheduleTarget.id, newDate, newTime);
    setRescheduleTarget(null);
  };

  return (
    <div className="min-h-screen bg-[#07101E] text-[#F5F5F0] p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#0B1E38] border border-[#C9A227]/30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A227] text-[#0A192F] font-bold flex items-center justify-center text-xl shadow">
            أ
          </div>
          <div>
            <span className="text-xs text-[#DFC377] font-bold block">منظومة الاستقبال والسكرتارية</span>
            <h1 className="font-heading font-black text-xl sm:text-2xl text-white">
              لوحة إدارة الحجوزات وأرقام الدور
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowCloudFunctionSimulator(!showCloudFunctionSimulator)}
            className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              showCloudFunctionSimulator
                ? 'bg-[#C9A227] text-[#0A192F] border-[#C9A227]'
                : 'bg-[#112240] hover:bg-[#1B335A] text-[#DFC377] border-[#C9A227]/40'
            }`}
            title="تشغيل وفحص محاكي Cloud Function لإرسال تذكيرات البريد الإلكتروني قبل 24 ساعة"
          >
            <Mail className="w-4 h-4" />
            <span>تذكيرات الإيميل (Cloud Function)</span>
          </button>

          <button
            onClick={() => setActiveView('queue-display')}
            className="px-4 py-2 rounded-xl bg-[#112240] hover:bg-[#1B335A] text-[#DFC377] border border-[#C9A227]/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Tv className="w-4 h-4" />
            <span>شاشة صالة الانتظار</span>
          </button>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل عميل وافد (Walk-in)</span>
          </button>

          <button
            onClick={() => setActiveView('home')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
          >
            الموقع
          </button>

          <button
            onClick={logout}
            className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs"
          >
            خروج
          </button>
        </div>
      </div>

      {/* Live Queue Control Widget */}
      {showCloudFunctionSimulator && (
        <CloudEmailReminderSimulator onClose={() => setShowCloudFunctionSimulator(false)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#112240] border border-[#C9A227]/40 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">الدور الجاري الآن:</span>
            <div className="text-4xl font-black font-mono text-[#DFC377]">
              {currentServingQueue}
            </div>
          </div>
          <div className="text-left text-xs text-slate-400">
            <span>القاعة الاستشارية الرئيسية</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#112240] border border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">الدور التالي للاستعداد:</span>
            <div className="text-4xl font-black font-mono text-white">
              {nextServingQueue}
            </div>
          </div>
          <div className="text-left text-xs text-slate-400">
            <span>صالة الانتظار</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1B335A] to-[#112240] border border-[#C9A227]/40 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-200 font-bold block mb-1">إشعار صوتي ونداء:</span>
            <span className="text-xs text-slate-400">تحديث شاشة الانتظار وإدخال الموكل</span>
          </div>
          <button
            onClick={callNextQueueItem}
            className="px-4 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#DFC377] text-[#0A192F] font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <BellRing className="w-4 h-4" />
            <span>نداء الدور التالي</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B1E38] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">تصفية بالتاريخ:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-[#0A192F] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-[#C9A227] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">الحالة:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#0A192F] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-[#C9A227] focus:outline-none"
            >
              <option value="all">كافة الحالات</option>
              <option value="waiting">في الانتظار</option>
              <option value="arrived">تم الحضور</option>
              <option value="in_session">داخل الجلسة</option>
              <option value="completed">تم الانتهاء</option>
              <option value="rescheduled">مؤجل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>

          <div className="self-end">
            <button
              onClick={() => {
                setFilterDate('');
                setFilterStatus('all');
                setSearchTerm('');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs"
            >
              عرض الكل
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="بحث بالاسم، الهاتف، أو رقم الدور..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-4 py-2 pr-10 text-xs text-white focus:border-[#C9A227] focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute top-2.5 right-3.5" />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-3xl bg-[#0B1E38] border border-[#C9A227]/25 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#07101E] border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-4">رقم الدور</th>
                <th className="p-4">اسم العميل</th>
                <th className="p-4">الهاتف</th>
                <th className="p-4">الخدمة المطلوبة</th>
                <th className="p-4">التاريخ والوقت</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">إجراءات السكرتارية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#112240]/40 transition-colors">
                  <td className="p-4">
                    <span className="font-black font-mono text-sm sm:text-base text-[#DFC377]">
                      {b.queueNumber}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono" dir="ltr">
                      {b.bookingNumber}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-white">
                    {b.clientName}
                    {b.notes && (
                      <span className="block text-[10px] text-slate-400 font-normal truncate max-w-xs">
                        {b.notes}
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-mono text-slate-300" dir="ltr">
                    {b.phone}
                  </td>

                  <td className="p-4 text-slate-300">
                    <span className="block text-slate-200 font-medium">{b.serviceName}</span>
                    <span className="text-[11px] text-[#DFC377]">{b.consultantName || '-'}</span>
                  </td>

                  <td className="p-4 text-slate-300">
                    <span className="block font-medium">{b.date}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{b.time}</span>
                  </td>

                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                      className="bg-[#0A192F] border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                    >
                      <option value="waiting">في الانتظار</option>
                      <option value="arrived">تم الحضور</option>
                      <option value="in_session">داخل الجلسة</option>
                      <option value="completed">تم الانتهاء</option>
                      <option value="rescheduled">مؤجل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Print PDF receipt */}
                      <button
                        title="عرض وطباعة الإيصال الرسمي"
                        onClick={() => {
                          setCurrentBookingForReceipt(b);
                          setIsReceiptModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1B335A] text-[#DFC377] border border-slate-700 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      {/* Reminder send */}
                      <button
                        title="إرسال تذكير واتساب"
                        onClick={() => {
                          setReminderBookingTarget(b);
                          setIsReminderPreviewOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      {/* Reschedule button */}
                      <button
                        title="تأجيل / تغيير الموعد"
                        onClick={() => {
                          setRescheduleTarget(b);
                          setNewDate(b.date);
                          setNewTime(b.time);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] px-2 font-semibold"
                      >
                        تأجيل
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            لا توجد حجوزات مسجلة تطابق التصفية الحالية.
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <form
            onSubmit={handleApplyReschedule}
            className="w-full max-w-md bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl p-6 space-y-4 text-right"
          >
            <h3 className="font-heading font-black text-lg text-white">
              تأجيل موعد: {rescheduleTarget.clientName}
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">التاريخ الجديد:</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">التوقيت الجديد:</label>
              <input
                type="text"
                required
                placeholder="مثال: 05:00 م"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRescheduleTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#C9A227] text-[#0A192F] font-bold text-xs hover:bg-[#DFC377]"
              >
                حفظ التغيير وإصدار رقم جديد
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
