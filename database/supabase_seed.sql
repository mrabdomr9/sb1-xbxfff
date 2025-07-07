-- Active Soft Website - Initial Data for Supabase
-- Run this after creating the schema

-- ================================================
-- 1. DEFAULT ADMIN USER
-- ================================================
-- Password is 'admin123' (you should hash this properly in production)
INSERT INTO admin_users (username, password_hash, email, full_name, role, is_active)
VALUES ('admin', '$2b$10$8K1p/a0dRTLCYZTc6uqXSeFv7mK1zJ4Q5h9N3jX2M8wC7E6qA9Y.G', 'admin@activesoft.com', 'Administrator', 'admin', true)
ON CONFLICT (username) DO NOTHING;

-- ================================================
-- 2. DEFAULT SERVICES
-- ================================================
INSERT INTO services (name_en, name_ar, description_en, description_ar, icon, category, features_en, features_ar, is_active, sort_order)
VALUES 
(
    'Custom Business Applications',
    'تطبيقات أعمال مخصصة',
    'Develop custom applications using Oracle Database to meet your specific business requirements and optimize business processes.',
    'تطوير تطبيقات مخصصة باستخدام قاعدة بيانات Oracle لتلبية احتياجات شركتك المحددة وتحسين العمليات التجارية.',
    '⚙️',
    'development',
    '["Custom workflows", "Business process automation", "User-friendly interfaces", "Real-time data processing", "Integration capabilities"]',
    '["سير عمل مخصص", "أتمتة العمليات التجارية", "واجهات سهلة الاستخدام", "معالجة البيانات في الوقت الفعلي", "قدرات التكامل"]',
    true,
    1
),
(
    'Customer Management Systems',
    'أنظمة إدارة العملاء',
    'Advanced CRM solutions for customer relationship management with comprehensive tracking and analytics.',
    'حلول CRM متطورة لإدارة علاقات العملاء مع تتبع وتحليلات شاملة.',
    '🤝',
    'management',
    '["Customer database management", "Sales pipeline tracking", "Communication history", "Performance analytics", "Automated follow-ups"]',
    '["إدارة قاعدة بيانات العملاء", "تتبع مسار المبيعات", "تاريخ التواصل", "تحليلات الأداء", "المتابعة التلقائية"]',
    true,
    2
),
(
    'Inventory Management Systems',
    'أنظمة إدارة المخزون',
    'Efficient inventory tracking and management with real-time stock monitoring and automated reordering.',
    'تتبع وإدارة المخزون بكفاءة عالية مع مراقبة المخزون في الوقت الفعلي وإعادة الطلب التلقائي.',
    '📦',
    'management',
    '["Real-time inventory tracking", "Automated stock alerts", "Supplier management", "Cost optimization", "Barcode integration"]',
    '["تتبع المخزون في الوقت الفعلي", "تنبيهات المخزون التلقائية", "إدارة الموردين", "تحسين التكاليف", "تكامل الباركود"]',
    true,
    3
),
(
    'Financial Management Systems',
    'أنظمة الإدارة المالية',
    'Comprehensive and advanced accounting solutions with automated financial reporting and compliance.',
    'حلول محاسبية شاملة ومتقدمة مع التقارير المالية التلقائية والامتثال.',
    '💰',
    'finance',
    '["General ledger management", "Automated invoicing", "Financial reporting", "Budget planning", "Tax compliance"]',
    '["إدارة دفتر الأستاذ العام", "الفوترة التلقائية", "التقارير المالية", "تخطيط الميزانية", "الامتثال الضريبي"]',
    true,
    4
),
(
    'Human Resources Systems',
    'أنظمة الموارد البشرية',
    'Comprehensive employee and payroll management with performance tracking and automated HR processes.',
    'إدارة شاملة للموظفين والرواتب مع تتبع الأداء وأتمتة عمليات الموارد البشرية.',
    '👥',
    'hr',
    '["Employee records management", "Payroll automation", "Performance tracking", "Leave management", "Recruitment tools"]',
    '["إدارة سجلات الموظفين", "أتمتة الرواتب", "تتبع الأداء", "إدارة الإجازات", "أدوات التوظيف"]',
    true,
    5
),
(
    'Reports & Analytics',
    'التقارير والتحليلات',
    'Smart reports and interactive dashboards that transform data into actionable insights for better decision-making.',
    'تقارير ذكية ولوحات تحكم تفاعلية تحول البيانات إلى رؤى عملية لاتخاذ قرارات أفضل.',
    '📊',
    'analytics',
    '["Custom report generation", "Interactive dashboards", "Data visualization", "Real-time analytics", "Export capabilities"]',
    '["إنشاء تقارير مخصصة", "لوحات تحكم تفاعلية", "تصور البيانات", "تحليلات الوقت الفعلي", "قدرات التصدير"]',
    true,
    6
);

