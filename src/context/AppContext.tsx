import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  BookingStatus,
  Service,
  Consultant,
  ClientCase,
  Article,
  LegislationItem,
  ResourceTemplate,
  CaseStudy,
  FAQItem,
  SystemSettings,
  AuthUser,
  UserRole,
  BookingAttachment,
} from '../types';
import {
  INITIAL_SETTINGS,
  SERVICES_DATA,
  INITIAL_CONSULTANTS,
  INITIAL_BOOKINGS,
  INITIAL_CASES,
  ARTICLES_DATA,
  LEGISLATION_RADAR,
  FREE_RESOURCES,
  CASE_STUDIES,
  FAQS_DATA,
} from '../data/initialData';

export type AppView =
  | 'home'
  | 'about'
  | 'services'
  | 'news'
  | 'resources'
  | 'case-studies'
  | 'team'
  | 'faq'
  | 'contact'
  | 'admin-dashboard'
  | 'secretary-dashboard'
  | 'client-dashboard'
  | 'queue-display';

interface AppContextType {
  // State
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  services: Service[];
  consultants: Consultant[];
  bookings: Booking[];
  cases: ClientCase[];
  articles: Article[];
  legislationRadar: LegislationItem[];
  freeResources: ResourceTemplate[];
  caseStudies: CaseStudy[];
  faqs: FAQItem[];
  currentUser: AuthUser | null;

  // Data Loading States
  isLoadingServices: boolean;
  setIsLoadingServices: (loading: boolean) => void;
  isLoadingCaseStudies: boolean;
  setIsLoadingCaseStudies: (loading: boolean) => void;
  refreshServices: () => Promise<void>;
  refreshCaseStudies: () => Promise<void>;

  // Modals & Navigation
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingServicePreset: string | null;
  setBookingServicePreset: (serviceId: string | null) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  currentBookingForReceipt: Booking | null;
  setCurrentBookingForReceipt: (booking: Booking | null) => void;
  isClientPortalOpen: boolean;
  setIsClientPortalOpen: (open: boolean) => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isReminderPreviewOpen: boolean;
  setIsReminderPreviewOpen: (open: boolean) => void;
  reminderBookingTarget: Booking | null;
  setReminderBookingTarget: (booking: Booking | null) => void;

  // Queue Live Display
  currentServingQueue: string;
  nextServingQueue: string;

  // Actions
  createBooking: (formData: {
    clientName: string;
    phone: string;
    whatsapp?: string;
    email?: string;
    serviceId: string;
    date: string;
    time: string;
    notes?: string;
    attachments?: BookingAttachment[];
  }) => Booking;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  callNextQueueItem: () => void;
  markQueueNumberManual: (nowNumber: string, nextNumber: string) => void;

  // Auth
  login: (role: UserRole, phoneOrEmail: string, name?: string) => void;
  logout: () => void;

  // Client Case Management
  addCaseUpdate: (caseId: string, title: string, description: string, lawyerName: string) => void;

  // Data Export
  exportBookingsToCSV: () => void;
  exportClientsToCSV: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_BOOKINGS = 'arkan_bookings_v2';
const LOCAL_STORAGE_KEY_SETTINGS = 'arkan_settings_v2';
const LOCAL_STORAGE_KEY_CASES = 'arkan_cases_v2';
const LOCAL_STORAGE_KEY_AUTH = 'arkan_auth_user_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('home');

