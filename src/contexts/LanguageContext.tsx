import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Database Solutions',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact Us',
    'nav.resources': 'Resources',
    'nav.getStarted': 'Get Started',
    
    // Home Page
    'home.title': 'Custom Oracle Database Solutions',
    'home.subtitle': 'Professional custom applications built on Oracle Database to streamline your business operations',
    'home.cta': 'Explore Our Solutions',
    'home.learnMore': 'Learn More',
    
    // Services
    'services.title': 'Oracle Database Solutions',
    'services.subtitle': 'Custom applications built on Oracle Database platform',
    
    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Examples of custom Oracle Database solutions we have delivered',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our Oracle experts',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.company': 'Company Name',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.company': 'Active Soft',
    'footer.tagline': 'Oracle ERP Solutions',
    'footer.description': 'Your gateway to professional Oracle ERP systems and powerful enterprise solutions.',
    'footer.quickLinks': 'Quick Links',
    'footer.oracleServices': 'Oracle ERP Services',
    'footer.getInTouch': 'Get In Touch',
    'footer.businessHours': 'Business Hours',
    'footer.location': 'Location',
    'footer.globalReach': 'Global Reach',
    'footer.email': 'Email',
    'footer.support': 'Support',
    'footer.sales': 'Sales',
    'footer.allRights': 'All rights reserved. | Oracle ERP Specialists',
    
    // Admin
    'admin.login': 'Admin Login',
    'admin.dashboard': 'Dashboard',
    'admin.username': 'Username',
    'admin.password': 'Password',
    'admin.signin': 'Sign In',
    
    // Services Page
    'services.custom.title': 'Custom Business Applications',
    'services.custom.desc': 'Tailored applications built on Oracle Database for your specific business needs',
    'services.crm.title': 'Customer Relationship Management',
    'services.crm.desc': 'Custom CRM systems with advanced customer tracking and analytics',
    'services.inventory.title': 'Inventory Management Systems',
    'services.inventory.desc': 'Comprehensive inventory tracking and management solutions',
    'services.financial.title': 'Financial Management Systems',
    'services.financial.desc': 'Custom financial applications with real-time reporting and analytics',
    'services.hr.title': 'Human Resources Management',
    'services.hr.desc': 'Complete HR systems for employee management and payroll processing',
    'services.reporting.title': 'Business Intelligence & Reporting',
    'services.reporting.desc': 'Advanced reporting tools and dashboard solutions',
    
    // Contact Form
    'contact.form.subject': 'Subject',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Failed to send message. Please try again.',
    'contact.info.address': 'Our Address',
    'contact.info.phone': 'Phone Numbers',
    'contact.info.email': 'Email Address',
    'contact.info.hours': 'Business Hours',
    
    // Brochures
    'brochures.title': 'Resources & Downloads',
    'brochures.subtitle': 'Download our latest brochures and case studies',
    'brochures.download': 'Download',
    'brochures.size': 'Size',
    'brochures.type': 'Type',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.back': 'Back'
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'حلول قواعد البيانات',
    'nav.portfolio': 'أعمالنا السابقة',
    'nav.contact': 'اتصل بنا',
    'nav.resources': 'الموارد',
    'nav.getStarted': 'ابدأ الآن',
    
    // Home Page
    'home.title': 'حلول Oracle Database المخصصة',
    'home.subtitle': 'تطبيقات مخصصة احترافية مبنية على قاعدة بيانات Oracle لتحسين عمليات شركتك',
    'home.cta': 'استكشف حلولنا',
    'home.learnMore': 'اعرف المزيد',
    
    // Services
    'services.title': 'حلول قواعد بيانات Oracle',
    'services.subtitle': 'تطبيقات مخصصة مبنية على منصة Oracle Database',
    
    // Portfolio
    'portfolio.title': 'أعمالنا السابقة',
    'portfolio.subtitle': 'أمثلة على حلول Oracle Database المخصصة التي قدمناها',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع خبراء Oracle لدينا',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.company': 'اسم الشركة',
    'contact.message': 'رسالتك',
    'contact.send': 'إرسال الرسالة',
    
    // Footer
    'footer.company': 'أكتيف سوفت',
    'footer.tagline': 'حلول Oracle ERP',
    'footer.description': 'بوابتك إلى أنظمة Oracle ERP المتقدمة وحلول المؤسسات القوية.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.oracleServices': 'خدمات Oracle ERP',
    'footer.getInTouch': 'تواصل معنا',
    'footer.businessHours': 'ساعات العمل',
    'footer.location': 'الموقع',
    'footer.globalReach': 'النطاق العالمي',
    'footer.email': 'البريد الإلكتروني',
    'footer.support': 'الدعم الفني',
    'footer.sales': 'المبيعات',
    'footer.allRights': 'جميع الحقوق محفوظة. | متخصصون في Oracle ERP',
    
    // Services Page
    'services.custom.title': 'تطبيقات أعمال مخصصة',
    'services.custom.desc': 'تطبيقات مصممة خصيصاً مبنية على Oracle Database لاحتياجات شركتك المحددة',
    'services.crm.title': 'إدارة علاقات العملاء',
    'services.crm.desc': 'أنظمة CRM مخصصة مع تتبع متقدم للعملاء والتحليلات',
    'services.inventory.title': 'أنظمة إدارة المخزون',
    'services.inventory.desc': 'حلول شاملة لتتبع وإدارة المخزون',
    'services.financial.title': 'أنظمة الإدارة المالية',
    'services.financial.desc': 'تطبيقات مالية مخصصة مع تقارير وتحليلات فورية',
    'services.hr.title': 'إدارة الموارد البشرية',
    'services.hr.desc': 'أنظمة HR كاملة لإدارة الموظفين ومعالجة المرتبات',
    'services.reporting.title': 'ذكاء الأعمال والتقارير',
    'services.reporting.desc': 'أدوات تقارير متقدمة وحلول لوحات التحكم',
    
    // Contact Form
    'contact.form.subject': 'الموضوع',
    'contact.form.sending': 'جاري الإرسال...',
    'contact.form.success': 'تم إرسال الرسالة بنجاح!',
    'contact.form.error': 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    'contact.info.address': 'عنواننا',
    'contact.info.phone': 'أرقام الهاتف',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.hours': 'ساعات العمل',
    
    // Brochures
    'brochures.title': 'الموارد والتحميلات',
    'brochures.subtitle': 'حمل أحدث كتيباتنا ودراسات الحالة',
    'brochures.download': 'تحميل',
    'brochures.size': 'الحجم',
    'brochures.type': 'النوع',
    
    // Admin
    'admin.login': 'تسجيل دخول الإدارة',
    'admin.dashboard': 'لوحة التحكم',
    'admin.username': 'اسم المستخدم',
    'admin.password': 'كلمة المرور',
    'admin.signin': 'تسجيل الدخول',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.back': 'رجوع'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to Arabic
    return (localStorage.getItem('language') as Language) || 'ar';
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
    
    // Update document direction and language
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};