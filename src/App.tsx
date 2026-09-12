import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NewsBar } from './components/NewsBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveCalculators } from './components/InteractiveCalculators';
import { ContentAndRadar } from './components/ContentAndRadar';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TeamSection } from './components/TeamSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals & Popups
import { BookingModal } from './components/BookingModal';
import { ReceiptModal } from './components/ReceiptModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ReminderModal } from './components/ReminderModal';

// Dedicated Fullscreen Views
import { QueueDisplayView } from './components/QueueDisplayView';
import { SecretaryDashboard } from './components/SecretaryDashboard';
import { AdminDashboard } from './components/AdminDashboard';

// Floating Widgets
import { Calendar, Bot, MessageSquare } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setIsBookingModalOpen, setIsAIAssistantOpen, settings } = useApp();

  // Fullscreen Queue Screen for the office / waiting room
  if (activeView === 'queue-display') {
    return <QueueDisplayView />;
  }

  // Staff & Admin Portals
  if (activeView === 'secretary-dashboard') {
    return <SecretaryDashboard />;
  }

  if (activeView === 'admin-dashboard') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#F5F5F0] flex flex-col font-sans selection:bg-[#C9A227] selection:text-[#0A192F]">
      {/* Top Syndicate News & Date/Time Bar */}
      <NewsBar />

      {/* Sticky Header */}
      <Header />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <TrustStats />
            <AboutSection />
            <ServicesSection />
            <InteractiveCalculators />
            <ContentAndRadar />
            <CaseStudiesSection />
            <TeamSection />
            <FAQSection />
            <ContactSection />
          </>
        )}

        {activeView === 'about' && (
          <div className="py-8">
            <AboutSection />
            <TrustStats />
            <TeamSection />
          </div>
        )}

        {activeView === 'services' && (
          <div className="py-8">
            <ServicesSection />
            <InteractiveCalculators />
          </div>
        )}

        {activeView === 'news' && (
          <div className="py-8">
            <ContentAndRadar />
          </div>
        )}

        {activeView === 'resources' && (
          <div className="py-8">
            <ContentAndRadar />
          </div>
        )}

        {activeView === 'case-studies' && (
          <div className="py-8">
            <CaseStudiesSection />
          </div>
        )}

        {activeView === 'team' && (
          <div className="py-8">
            <TeamSection />
          </div>
        )}

        {activeView === 'faq' && (
          <div className="py-8">
            <FAQSection />
          </div>
        )}

        {activeView === 'contact' && (
          <div className="py-8">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Global Modals */}
      <BookingModal />
      <ReceiptModal />
      <ServiceDetailModal />
      <ClientPortalModal />
      <AdminLoginModal />
      <AIAssistantModal />
      <ReminderModal />

      {/* Floating Quick Action Buttons (Bottom Corner) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3 no-print">
        {/* Floating WhatsApp Quick Link */}
        <a
          href={`https://wa.me/201141754963?text=${encodeURIComponent('السلام عليكم، استفسار لمؤسسة أركان')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
          title="محادثة واتساب سريعة"
          aria-label="محادثة واتساب"
        >
          <MessageSquare className="w-6 h-6" />
        </a>

        {/* Floating AI Assistant */}
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="w-12 h-12 rounded-full bg-[#112240] hover:bg-[#1B335A] text-[#DFC377] border border-[#C9A227]/40 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="مساعد أركان الذكي"
          aria-label="المساعد الذكي"
        >
          <Bot className="w-6 h-6" />
        </button>

        {/* Floating Quick Book Appointment Button */}
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="w-13 h-13 rounded-full bg-gradient-to-r from-[#C9A227] to-[#A37E1C] text-[#0A192F] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-[#FAF0CA]"
          title="احجز استشارتك"
          aria-label="احجز استشارتك"
        >
          <Calendar className="w-6 h-6" />
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