  // Persistence: Settings
  const [settings, setSettings] = useState<SystemSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Persistence: Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Persistence: Cases
  const [cases, setCases] = useState<ClientCase[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CASES);
      return saved ? JSON.parse(saved) : INITIAL_CASES;
    } catch {
      return INITIAL_CASES;
    }
  });

  // Persistence: Auth
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Other Static or Dynamic datasets
  const [services] = useState<Service[]>(SERVICES_DATA);
  const [consultants] = useState<Consultant[]>(INITIAL_CONSULTANTS);
  const [articles] = useState<Article[]>(ARTICLES_DATA);
  const [legislationRadar] = useState<LegislationItem[]>(LEGISLATION_RADAR);
  const [freeResources] = useState<ResourceTemplate[]>(FREE_RESOURCES);
  const [caseStudies] = useState<CaseStudy[]>(CASE_STUDIES);
  const [faqs] = useState<FAQItem[]>(FAQS_DATA);

  // Data Loading States for smooth skeleton transition
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);
  const [isLoadingCaseStudies, setIsLoadingCaseStudies] = useState<boolean>(true);

  useEffect(() => {
    const timerServices = setTimeout(() => {
      setIsLoadingServices(false);
    }, 600);

    const timerCaseStudies = setTimeout(() => {
      setIsLoadingCaseStudies(false);
    }, 700);

    return () => {
      clearTimeout(timerServices);
      clearTimeout(timerCaseStudies);
    };
  }, []);

  const refreshServices = async () => {
    setIsLoadingServices(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoadingServices(false);
  };

  const refreshCaseStudies = async () => {
    setIsLoadingCaseStudies(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoadingCaseStudies(false);
  };

  // Modals & UI States
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingServicePreset, setBookingServicePreset] = useState<string | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [currentBookingForReceipt, setCurrentBookingForReceipt] = useState<Booking | null>(null);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isReminderPreviewOpen, setIsReminderPreviewOpen] = useState(false);
  const [reminderBookingTarget, setReminderBookingTarget] = useState<Booking | null>(null);

  // Queue Live status
  const [currentServingQueue, setCurrentServingQueue] = useState('001');
  const [nextServingQueue, setNextServingQueue] = useState('002');

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CASES, JSON.stringify(cases));
    } catch (e) {
      console.error('Failed to save cases', e);
    }
  }, [cases]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.error('Failed to save auth', e);
    }
  }, [currentUser]);

  // Update Settings
  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Generate Sequential Queue Number for a given date (starts from 001 each day)
  const generateSequentialQueueNumber = (targetDate: string): string => {
    const sameDateBookings = bookings.filter((b) => b.date === targetDate);
    const nextSeq = sameDateBookings.length + 1;
    return String(nextSeq).padStart(3, '0');
  };

  // Create Booking
  const createBooking = (formData: {
    clientName: string;
    phone: string;
    whatsapp?: string;
    email?: string;
    serviceId: string;
    date: string;
    time: string;
    notes?: string;
    attachments?: BookingAttachment[];
  }): Booking => {
    const queueNum = generateSequentialQueueNumber(formData.date);
    const dateCompact = formData.date.replace(/-/g, '');
    const bookingNum = `ARK-${dateCompact}-${queueNum}`;
    const matchedService = services.find((s) => s.id === formData.serviceId);

    // Assign appropriate consultant based on category
    let matchedConsultant: Consultant | undefined;
    if (matchedService) {
      if (matchedService.category === 'legal') matchedConsultant = consultants[0];
      else if (matchedService.category === 'tax') matchedConsultant = consultants[1];
      else matchedConsultant = consultants[2];
    }

    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      bookingNumber: bookingNum,
      queueNumber: queueNum,
      clientId: `cli-${Date.now().toString().slice(-4)}`,
      clientName: formData.clientName,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email,
      serviceId: formData.serviceId,
      serviceName: matchedService ? matchedService.title : 'استشارة قانونية أو مالية',
      consultantId: matchedConsultant?.id,
      consultantName: matchedConsultant?.name,
      date: formData.date,
      time: formData.time,
      status: 'waiting',
      notes: formData.notes,
      attachments: formData.attachments || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setCurrentBookingForReceipt(newBooking);
    setIsReceiptModalOpen(true);
    return newBooking;
  };

  // Update Status
  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          if (newStatus === 'in_session') {
            setCurrentServingQueue(b.queueNumber);
          }
          return {
            ...b,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );
  };

  // Reschedule Booking
  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    const newQueue = generateSequentialQueueNumber(newDate);
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            date: newDate,
            time: newTime,
            queueNumber: newQueue,
            status: 'rescheduled',
            updatedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );
  };

  // Call Next in Queue
  const callNextQueueItem = () => {
    const today = new Date().toISOString().split('T')[0];
    const eligible = bookings.filter(
      (b) => (b.status === 'arrived' || b.status === 'waiting') && b.date === today
    );

    if (eligible.length > 0) {
      const nextBooking = eligible[0];
      updateBookingStatus(nextBooking.id, 'in_session');
      setCurrentServingQueue(nextBooking.queueNumber);

      const following = eligible[1];
      if (following) {
        setNextServingQueue(following.queueNumber);
      } else {
        const nextNum = parseInt(nextBooking.queueNumber, 10) + 1;
        setNextServingQueue(String(nextNum).padStart(3, '0'));
      }
    }
  };

  const markQueueNumberManual = (nowNumber: string, nextNumber: string) => {
    setCurrentServingQueue(nowNumber);
    setNextServingQueue(nextNumber);
  };

  // Auth
  const login = (role: UserRole, phoneOrEmail: string, name?: string) => {
    const user: AuthUser = {
      id: `usr-${Date.now()}`,
      name: name || (role === 'admin' ? 'مدير المؤسسة' : role === 'secretary' ? 'أمانة السكرتارية' : role === 'consultant' ? 'المستشار القانوني' : 'الموكل'),
      email: phoneOrEmail.includes('@') ? phoneOrEmail : undefined,
      phone: phoneOrEmail,
      role,
      token: `trk_${Math.random().toString(36).substring(2)}`,
    };
    setCurrentUser(user);
    if (role === 'admin') setActiveView('admin-dashboard');
    else if (role === 'secretary') setActiveView('secretary-dashboard');
    else if (role === 'client') setActiveView('client-dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  // Case updates
  const addCaseUpdate = (caseId: string, title: string, description: string, lawyerName: string) => {
    const newUpdate = {
      id: `up-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title,
      description,
      lawyerName,
    };
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            updates: [newUpdate, ...c.updates],
          };
        }
        return c;
      })
    );
  };

  // CSV Export with UTF-8 BOM for Arabic support in Microsoft Excel
  const exportBookingsToCSV = () => {
    const headers = [
      'رقم الحجز',
      'رقم الدور',
      'اسم العميل',
      'رقم الهاتف',
      'الخدمة المطلوبة',
      'المستشار',
      'التاريخ',
      'الوقت',
      'الحالة',
      'ملاحظات',
    ];

    const statusMap: Record<BookingStatus, string> = {
      waiting: 'في الانتظار',
      arrived: 'تم الحضور',
      in_session: 'داخل الجلسة',
      completed: 'تم الانتهاء',
      rescheduled: 'تم التأجيل',
      cancelled: 'ملغي',
    };

    const rows = bookings.map((b) => [
      `"${b.bookingNumber}"`,
      `"${b.queueNumber}"`,
      `"${b.clientName.replace(/"/g, '""')}"`,
      `"${b.phone}"`,
      `"${b.serviceName.replace(/"/g, '""')}"`,
      `"${b.consultantName || '-'}"`,
      `"${b.date}"`,
      `"${b.time}"`,
      `"${statusMap[b.status] || b.status}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `حجوزات_مؤسسة_أركان_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportClientsToCSV = () => {
    const clientsMap = new Map<string, { name: string; phone: string; email?: string; bookingsCount: number }>();
    bookings.forEach((b) => {
      const existing = clientsMap.get(b.phone);
      if (existing) {
        existing.bookingsCount += 1;
      } else {
        clientsMap.set(b.phone, {
          name: b.clientName,
          phone: b.phone,
          email: b.email,
          bookingsCount: 1,
        });
      }
    });

    const headers = ['اسم العميل', 'رقم الهاتف', 'البريد الإلكتروني', 'عدد الحجوزات'];
    const rows = Array.from(clientsMap.values()).map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email || '-'}"`,
      `"${c.bookingsCount}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `عملاء_مؤسسة_أركان_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        settings,
        updateSettings,
        services,
        consultants,
        bookings,
        cases,
        articles,
        legislationRadar,
        freeResources,
        caseStudies,
        faqs,
        currentUser,
        isLoadingServices,
        setIsLoadingServices,
        isLoadingCaseStudies,
        setIsLoadingCaseStudies,
        refreshServices,
        refreshCaseStudies,
        selectedService,
        setSelectedService,
        selectedArticle,
        setSelectedArticle,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingServicePreset,
        setBookingServicePreset,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        currentBookingForReceipt,
        setCurrentBookingForReceipt,
        isClientPortalOpen,
        setIsClientPortalOpen,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isReminderPreviewOpen,
        setIsReminderPreviewOpen,
        reminderBookingTarget,
        setReminderBookingTarget,
        currentServingQueue,
        nextServingQueue,
        createBooking,
        updateBookingStatus,
        rescheduleBooking,
        callNextQueueItem,
        markQueueNumberManual,
        login,
        logout,
        addCaseUpdate,
        exportBookingsToCSV,
        exportClientsToCSV,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
