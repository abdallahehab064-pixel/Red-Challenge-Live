export type ServiceCategory = 'legal' | 'accounting' | 'tax';

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  fullDescription: string;
  subServices: string[];
  procedureSteps: string[];
  requiredDocuments: string[];
  faqs: { question: string; answer: string }[];
  icon: string;
}

export type BookingStatus =
  | 'waiting'       // في الانتظار
  | 'arrived'       // تم الحضور
  | 'in_session'    // داخل الجلسة
  | 'completed'     // تم الانتهاء
  | 'rescheduled'   // تم التأجيل
  | 'cancelled';    // ملغي

export interface BookingAttachment {
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  uploadDate: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;    // e.g. "ARK-BKG-20260912-001"
  queueNumber: string;      // e.g. "001"
  clientId: string;
  clientName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  consultantId?: string;
  consultantName?: string;
  date: string;             // YYYY-MM-DD
  time: string;             // HH:mm (e.g. "05:30 م")
  status: BookingStatus;
  notes?: string;
  attachments?: BookingAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Consultant {
  id: string;
  name: string;
  role: string;
  roleTitle?: string;
  specialty: string;
  specialization?: string;
  bio: string;
  experienceYears: number;
  avatarUrl?: string;
  avatar?: string;
  qualification?: string;
  bioPoints?: string[];
}

export interface CaseUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  lawyerName: string;
}

export interface ClientCase {
  id: string;
  caseNumber: string;      // e.g. "ARK-2026-00452"
  clientId: string;
  clientName: string;
  clientPhone: string;
  title: string;
  type: 'مدني' | 'تجاري' | 'ضرائب' | 'شركات' | 'جنائي' | 'عمل';
  court?: string;
  status: 'قيد الدراسة' | 'متداولة بالجلسات' | 'مؤجلة للحكم' | 'تم الفصل والربح' | 'مغلقة';
  nextSessionDate?: string;
  nextSessionTopic?: string;
  lawyerNotes?: string;
  updates: CaseUpdate[];
  documents: { name: string; date: string; category: string }[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  publishedAt?: string;
  excerpt: string;
  summary?: string;
  content: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
}

export interface LegislationItem {
  id: string;
  title: string;
  category: 'تعديل تشريعي' | 'قرار وزاري' | 'مواعيد ضريبية' | 'تنبيه قضائي';
  date: string;
  effectiveDate?: string;
  summary: string;
  importance: 'عاجل' | 'هام' | 'معلومة عامة';
  officialNumber?: string;
  officialSource?: string;
  impact?: string;
}

export interface ResourceTemplate {
  id: string;
  title: string;
  category: 'عقود إيجار' | 'شركات وتأسيس' | 'اتفاقيات سرية' | 'نماذج إدارية ومحاسبية';
  description: string;
  format: 'DOCX' | 'PDF';
  fileFormat?: string;
  pages: number;
  fileSize?: string;
  downloadsCount: number;
  downloadCount?: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  problem: string;
  challenge?: string;
  approach: string;
  actionTaken?: string;
  solution: string;
  result: string;
  timeframe: string;
  date?: string;
  imageUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'حجوزات' | 'قانوني' | 'محاسبي' | 'ضرائب' | 'عام';
}

export interface SystemSettings {
  orgName: string;
  address: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  workDays: string[];
  workHoursStart: string;
  workHoursEnd: string;
  slotDurationMinutes: number;
  maxBookingsPerSlot: number;
  reminderNoticeHours: number;
  disclaimer: string;
}

export type UserRole = 'admin' | 'secretary' | 'consultant' | 'client';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: UserRole;
  token?: string;
  department?: string;
}

// Enterprise CRM Client Profile
export interface ClientProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  address?: string;
  clientType: 'فرد' | 'شركة' | 'مؤسسة';
  companyName?: string;
  commercialRegister?: string;
  taxNumber?: string;
  totalCasesCount: number;
  totalBookingsCount: number;
  totalPaid: number;
  balanceDue: number;
  subscriptionTier?: 'None' | 'Basic' | 'Business' | 'Corporate';
  joinDate: string;
  status: 'نشط' | 'قيد المتابعة' | 'سابق';
  notes?: string;
}