-- ================================================
-- 3. DEFAULT PORTFOLIO PROJECTS
-- ================================================
INSERT INTO portfolio_projects (title_en, title_ar, description_en, description_ar, client_name_en, client_name_ar, category, status, technologies, features_en, features_ar, project_duration, completion_date, is_featured, sort_order)
VALUES 
(
    'Advanced Warehouse Management System',
    'نظام إدارة المستودعات المتقدم',
    'Comprehensive warehouse management solution with real-time inventory tracking, automated workflows, and integration with existing ERP systems.',
    'حل شامل لإدارة المستودعات مع تتبع المخزون في الوقت الفعلي، وسير العمل التلقائي، والتكامل مع أنظمة تخطيط موارد المؤسسات الحالية.',
    'Major Distribution Company',
    'شركة التوزيع الكبرى',
    'inventory',
    'completed',
    '["Oracle Database 19c", "Oracle APEX", "PL/SQL", "REST APIs", "JavaScript"]',
    '["Real-time inventory tracking", "Automated reorder points", "Barcode integration", "Multi-location support", "Performance analytics"]',
    '["تتبع المخزون في الوقت الفعلي", "نقاط إعادة الطلب التلقائية", "تكامل الباركود", "دعم المواقع المتعددة", "تحليلات الأداء"]',
    '8 months',
    '2023-09-15',
    true,
    1
),
(
    'Customer Relationship Management Platform',
    'منصة إدارة علاقات العملاء',
    'Sophisticated CRM system with sales pipeline management, customer communication tracking, and advanced analytics for sales performance.',
    'نظام CRM متطور مع إدارة مسار المبيعات، وتتبع التواصل مع العملاء، والتحليلات المتقدمة لأداء المبيعات.',
    'Technology Solutions Inc.',
    'شركة الحلول التكنولوجية المحدودة',
    'crm',
    'completed',
    '["Oracle Database 21c", "Oracle Forms", "Oracle Reports", "Web Services"]',
    '["Sales pipeline management", "Customer communication history", "Lead scoring", "Sales forecasting", "Mobile access"]',
    '["إدارة مسار المبيعات", "تاريخ التواصل مع العملاء", "تقييم العملاء المحتملين", "توقعات المبيعات", "الوصول عبر الهاتف المحمول"]',
    '6 months',
    '2023-07-20',
    true,
    2
),
(
    'Integrated HR Management System',
    'نظام إدارة الموارد البشرية المتكامل',
    'Complete HR solution covering employee lifecycle from recruitment to retirement, with payroll integration and performance management.',
    'حل موارد بشرية كامل يغطي دورة حياة الموظف من التوظيف إلى التقاعد، مع تكامل الرواتب وإدارة الأداء.',
    'Financial Services Group',
    'مجموعة الخدمات المالية',
    'hr',
    'completed',
    '["Oracle Database 19c", "Oracle Analytics Cloud", "PL/SQL", "JSON"]',
    '["Employee self-service portal", "Automated payroll processing", "Performance appraisals", "Leave management", "Recruitment tracking"]',
    '["بوابة الخدمة الذاتية للموظفين", "معالجة الرواتب التلقائية", "تقييمات الأداء", "إدارة الإجازات", "تتبع التوظيف"]',
    '10 months',
    '2023-11-30',
    true,
    3
),
(
    'Advanced Financial Management Suite',
    'مجموعة الإدارة المالية المتقدمة',
    'Comprehensive financial management system with automated accounting, budgeting, and real-time financial reporting capabilities.',
    'نظام إدارة مالية شامل مع المحاسبة التلقائية والميزانية وقدرات التقارير المالية في الوقت الفعلي.',
    'Food Industries Corporation',
    'شركة الصناعات الغذائية',
    'finance',
    'completed',
    '["Oracle Database 21c", "Oracle APEX", "Machine Learning", "REST APIs"]',
    '["Automated journal entries", "Budget vs actual analysis", "Cash flow forecasting", "Multi-currency support", "Audit trails"]',
    '["إدخالات اليومية التلقائية", "تحليل الميزانية مقابل الفعلي", "توقعات التدفق النقدي", "دعم العملات المتعددة", "مسارات التدقيق"]',
    '12 months',
    '2023-12-15',
    true,
    4
),
(
    'Smart Project Management System',
    'نظام إدارة المشاريع الذكي',
    'Intelligent project management platform with resource allocation, timeline tracking, and collaborative tools for project teams.',
    'منصة ذكية لإدارة المشاريع مع تخصيص الموارد، وتتبع الجدول الزمني، وأدوات التعاون لفرق المشروع.',
    'Construction & Engineering Ltd.',
    'شركة الإنشاءات والهندسة المحدودة',
    'project_management',
    'in_progress',
    '["Oracle Database 19c", "Oracle APEX", "Oracle Analytics", "Web Services"]',
    '["Resource scheduling", "Gantt chart visualization", "Budget tracking", "Risk management", "Team collaboration"]',
    '["جدولة الموارد", "تصور مخطط جانت", "تتبع الميزانية", "إدارة المخاطر", "تعاون الفريق"]',
    '9 months',
    '2024-03-30',
    false,
    5
),
(
    'Smart Manufacturing System',
    'نظام التصنيع الذكي',
    'IoT-enabled manufacturing management system with real-time production monitoring, quality control, and predictive maintenance.',
    'نظام إدارة التصنيع المدعوم بإنترنت الأشياء مع مراقبة الإنتاج في الوقت الفعلي، ومراقبة الجودة، والصيانة التنبؤية.',
    'Industrial Machinery Factory',
    'مصنع الآلات الصناعية',
    'manufacturing',
    'planned',
    '["Oracle Database 21c", "IoT Integration", "Machine Learning", "Real-time Analytics"]',
    '["Real-time production monitoring", "Quality control automation", "Predictive maintenance", "Equipment efficiency tracking", "Supply chain integration"]',
    '["مراقبة الإنتاج في الوقت الفعلي", "أتمتة مراقبة الجودة", "الصيانة التنبؤية", "تتبع كفاءة المعدات", "تكامل سلسلة التوريد"]',
    '14 months',
    '2024-08-30',
    false,
    6
);

