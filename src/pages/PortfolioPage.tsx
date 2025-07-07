import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackPageView } from '../utils/analytics';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  duration: string;
  client: string;
  image: string;
  status: 'completed' | 'ongoing' | 'planned';
}

const PortfolioPage = () => {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    trackPageView('/portfolio');
    loadPortfolioItems();
  }, []);

  const loadPortfolioItems = () => {
    // Load from localStorage (admin can manage these)
    const savedItems = localStorage.getItem('portfolio_items');
    if (savedItems) {
      setPortfolioItems(JSON.parse(savedItems));
    } else {
      // Default portfolio items
      const defaultItems: PortfolioItem[] = [
        {
          id: '1',
          title: isRTL ? 'نظام إدارة المستودعات المتقدم' : 'Advanced Warehouse Management System',
          category: isRTL ? 'إدارة المخزون' : 'Inventory Management',
          description: isRTL 
            ? 'نظام شامل لإدارة المستودعات مع تتبع المخزون في الوقت الفعلي وإدارة الباركود'
            : 'Comprehensive warehouse management system with real-time inventory tracking and barcode management',
          technologies: ['Oracle Database 19c', 'Oracle APEX', 'PL/SQL', 'REST APIs'],
          features: isRTL ? [
            'تتبع المخزون في الوقت الفعلي',
            'إدارة الباركود والمسح الضوئي',
            'تقارير المخزون التفاعلية',
            'إدارة المواقع المتعددة',
            'تكامل مع أنظمة المحاسبة'
          ] : [
            'Real-time inventory tracking',
            'Barcode scanning & management',
            'Interactive inventory reports',
            'Multi-location management',
            'Accounting system integration'
          ],
          duration: isRTL ? '6 أشهر' : '6 months',
          client: isRTL ? 'شركة التوزيع الكبرى' : 'Major Distribution Company',
          image: '📦',
          status: 'completed'
        },
        {
          id: '2',
          title: isRTL ? 'نظام إدارة علاقات العملاء' : 'Customer Relationship Management System',
          category: isRTL ? 'إدارة العملاء' : 'Customer Management',
          description: isRTL
            ? 'نظام CRM متطور لإدارة العملاء والمبيعات مع تحليلات متقدمة'
            : 'Advanced CRM system for customer and sales management with advanced analytics',
          technologies: ['Oracle Database', 'Oracle Forms', 'Oracle Reports', 'PL/SQL'],
          features: isRTL ? [
            'إدارة بيانات العملاء الشاملة',
            'تتبع الفرص والمبيعات',
            'تقارير المبيعات التفاعلية',
            'إدارة الحملات التسويقية',
            'خدمة العملاء المتقدمة'
          ] : [
            'Comprehensive customer data management',
            'Opportunity & sales tracking',
            'Interactive sales reports',
            'Marketing campaign management',
            'Advanced customer service'
          ],
          duration: isRTL ? '4 أشهر' : '4 months',
          client: isRTL ? 'شركة التكنولوجيا المتقدمة' : 'Advanced Technology Company',
          image: '🤝',
          status: 'completed'
        },
        {
          id: '3',
          title: isRTL ? 'نظام الموارد البشرية المتكامل' : 'Integrated Human Resources System',
          category: isRTL ? 'الموارد البشرية' : 'Human Resources',
          description: isRTL
            ? 'نظام HR شامل يغطي جميع جوانب إدارة الموظفين من التوظيف إلى التقاعد'
            : 'Comprehensive HR system covering all aspects of employee management from hiring to retirement',
          technologies: ['Oracle Database 21c', 'Oracle APEX', 'Oracle Analytics Cloud'],
          features: isRTL ? [
            'إدارة ملفات الموظفين',
            'نظام الرواتب الآلي',
            'إدارة الحضور والإجازات',
            'تقييم الأداء الإلكتروني',
            'التوظيف والتدريب'
          ] : [
            'Employee records management',
            'Automated payroll system',
            'Attendance & leave management',
            'Electronic performance evaluation',
            'Recruitment & training'
          ],
          duration: isRTL ? '8 أشهر' : '8 months',
          client: isRTL ? 'مجموعة الخدمات المالية' : 'Financial Services Group',
          image: '👥',
          status: 'completed'
        },
        {
          id: '4',
          title: isRTL ? 'نظام الإدارة المالية المتقدم' : 'Advanced Financial Management System',
          category: isRTL ? 'الإدارة المالية' : 'Financial Management',
          description: isRTL
            ? 'نظام محاسبي شامل مع تقارير مالية متقدمة وتحليل الربحية'
            : 'Comprehensive accounting system with advanced financial reports and profitability analysis',
          technologies: ['Oracle Database', 'Oracle BI Publisher', 'PL/SQL', 'Oracle Forms'],
          features: isRTL ? [
            'نظام الحسابات العامة',
            'إدارة الفواتير والدفعات',
            'التقارير المالية الآلية',
            'تحليل التكاليف والربحية',
            'الموازنة والتخطيط المالي'
          ] : [
            'General ledger system',
            'Invoice & payment management',
            'Automated financial reports',
            'Cost & profitability analysis',
            'Budget & financial planning'
          ],
          duration: isRTL ? '5 أشهر' : '5 months',
          client: isRTL ? 'شركة الصناعات الغذائية' : 'Food Industries Company',
          image: '💰',
          status: 'completed'
        },
        {
          id: '5',
          title: isRTL ? 'نظام إدارة المشاريع الذكي' : 'Smart Project Management System',
          category: isRTL ? 'إدارة المشاريع' : 'Project Management',
          description: isRTL
            ? 'نظام متطور لإدارة المشاريع مع تتبع الوقت والموارد والميزانيات'
            : 'Advanced project management system with time, resource, and budget tracking',
          technologies: ['Oracle Database', 'Oracle APEX', 'Oracle Analytics', 'REST APIs'],
          features: isRTL ? [
            'تخطيط وجدولة المشاريع',
            'تتبع الوقت والمهام',
            'إدارة الموارد والفرق',
            'مراقبة الميزانيات',
            'تقارير الأداء التفاعلية'
          ] : [
            'Project planning & scheduling',
            'Time & task tracking',
            'Resource & team management',
            'Budget monitoring',
            'Interactive performance reports'
          ],
          duration: isRTL ? '7 أشهر' : '7 months',
          client: isRTL ? 'شركة الإنشاءات الكبرى' : 'Major Construction Company',
          image: '🏗️',
          status: 'ongoing'
        },
        {
          id: '6',
          title: isRTL ? 'نظام إدارة التصنيع الذكي' : 'Smart Manufacturing Management System',
          category: isRTL ? 'التصنيع' : 'Manufacturing',
          description: isRTL
            ? 'نظام إنتاج متقدم لإدارة خطوط الإنتاج والجودة والصيانة'
            : 'Advanced production system for managing production lines, quality, and maintenance',
          technologies: ['Oracle Database', 'Oracle IoT Cloud', 'PL/SQL', 'Machine Learning'],
          features: isRTL ? [
            'إدارة خطوط الإنتاج',
            'مراقبة الجودة الآلية',
            'جدولة الصيانة الذكية',
            'تتبع المواد الخام',
            'تحليل الكفاءة الإنتاجية'
          ] : [
            'Production line management',
            'Automated quality control',
            'Smart maintenance scheduling',
            'Raw material tracking',
            'Production efficiency analysis'
          ],
          duration: isRTL ? '10 أشهر' : '10 months',
          client: isRTL ? 'مصنع الآلات الصناعية' : 'Industrial Machinery Factory',
          image: '🏭',
          status: 'planned'
        }
      ];
      
      setPortfolioItems(defaultItems);
      localStorage.setItem('portfolio_items', JSON.stringify(defaultItems));
    }
  };

  const categories = [
    { key: 'all', label: isRTL ? 'جميع المشاريع' : 'All Projects' },
    { key: 'Inventory Management', label: isRTL ? 'إدارة المخزون' : 'Inventory Management' },
    { key: 'Customer Management', label: isRTL ? 'إدارة العملاء' : 'Customer Management' },
    { key: 'Human Resources', label: isRTL ? 'الموارد البشرية' : 'Human Resources' },
    { key: 'Financial Management', label: isRTL ? 'الإدارة المالية' : 'Financial Management' },
    { key: 'Project Management', label: isRTL ? 'إدارة المشاريع' : 'Project Management' },
    { key: 'Manufacturing', label: isRTL ? 'التصنيع' : 'Manufacturing' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return isRTL ? 'مكتمل' : 'Completed';
      case 'ongoing': return isRTL ? 'قيد التنفيذ' : 'Ongoing';
      case 'planned': return isRTL ? 'مخطط' : 'Planned';
      default: return status;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#213c4d] via-[#2a4f63] to-[#04968d] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              {t('portfolio.title')}
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              {t('portfolio.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-[#04968d] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                {/* Project Header */}
                <div className="bg-gradient-to-r from-[#213c4d] to-[#04968d] p-6 text-white">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span className="text-3xl">{item.image}</span>
                      <div>
                        <h3 className={`text-lg font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-gray-200 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {item.description}
                  </p>

                  {/* Client & Duration */}
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className={`text-sm font-semibold text-gray-800 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {isRTL ? 'العميل:' : 'Client:'}
                      </h4>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {item.client}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold text-gray-800 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {isRTL ? 'المدة:' : 'Duration:'}
                      </h4>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {item.duration}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold text-gray-800 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'التقنيات المستخدمة:' : 'Technologies Used:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold text-gray-800 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'المميزات الرئيسية:' : 'Key Features:'}
                    </h4>
                    <ul className="space-y-1">
                      {item.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className={`flex items-center space-x-2 text-xs text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}>
                          <span className="w-1 h-1 bg-[#04968d] rounded-full flex-shrink-0"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {item.features.length > 3 && (
                        <li className={`text-xs text-gray-500 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                          {isRTL ? `+${item.features.length - 3} مميزات أخرى` : `+${item.features.length - 3} more features`}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#213c4d] to-[#04968d] text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              {isRTL ? 'هل لديك مشروع مماثل؟' : 'Do You Have a Similar Project?'}
            </h2>
            <p className="text-xl text-gray-200 mb-10">
              {isRTL 
                ? 'تواصل معنا لمناقشة مشروعك وكيف يمكننا مساعدتك في تطوير حل مخصص'
                : 'Contact us to discuss your project and how we can help you develop a custom solution'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href="/contact"
                className="bg-white text-[#213c4d] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                {isRTL ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#213c4d] transition-all duration-300"
              >
                {isRTL ? 'تعرف على خدماتنا' : 'Explore Our Services'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;