// Client Activity Timeline Item
export interface ClientTimelineEvent {
  id: string;
  clientId: string;
  date: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'حجز' | 'حضور' | 'جلسة' | 'عقد' | 'تحديث' | 'دفع' | 'مستند';
  performedBy: string;
}

// Task Management for Lawyers and Secretaries
export interface StaffTask {
  id: string;
  title: string;
  description?: string;
  assignedTo: string; // Staff member name
  assignedToRole: 'consultant' | 'secretary' | 'admin';
  assignedBy: string;
  dueDate: string;
  priority: 'عاجل' | 'مرتفع' | 'متوسط' | 'عادي';
  status: 'قيد التنفيذ' | 'مكتمل' | 'بانتظار المراجعة' | 'متأخر';
  relatedCaseId?: string;
  relatedClientId?: string;
  clientName?: string;
  createdAt: string;
  completedAt?: string;
}

// Security Audit Log
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string; // e.g. "فتح ملف عميل", "تعديل حجز", "حذف مستند", "تغيير حالة قضية", "تصدير بيانات"
  targetType: 'عميل' | 'قضية' | 'حجز' | 'مستند' | 'مهمة' | 'فاتورة' | 'نظام';
  targetId?: string;
  targetName?: string;
  details?: string;
  ipAddress?: string;
}

// Post-Consultation Reviews
export interface ConsultationReview {
  id: string;
  bookingId: string;
  clientName: string;
  clientPhone: string;
  consultantName: string;
  serviceName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  recommendToOthers: boolean;
  status: 'معتمد' | 'جديد';
}

// Lead Management (Pre-booking tracking)
export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: 'المحادثة الذكية' | 'حاسبة الأتعاب' | 'واتساب' | 'تحميل نموذج عقد' | 'نموذج التواصل' | 'مكالمة هاتفية';
  inquiry: string;
  serviceCategory?: string;
  status: 'جديد' | 'تم التواصل' | 'حجز موعد' | 'أصبح عميلاً' | 'غير مهتم';
  createdAt: string;
  notes?: string;
  convertedToBookingId?: string;
}

// Quotations and Invoices
export interface QuotationInvoice {
  id: string;
  invoiceNumber: string; // e.g. "ARK-INV-2026-008"
  clientId: string;
  clientName: string;
  clientPhone: string;
  type: 'عرض سعر' | 'فاتورة نهائية' | 'مطالبة دفعة';
  serviceTitle: string;
  items: { description: string; amount: number }[];
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: 'مسودة' | 'معتمد' | 'مدفوع كلياً' | 'مدفوع جزئياً' | 'ملغي';
  dueDate: string;
  issueDate: string;
  paymentMethod?: 'نقدي بالمقر' | 'تحويل بنكي' | 'فودافون كاش / إنستاباي';
  notes?: string;
}

// Document with Version Control & Approval Flow
export interface ManagedDocument {
  id: string;
  title: string;
  category: string;
  caseId?: string;
  clientId?: string;
  clientName?: string;
  version: string; // "v1.0", "v2.0", "نهائي معتمد"
  fileFormat: 'DOCX' | 'PDF';
  uploadedBy: string;
  uploadDate: string;
  approvalStatus: 'مسودة' | 'بانتظار مراجعة المدير' | 'معتمد رسمياً' | 'مرفوض للتعديل';
  approvedBy?: string;
  approvedAt?: string;
  watermark: boolean;
  notes?: string;
  downloadUrl?: string;
}

// Service Requests from Portal
export interface ServiceRequest {
  id: string;
  ticketNumber: string; // "REQ-2026-012"
  clientId: string;
  clientName: string;
  clientPhone: string;
  type: 'مراجعة عقد' | 'تأسيس شركة' | 'إقرار ضريبي' | 'استخراج مستند رسمي' | 'استشارة عاجلة';
  description: string;
  assignedTo: string;
  priority: 'عاجل' | 'عادي' | 'هام';
  status: 'جديد' | 'قيد الدراسة' | 'جاري التنفيذ' | 'مكتمل' | 'ملغي';
  createdAt: string;
  completedAt?: string;
}
