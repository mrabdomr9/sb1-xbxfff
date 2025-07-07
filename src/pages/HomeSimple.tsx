import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { trackPageView } from '../utils/analytics';

const HomeSimple = () => {
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    trackPageView('/');
  }, []);

  const heroSlides = [
    {
      title: t('home.title'),
      subtitle: t('home.subtitle'),
      description: isRTL 
        ? "تطوير تطبيقات مخصصة باستخدام قاعدة بيانات Oracle لتلبية احتياجات شركتك المحددة وتحسين العمليات التجارية."
        : "Developing custom applications using Oracle Database to meet your specific business requirements and optimize business processes.",
      image: "🗃️",
      cta: t('home.cta')
    },
    {
      title: isRTL ? "أنظمة إدارة الأعمال المخصصة" : "Custom Business Management Systems",
      subtitle: isRTL ? "حلول تناسب احتياجاتك" : "Solutions Tailored to Your Needs",
      description: isRTL
        ? "تطوير أنظمة شاملة لإدارة المخزون والعملاء والموارد البشرية والمحاسبة مبنية على Oracle Database بتقنيات حديثة."
        : "Developing comprehensive systems for inventory, customer, HR, and accounting management built on Oracle Database with modern technologies.",
      image: "⚙️",
      cta: isRTL ? "استكشف الحلول المخصصة" : "Explore Custom Solutions"
    },
    {
      title: isRTL ? "تقارير وتحليلات متقدمة" : "Advanced Reports & Analytics",
      subtitle: isRTL ? "اتخاذ قرارات مبنية على البيانات" : "Data-Driven Decision Making",
      description: isRTL
        ? "أنظمة تقارير وتحليلات قوية مبنية على Oracle Database تحول البيانات إلى رؤى عملية لاتخاذ قرارات أفضل."
        : "Powerful reporting and analytics systems built on Oracle Database that transform data into actionable insights for better decision-making.",
      image: "📊",
      cta: isRTL ? "اكتشف حلول التحليل" : "Discover Analytics Solutions"
    }
  ];

  const keyFeatures = [
    isRTL ? 'حلول Oracle Database مخصصة ومبتكرة' : 'Custom & Innovative Oracle Database Solutions',
    isRTL ? 'خبرة 15 عاماً في تطوير التطبيقات' : '15 Years of Application Development Excellence',
    isRTL ? 'متخصصون في Oracle Database' : 'Oracle Database Specialists'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section with Slider */}
      <section className="relative bg-gradient-to-br from-[#213c4d] via-[#2a4f63] to-[#04968d] text-white min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-8 h-8 border-2 border-white rounded-lg"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div className={`space-y-8 ${isRTL ? 'lg:order-2' : ''}`}>
              <div className="space-y-2">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <span className="w-2 h-2 bg-[#04968d] rounded-full"></span>
                    <span className="text-sm text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                  {heroSlides[currentSlide].title}
                </h1>
                
                <h2 className={`text-xl lg:text-2xl text-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {heroSlides[currentSlide].subtitle}
                </h2>
                
                <p className={`text-lg text-gray-300 leading-relaxed max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
                  {heroSlides[currentSlide].description}
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Link 
                  to="/services"
                  className="bg-white text-[#213c4d] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 text-center"
                >
                  {heroSlides[currentSlide].cta}
                </Link>
                <Link 
                  to="/portfolio"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#213c4d] transition-all duration-300 text-center"
                >
                  {isRTL ? 'شاهد أعمالنا السابقة' : 'View Our Portfolio'}
                </Link>
              </div>

              {/* Slide Indicators */}
              <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all"
                >
                  {isRTL ? '→' : '←'}
                </button>
                
                <div className="flex space-x-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all"
                >
                  {isRTL ? '←' : '→'}
                </button>
              </div>
            </div>

            {/* Visual Element */}
            <div className={`relative ${isRTL ? 'lg:order-1' : ''}`}>
              <div className="relative w-full max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-9xl mb-8 animate-pulse">
                    {heroSlides[currentSlide].image}
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-xs text-gray-200">{isRTL ? 'مشروع مكتمل' : 'Projects'}</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">15+</div>
                        <div className="text-xs text-gray-200">{isRTL ? 'سنة خبرة' : 'Years'}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-200">
                        {isRTL ? 'تطبيقات مخصصة على Oracle Database' : 'Custom Oracle Database Applications'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#213c4d] mb-6">
              {isRTL ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isRTL 
                ? 'نقدم حلول Oracle Database مخصصة تلبي احتياجات شركتك المحددة'
                : 'We provide custom Oracle Database solutions that meet your specific business requirements'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚙️',
                title: isRTL ? 'تطبيقات أعمال مخصصة' : 'Custom Business Applications',
                description: isRTL 
                  ? 'تطبيقات مصممة خصيصاً لتلبية احتياجاتك'
                  : 'Applications designed specifically for your needs'
              },
              {
                icon: '🤝',
                title: isRTL ? 'أنظمة إدارة العملاء' : 'Customer Management Systems',
                description: isRTL 
                  ? 'حلول CRM متطورة لإدارة علاقات العملاء'
                  : 'Advanced CRM solutions for customer relationship management'
              },
              {
                icon: '📦',
                title: isRTL ? 'أنظمة إدارة المخزون' : 'Inventory Management Systems',
                description: isRTL 
                  ? 'تتبع وإدارة المخزون بكفاءة عالية'
                  : 'Efficient inventory tracking and management'
              },
              {
                icon: '💰',
                title: isRTL ? 'أنظمة الإدارة المالية' : 'Financial Management Systems',
                description: isRTL 
                  ? 'حلول محاسبية شاملة ومتقدمة'
                  : 'Comprehensive and advanced accounting solutions'
              },
              {
                icon: '👥',
                title: isRTL ? 'أنظمة الموارد البشرية' : 'Human Resources Systems',
                description: isRTL 
                  ? 'إدارة شاملة للموظفين والرواتب'
                  : 'Comprehensive employee and payroll management'
              },
              {
                icon: '📊',
                title: isRTL ? 'تقارير وتحليلات' : 'Reports & Analytics',
                description: isRTL 
                  ? 'تقارير ذكية ولوحات تحكم تفاعلية'
                  : 'Smart reports and interactive dashboards'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className={`text-xl font-semibold text-[#213c4d] mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {service.title}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/services"
              className="bg-[#04968d] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#037f72] transition-all duration-300 shadow-lg"
            >
              {isRTL ? 'تعرف على جميع الخدمات' : 'Explore All Services'}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#213c4d] mb-6">
              {isRTL ? 'لماذا تختار Active Soft؟' : 'Why Choose Active Soft?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: isRTL ? 'حلول مخصصة' : 'Custom Solutions',
                description: isRTL ? 'تطبيقات مصممة خصيصاً لاحتياجاتك' : 'Applications designed specifically for your needs'
              },
              {
                icon: '⚡',
                title: isRTL ? 'أداء عالي' : 'High Performance',
                description: isRTL ? 'استخدام أحدث تقنيات Oracle Database' : 'Using latest Oracle Database technologies'
              },
              {
                icon: '🛡️',
                title: isRTL ? 'أمان متقدم' : 'Advanced Security',
                description: isRTL ? 'حماية قوية للبيانات والمعلومات' : 'Strong data and information protection'
              },
              {
                icon: '🤝',
                title: isRTL ? 'دعم مستمر' : 'Continuous Support',
                description: isRTL ? 'دعم فني شامل ومستمر' : 'Comprehensive and continuous technical support'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#213c4d] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#213c4d] mb-6">
              {isRTL ? 'أعمالنا السابقة' : 'Our Previous Work'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isRTL 
                ? 'تصفح أمثلة من المشاريع التي نفذناها بنجاح لعملائنا'
                : 'Browse examples of projects we have successfully implemented for our clients'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📦',
                title: isRTL ? 'نظام إدارة المستودعات' : 'Warehouse Management System',
                client: isRTL ? 'شركة التوزيع الكبرى' : 'Major Distribution Company',
                tech: 'Oracle Database 19c, APEX'
              },
              {
                icon: '🤝',
                title: isRTL ? 'نظام إدارة العملاء' : 'Customer Management System',
                client: isRTL ? 'شركة التكنولوجيا' : 'Technology Company',
                tech: 'Oracle Database, Forms'
              },
              {
                icon: '👥',
                title: isRTL ? 'نظام الموارد البشرية' : 'HR Management System',
                client: isRTL ? 'مجموعة الخدمات المالية' : 'Financial Services Group',
                tech: 'Oracle Database 21c, Analytics'
              }
            ].map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4 text-center">{project.icon}</div>
                <h3 className={`text-lg font-semibold text-[#213c4d] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {project.title}
                </h3>
                <p className={`text-gray-600 text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {project.client}
                </p>
                <div className="text-xs text-[#04968d] font-medium">
                  {project.tech}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/portfolio"
              className="bg-[#04968d] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#037f72] transition-all duration-300 shadow-lg"
            >
              {isRTL ? 'شاهد جميع الأعمال' : 'View All Portfolio'}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#213c4d] to-[#04968d] text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              {isRTL ? 'هل تحتاج حل مخصص لشركتك؟' : 'Need a Custom Solution for Your Business?'}
            </h2>
            <p className="text-xl text-gray-200 mb-10">
              {isRTL 
                ? 'تواصل معنا اليوم لمناقشة مشروعك والحصول على استشارة مجانية'
                : 'Contact us today to discuss your project and get a free consultation'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link
                to="/contact"
                className="bg-white text-[#213c4d] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                {isRTL ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#213c4d] transition-all duration-300"
              >
                {isRTL ? 'شاهد أعمالنا السابقة' : 'View Our Previous Work'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSimple;