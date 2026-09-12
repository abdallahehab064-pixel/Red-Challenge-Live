import React, { useState, useEffect } from 'react';
import { ArkanLogo } from './ArkanLogo';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  User,
  Shield,
  Menu,
  X,
  Phone,
  MessageSquare,
  Bot,
  Tv,
  FileCheck,
  Calculator,
  Compass
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setIsBookingModalOpen,
    setIsClientPortalOpen,
    setIsAdminLoginOpen,
    setIsAIAssistantOpen,
    currentUser,
    logout,
    settings,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'news', label: 'الأخبار والرادار' },
    { id: 'case-studies', label: 'قصص النجاح' },
    { id: 'resources', label: 'النماذج المجانية' },
    { id: 'team', label: 'فريق العمل' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
    { id: 'contact', label: 'تواصل معنا' },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId as any);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Bar / Quick Contact Strip */}
      <div className="bg-[#07101E] border-b border-[#C9A227]/20 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {settings.address}
            </span>
            <span className="text-[#C9A227]">|</span>
            <a
              href={`tel:${settings.phone1}`}
              className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              {settings.phone1}
            </a>
            <a
              href={`tel:${settings.phone2}`}
              className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors"
              dir="ltr"
            >
              {settings.phone2}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="flex items-center gap-1.5 text-[#DFC377] hover:text-[#FAF0CA] transition-colors font-medium cursor-pointer"
            >
              <ArkanLogo variant="emblem-only" size={18} showText={false} />
              <span>مساعد أركان الذكي</span>
            </button>

            <span className="text-slate-600">|</span>

            <button
              onClick={() => setActiveView('queue-display')}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              title="شاشة عرض الطابور في المقر"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>شاشة الطابور</span>
            </button>

            <span className="text-slate-600">|</span>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-amber-300 font-medium">
                  {currentUser.role === 'admin'
                    ? 'لوحة الإدارة'
                    : currentUser.role === 'secretary'
                    ? 'السكرتارية'
                    : currentUser.role === 'consultant'
                    ? 'بوابة المحامي'
                    : currentUser.name}
                </span>
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin') setActiveView('admin-dashboard');
                    else if (currentUser.role === 'secretary') setActiveView('secretary-dashboard');
                    else setActiveView('client-dashboard');
                  }}
                  className="px-2 py-0.5 rounded bg-[#1B335A] text-[#DFC377] hover:bg-[#C9A227] hover:text-[#0A192F] transition-all text-[11px]"
                >
                  اللوحة
                </button>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 text-[11px] underline mr-1"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsClientPortalOpen(true)}
                className="flex items-center gap-1 hover:text-[#C9A227] transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>بوابة الموكلين</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A192F]/95 backdrop-blur-md shadow-2xl border-b border-[#C9A227]/30 py-3'
            : 'bg-[#0A192F] border-b border-[#1E2E47] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-right cursor-pointer group"
          >
            <ArkanLogo size={isScrolled ? 50 : 58} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#C9A227] font-bold'
                      : 'text-slate-200 hover:text-[#DFC377]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* AI Assistant Quick Button with Logo Emblem */}
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#112240] hover:bg-[#1B335A] border border-[#C9A227]/30 text-[#DFC377] text-xs font-medium transition-all cursor-pointer"
              title="مساعد أركان الذكي للإجابة عن الاستفسارات القانونية وصياغة العقود"
            >
              <ArkanLogo variant="emblem-only" size={20} showText={false} />
              <span className="hidden md:inline font-bold">مساعد أركان</span>
            </button>

            {/* Primary Action: Book Consultation */}
            <button
              id="header-book-btn"
              onClick={() => {
                setIsBookingModalOpen(true);
              }}
              className="relative group overflow-hidden px-4 sm:px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#C9A227] via-[#DFC377] to-[#A37E1C] text-[#0A192F] font-bold text-sm shadow-lg shadow-[#C9A227]/20 hover:shadow-[#C9A227]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Calendar className="w-4 h-4" />
              <span>احجز استشارتك</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#112240] text-slate-200 hover:text-[#C9A227] border border-slate-700/60"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1E2E47] bg-[#07101E]/98 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsClientPortalOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#112240] text-slate-200 border border-slate-700/50"
              >
                <User className="w-4 h-4 text-[#C9A227]" />
                <span>بوابة الموكلين</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminLoginOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#112240] text-slate-200 border border-slate-700/50"
              >
                <Shield className="w-4 h-4 text-[#C9A227]" />
                <span>دخول الإدارة</span>
              </button>
            </div>

            <nav className="flex flex-col space-y-1 text-right">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium text-right transition-colors ${
                    activeView === link.id
                      ? 'bg-[#C9A227]/15 text-[#C9A227] font-bold'
                      : 'text-slate-200 hover:bg-[#112240]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('queue-display');
                }}
                className="py-2.5 px-3 rounded-lg text-sm text-right text-amber-300/80 hover:bg-[#112240] flex items-center justify-between"
              >
                <span>شاشة الطابور بالمكتب</span>
                <Tv className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAIAssistantOpen(true);
                }}
                className="py-2.5 px-3 rounded-lg text-sm text-right text-[#DFC377] hover:bg-[#112240] flex items-center justify-between"
              >
                <span>مساعد أركان الذكي (AI)</span>
                <Bot className="w-4 h-4" />
              </button>
            </nav>

            <div className="pt-2">
              <a
                href={`tel:${settings.phone1}`}
                className="flex items-center justify-center gap-2 py-2.5 w-full rounded-lg bg-[#112240] text-slate-200 text-sm font-bold border border-[#C9A227]/40"
              >
                <Phone className="w-4 h-4 text-[#C9A227]" />
                <span>اتصال مباشر: {settings.phone1}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