-- ================================================
-- 4. DEFAULT CONTENT SECTIONS
-- ================================================
INSERT INTO content_sections (section_name, title_en, title_ar, content_en, content_ar, content_type, category, is_active)
VALUES 
(
    'hero_main_title',
    'Custom Oracle Database Solutions',
    'حلول Oracle Database المخصصة',
    'Professional custom applications built on Oracle Database to streamline your business operations and drive growth through innovative technology solutions.',
    'تطبيقات مخصصة احترافية مبنية على قاعدة بيانات Oracle لتحسين عمليات شركتك ودفع النمو من خلال حلول تكنولوجية مبتكرة.',
    'text',
    'home',
    true
),
(
    'company_description',
    'About Active Soft',
    'عن شركة Active Soft',
    'We are Oracle Database specialists with 15+ years of experience in developing custom business applications. We help businesses transform their operations through innovative database solutions that enhance productivity and drive sustainable growth.',
    'نحن متخصصون في قواعد بيانات Oracle مع أكثر من 15 عام من الخبرة في تطوير تطبيقات الأعمال المخصصة. نساعد الشركات في تحويل عملياتها من خلال حلول قواعد البيانات المبتكرة التي تعزز الإنتاجية وتدفع النمو المستدام.',
    'text',
    'about',
    true
),
(
    'contact_information',
    'Contact Details',
    'بيانات التواصل',
    '{"email": "info@activesoft.com", "support_email": "support@activesoft.com", "phone_support": "+20 1225077433", "phone_sales": "+20 1006467081", "address": "Sadat City, Menoufia, Egypt", "working_hours": "Sun-Thu: 9:00 AM - 6:00 PM"}',
    '{"email": "info@activesoft.com", "support_email": "support@activesoft.com", "phone_support": "+20 1225077433", "phone_sales": "+20 1006467081", "address": "مدينة السادات، المنوفية، مصر", "working_hours": "الأحد-الخميس: 9:00 ص - 6:00 م"}',
    'json',
    'contact',
    true
),
(
    'services_overview',
    'Our Database Solutions',
    'حلول قواعد البيانات',
    'We provide comprehensive Oracle Database solutions including custom application development, system integration, performance optimization, database migration, and ongoing support to ensure your business operations run smoothly and efficiently.',
    'نقدم حلول Oracle Database شاملة تشمل تطوير التطبيقات المخصصة، تكامل الأنظمة، تحسين الأداء، ترحيل قواعد البيانات، والدعم المستمر لضمان تشغيل عمليات شركتك بسلاسة وكفاءة.',
    'text',
    'services',
    true
);

-- ================================================
-- 5. DEFAULT COMPANY SETTINGS
-- ================================================
INSERT INTO company_settings (setting_key, setting_value, setting_type, category, description_en, description_ar, is_public)
VALUES 
('company_name', 'Active Soft', 'string', 'general', 'Company name', 'اسم الشركة', true),
('company_tagline_en', 'Oracle Database Solutions Specialists', 'string', 'general', 'Company tagline in English', 'شعار الشركة بالإنجليزية', true),
('company_tagline_ar', 'متخصصون في حلول Oracle Database', 'string', 'general', 'Company tagline in Arabic', 'شعار الشركة بالعربية', true),
('contact_email', 'info@activesoft.com', 'string', 'contact', 'Main contact email', 'البريد الإلكتروني الرئيسي', true),
('support_email', 'support@activesoft.com', 'string', 'contact', 'Support email', 'بريد الدعم الفني', true),
('phone_support', '+20 1225077433', 'string', 'contact', 'Support phone number', 'رقم هاتف الدعم الفني', true),
('phone_sales', '+20 1006467081', 'string', 'contact', 'Sales phone number', 'رقم هاتف المبيعات', true),
('company_address', 'Sadat City, Menoufia, Egypt', 'string', 'contact', 'Company address', 'عنوان الشركة', true),
('working_hours', 'Sun-Thu: 9:00 AM - 6:00 PM', 'string', 'contact', 'Working hours', 'ساعات العمل', true),
('years_experience', '15', 'number', 'general', 'Years of experience', 'سنوات الخبرة', true),
('completed_projects', '50', 'number', 'general', 'Number of completed projects', 'عدد المشاريع المكتملة', true)
ON CONFLICT (setting_key) DO NOTHING;