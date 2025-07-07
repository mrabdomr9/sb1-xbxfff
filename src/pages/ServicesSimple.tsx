import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../hooks/useSupabase';

const ServicesSimple = () => {
  const { t, isRTL } = useLanguage();
  const { data: servicesFromDB, loading: servicesLoading, error: servicesError } = useServices();

  useEffect(() => {
    trackPageView('/services');
  }, []);

  // Fallback services if database is not available
  const fallbackServices = [
    {
      id: 'custom',
      icon: '⚙️',
      title: t('services.custom.title'),
      description: t('services.custom.desc'),
      features: isRTL ? [
        'تطبيقات مخصصة حسب المتطلبات',
        'واجهات مستخدم متطورة',
        'تكامل مع الأنظمة الموجودة',
        'تقارير وتحليلات متقدمة',
        'أمان وحماية عالية'
      ] : [
        'Tailored Applications to Requirements',
        'Modern User Interfaces',
        'Integration with Existing Systems',
        'Advanced Reports & Analytics',
        'High Security & Protection'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'crm',
      icon: '🤝',
      title: t('services.crm.title'),
      description: t('services.crm.desc'),
      features: isRTL ? [
        'إدارة معلومات العملاء',
        'تتبع المبيعات والفرص',
        'تقارير وتحليلات العملاء',
        'إدارة الحملات التسويقية',
        'خدمة العملاء المتقدمة'
      ] : [
        'Customer Information Management',
        'Sales & Opportunity Tracking',
        'Customer Reports & Analytics',
        'Marketing Campaign Management',
        'Advanced Customer Service'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'inventory',
      icon: '📦',
      title: t('services.inventory.title'),
      description: t('services.inventory.desc'),
      features: isRTL ? [
        'تتبع المخزون في الوقت الفعلي',
        'إدارة المشتريات والموردين',
        'تقارير المخزون والحركة',
        'تنبيهات نقص المخزون',
        'تحليل كلفة البضائع'
      ] : [
        'Real-time Inventory Tracking',
        'Purchase & Supplier Management',
        'Inventory & Movement Reports',
        'Low Stock Alerts',
        'Cost of Goods Analysis'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'financial',
      icon: '💰',
      title: t('services.financial.title'),
      description: t('services.financial.desc'),
      features: isRTL ? [
        'إدارة الحسابات والدفاتر',
        'التقارير المالية المتقدمة',
        'إدارة الفواتير والدفع',
        'تحليل الربحية والتكاليف',
        'الموازنة والتخطيط المالي'
      ] : [
        'Accounts & Ledger Management',
        'Advanced Financial Reporting',
        'Invoice & Payment Management',
        'Profitability & Cost Analysis',
        'Budgeting & Financial Planning'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'hr',
      icon: '👥',
      title: t('services.hr.title'),
      description: t('services.hr.desc'),
      features: isRTL ? [
        'إدارة ملفات الموظفين',
        'نظام الرواتب والحوافز',
        'إدارة الحضور والانصراف',
        'تقييم الأداء والتطوير',
        'التوظيف وإدارة المواهب'
      ] : [
        'Employee Records Management',
        'Payroll & Incentives System',
        'Attendance Management',
        'Performance & Development',
        'Recruitment & Talent Management'
      ],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'reporting',
      icon: '📊',
      title: t('services.reporting.title'),
      description: t('services.reporting.desc'),
      features: isRTL ? [
        'لوحات تحكم تفاعلية',
        'تقارير مخصصة ومرنة',
        'تحليل البيانات المتقدم',
        'التقارير الآلية والمجدولة',
        'تصدير وطباعة متقدمة'
      ] : [
        'Interactive Dashboards',
        'Custom Flexible Reports',
        'Advanced Data Analytics',
        'Automated Scheduled Reports',
        'Advanced Export & Printing'
      ],
      color: 'from-gray-500 to-gray-600'
    }
  ];

  // Transform database services to match component format
  const transformDatabaseServices = (dbServices: any[]) => {
    return dbServices.map((service, index) => ({
      id: service.id,
      icon: service.icon || '⚙️',
      title: isRTL ? service.name_ar : service.name_en,
      description: isRTL ? service.description_ar : service.description_en,
      features: service.features_en ? JSON.parse(isRTL ? service.features_ar : service.features_en) : [],
      color: getColorForIndex(index)
    }));
  };

  // Helper function to get gradient color based on index
  const getColorForIndex = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-indigo-500 to-indigo-600',
      'from-gray-500 to-gray-600'
    ];
    return colors[index % colors.length];
  };

  // Use database services if available, otherwise fallback to static services
  const services = servicesFromDB && !servicesLoading && !servicesError 
    ? transformDatabaseServices(servicesFromDB) 
    : fallbackServices;

  const industries = isRTL ? [
    { name: 'التصنيع والتوزيع', icon: '🏭' },
    { name: 'الخدمات المالية', icon: '🏦' },
    { name: 'الرعاية الصحية', icon: '🏥' },
    { name: 'الحكومة والقطاع العام', icon: '🏛️' },
    { name: 'التجارة الإلكترونية', icon: '🛒' },
    { name: 'الطاقة والمرافق', icon: '⚡' }
  ] : [
    { name: 'Manufacturing & Distribution', icon: '🏭' },
    { name: 'Financial Services', icon: '🏦' },
    { name: 'Healthcare & Pharma', icon: '🏥' },
    { name: 'Government & Public Sector', icon: '🏛️' },
    { name: 'Retail & E-commerce', icon: '🛒' },
    { name: 'Energy & Utilities', icon: '⚡' }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#213c4d] via-[#2a4f63] to-[#04968d] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Loading State */}
          {servicesLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04968d]"></div>
              <span className="ml-3 text-gray-600">{isRTL ? 'جاري تحميل الخدمات...' : 'Loading services...'}</span>
            </div>
          )}

          {/* Error State */}
          {servicesError && (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <span className="text-red-600">
                  {isRTL ? 'خطأ في تحميل الخدمات. سيتم عرض الخدمات الافتراضية.' : 'Error loading services. Showing default services.'}
                </span>
              </div>
            </div>
          )}

          {/* Services Grid */}
          {!servicesLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                {/* Service Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <span className="text-4xl">{service.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <p className={`text-gray-600 mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className={`text-lg font-semibold text-gray-800 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'المميزات الرئيسية:' : 'Key Features:'}
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className={`flex items-center space-x-2 text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}>
                          <span className="w-2 h-2 bg-[#04968d] rounded-full flex-shrink-0"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/contact"
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <span>{isRTL ? 'اطلب استشارة' : 'Request Consultation'}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#213c4d] mb-4">
              {isRTL ? 'الصناعات التي نخدمها' : 'Industries We Serve'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isRTL 
                ? 'خبرتنا الواسعة تمتد عبر مختلف القطاعات والصناعات'
                : 'Our extensive expertise spans across various sectors and industries'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className={`font-semibold text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {industry.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#213c4d] to-[#04968d] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {isRTL ? 'لماذا تختار Active Soft؟' : 'Why Choose Active Soft?'}
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {isRTL 
                ? 'نحن شريكك الموثوق في رحلة التحول الرقمي مع Oracle ERP'
                : 'We are your trusted partner in Oracle ERP digital transformation journey'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏆',
                title: isRTL ? 'خبرة معتمدة' : 'Certified Expertise',
                desc: isRTL ? 'فريق معتمد من Oracle' : 'Oracle Certified Team'
              },
              {
                icon: '⚡',
                title: isRTL ? 'تطبيق سريع' : 'Fast Implementation',
                desc: isRTL ? 'تطبيق في وقت قياسي' : 'Record Time Deployment'
              },
              {
                icon: '💎',
                title: isRTL ? 'جودة عالية' : 'Premium Quality',
                desc: isRTL ? 'معايير عالية في التنفيذ' : 'High Standards Delivery'
              },
              {
                icon: '🤝',
                title: isRTL ? 'دعم مستمر' : 'Ongoing Support',
                desc: isRTL ? 'دعم ما بعد التطبيق' : 'Post-Implementation Support'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-200">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#213c4d] mb-6">
              {isRTL ? 'جاهز لبدء مشروع Oracle ERP؟' : 'Ready to Start Your Oracle ERP Project?'}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {isRTL 
                ? 'تواصل معنا اليوم للحصول على استشارة مجانية'
                : 'Contact us today for a free consultation'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#04968d] to-[#037f72] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                {isRTL ? 'اطلب استشارة مجانية' : 'Get Free Consultation'}
              </Link>
              <Link
                to="/clients"
                className="border-2 border-[#04968d] text-[#04968d] px-8 py-4 rounded-xl font-semibold hover:bg-[#04968d] hover:text-white transition-all duration-300"
              >
                {isRTL ? 'شاهد مشاريعنا' : 'View Our Projects'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSimple;