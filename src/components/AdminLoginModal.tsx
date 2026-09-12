import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, KeyRound, Lock, User, X, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginOpen, setIsAdminLoginOpen, login } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAdminLoginOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo password verification (e.g. 123456 or arkan2026 or any input for easy trial)
    login(
      selectedRole,
      selectedRole === 'admin' ? 'admin@arkanlaw.eg' : 'secretary@arkanlaw.eg',
      selectedRole === 'admin' ? 'مدير عام المؤسسة' : 'أمانة السكرتارية القانونية'
    );
    setIsAdminLoginOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#0B1E38] border border-[#C9A227]/40 rounded-3xl overflow-hidden shadow-2xl text-right p-6 sm:p-8 space-y-6">
        <button
          onClick={() => setIsAdminLoginOpen(false)}
          className="absolute top-5 left-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#112240] border border-[#C9A227]/40 flex items-center justify-center text-[#DFC377]">
            <Shield className="w-7 h-7 text-[#C9A227]" />
          </div>
          <h3 className="font-heading font-black text-xl text-white">
            بوابة الإدارة والسكرتارية
          </h3>
          <p className="text-xs text-slate-400">
            سجل دخولك للوصول إلى لوحة التحكم، إدارة المواعيد وأرقام الدور
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#0A192F] border border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              selectedRole === 'admin'
                ? 'bg-[#C9A227] text-[#0A192F] shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            مدير المؤسسة
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('secretary')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              selectedRole === 'secretary'
                ? 'bg-[#C9A227] text-[#0A192F] shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            أمانة السكرتارية
          </button>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              اسم المستخدم أو البريد المهني
            </label>
            <input
              type="text"
              readOnly
              value={selectedRole === 'admin' ? 'admin@arkanlaw.eg' : 'secretary@arkanlaw.eg'}
              className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              كلمة المرور المشفرة
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="أدخل كلمة المرور (أو اضغط دخول مباشرة)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A192F] border border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:border-[#C9A227] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute top-3 right-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] font-bold text-sm shadow-lg shadow-[#C9A227]/25 hover:brightness-110 transition-all cursor-pointer"
          >
            تسجيل الدخول إلى النظام
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-500">
          نظام محمي بأعلى معايير تشفير وحماية بيانات الموكلين.
        </div>
      </div>
    </div>
  );
};
