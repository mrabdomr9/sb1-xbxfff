import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';

const HomeOracle = () => {
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);

  // Oracle ERP focused hero slides
  const heroSlides = [
    {
      title: "Enterprise Oracle ERP Solutions",
      subtitle: "Transform Your Business Operations",
      description: "Comprehensive Oracle Cloud ERP implementation that streamlines processes, enhances productivity, and drives business growth across all departments.",
      image: "🏢",
      cta: "Start Your Oracle Journey"
    },
    {
      title: "Oracle Cloud Migration Experts",
      subtitle: "Seamless Digital Transformation",
      description: "Expert migration services from legacy systems to Oracle Cloud ERP, ensuring minimal downtime and maximum business continuity.",
      image: "☁️",
      cta: "Explore Migration Services"
    },
    {
      title: "24/7 Oracle Support & Maintenance",
      subtitle: "Continuous Business Excellence",
      description: "Round-the-clock support for your Oracle ERP systems with proactive monitoring, updates, and optimization services.",
      image: "🛠️",
      cta: "Learn About Support"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Stats animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setStatsStarted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Track page view
  useEffect(() => {
    trackPageView('home', {
      title: 'Oracle ERP Home Page',
      description: 'Main landing page for Oracle ERP services'
    });
  }, []);

  // Oracle ERP specific differentiators
  const differentiators = [
    {
      icon: "🎯",
      title: "Oracle Certified Experts",
      description: "Our team holds official Oracle certifications and extensive experience in ERP implementations across various industries",
      stats: "15+ Oracle Certified Professionals"
    },
    {
      icon: "⚡",
      title: "Rapid Implementation",
      description: "Proven methodology ensures faster Oracle ERP deployment with 40% less implementation time than industry average",
      stats: "6-12 Month Implementation"
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Advanced security protocols and compliance frameworks ensuring your Oracle ERP data is always protected",
      stats: "99.9% Security Uptime"
    },
    {
      icon: "📈",
      title: "ROI Optimization",
      description: "Detailed business process analysis and optimization delivering measurable returns on your Oracle investment",
      stats: "Average 300% ROI"
    }
  ];

  // Oracle ERP modules and features
  const oracleModules = [
    {
      module: "Financial Management",
      description: "Complete financial control with real-time reporting",
      features: ["General Ledger", "Accounts Payable/Receivable", "Fixed Assets", "Cash Management"],
      icon: "💰"
    },
    {
      module: "Supply Chain Management",
      description: "End-to-end supply chain optimization",
      features: ["Inventory Management", "Procurement", "Order Management", "Logistics"],
      icon: "🔗"
    },
    {
      module: "Human Capital Management",
      description: "Comprehensive HR and workforce management",
      features: ["Payroll", "Talent Management", "Performance", "Learning"],
      icon: "👥"
    },
    {
      module: "Project Portfolio Management",
      description: "Project lifecycle management and resource optimization",
      features: ["Project Planning", "Resource Management", "Time Tracking", "Billing"],
      icon: "📊"
    }
  ];

  // Success stories with Oracle focus
  const successStories = [
    {
      client: "Saudi Aramco",
      industry: "Oil & Gas",
      solution: "Oracle Cloud ERP Complete Suite",
      result: "40% reduction in operational costs, 60% faster reporting",
      modules: ["Financials", "SCM", "HCM", "PPM"],
      image: "🛢️",
      timeline: "12 months"
    },
    {
      client: "SABIC",
      industry: "Manufacturing",
      solution: "Oracle Manufacturing Cloud",
      result: "35% improvement in production efficiency",
      modules: ["Manufacturing", "Quality", "Maintenance"],
      image: "🏭",
      timeline: "8 months"
    },
    {
      client: "Almarai",
      industry: "Food & Beverage",
      solution: "Oracle Supply Chain Management",
      result: "50% reduction in inventory costs, improved traceability",
      modules: ["Inventory", "Procurement", "Logistics"],
      image: "🥛",
      timeline: "10 months"
    }
  ];

  const stats = [
    { number: statsStarted ? 200 : 0, label: "Oracle Implementations", suffix: "+" },
    { number: statsStarted ? 15 : 0, label: "Years of Oracle Experience", suffix: "+" },
    { number: statsStarted ? 50 : 0, label: "Oracle Certified Team", suffix: "+" },
    { number: statsStarted ? 99.9 : 0, label: "System Uptime", suffix: "%" }
  ];

  const animateNumber = (target: number, suffix: string) => {
    if (!statsStarted) return `0${suffix}`;
    return `${target}${suffix}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Oracle Focus */}
      <section className="relative bg-gradient-to-br from-[#213c4d] via-[#2a4a5d] to-[#04968d] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#04968d]/30 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <span className="text-sm font-medium">🏆 Oracle Platinum Partner</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                
                <h2 className="text-2xl lg:text-3xl font-light text-blue-100">
                  {heroSlides[currentSlide].subtitle}
                </h2>
                
                <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                  {heroSlides[currentSlide].description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold text-lg transform hover:scale-105 shadow-lg"
                >
                  {heroSlides[currentSlide].cta}
                  <span className="ml-2">🚀</span>
                </Link>
                
                <Link
                  to="/services"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#213c4d] transition-all duration-300 font-semibold text-lg"
                >
                  View Oracle Services
                  <span className="ml-2">🔧</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-[#04968d]">
                      {animateNumber(stat.number, stat.suffix)}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="text-center">
                <div className="text-9xl mb-6 animate-pulse">
                  {heroSlides[currentSlide].image}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-4">Oracle ERP Cloud</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Financials</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>SCM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>HCM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>PPM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#04968d] scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Oracle ERP Differentiators */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Why Choose Active Soft for Oracle ERP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring unmatched expertise in Oracle ERP implementations, delivering enterprise solutions 
              that transform business operations and drive sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-6 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="bg-[#04968d]/10 text-[#04968d] px-4 py-2 rounded-lg text-sm font-semibold text-center">
                  {item.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oracle ERP Modules */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Complete Oracle ERP Cloud Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive Oracle ERP solutions covering all aspects of your business operations 
              with integrated modules and seamless data flow.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {oracleModules.map((module, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-6">
                  <div className="text-5xl">{module.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{module.module}</h3>
                    <p className="text-gray-600 mb-6">{module.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="text-[#04968d]">✓</span>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Link
                        to="/services"
                        className="inline-flex items-center text-[#04968d] hover:text-[#037f72] font-semibold"
                      >
                        Learn More
                        <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oracle Success Stories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Oracle ERP Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from leading Saudi companies who transformed their operations with our Oracle ERP solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{story.image}</div>
                  <h3 className="text-xl font-bold text-gray-800">{story.client}</h3>
                  <p className="text-[#04968d] font-medium">{story.industry}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Solution:</h4>
                    <p className="text-gray-600 text-sm">{story.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Results:</h4>
                    <p className="text-gray-600 text-sm">{story.result}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Modules Implemented:</h4>
                    <div className="flex flex-wrap gap-2">
                      {story.modules.map((module, idx) => (
                        <span
                          key={idx}
                          className="bg-[#04968d]/10 text-[#04968d] px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Timeline: {story.timeline}</span>
                    <Link
                      to="/clients"
                      className="text-[#04968d] hover:text-[#037f72] text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oracle Partnership & Certifications */}
      <section className="py-20 bg-[#213c4d] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Oracle Certified Excellence</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Official Oracle partnership and certifications ensuring the highest quality Oracle ERP implementations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Oracle Platinum Partner</h3>
              <p className="text-gray-200">Highest level of Oracle partnership with proven expertise and customer satisfaction.</p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Certified Specialists</h3>
              <p className="text-gray-200">Oracle Cloud certified professionals with specialized expertise in ERP implementations.</p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Proven Methodology</h3>
              <p className="text-gray-200">Oracle-approved implementation methodology ensuring successful project delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Oracle Tools & Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Oracle ERP Tools & Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our comprehensive suite of Oracle ERP tools, calculators, and knowledge resources to make informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link
              to="/roi-calculator"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                <div className="text-5xl mb-4">🧮</div>
                <h3 className="text-2xl font-bold mb-3">ROI Calculator</h3>
                <p className="opacity-90">
                  Calculate your Oracle ERP return on investment with our advanced financial modeling tool.
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="font-semibold">Start Calculation</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            <Link
              to="/knowledge-base"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-3">Knowledge Base</h3>
                <p className="opacity-90">
                  Access comprehensive Oracle ERP guides, best practices, and troubleshooting resources.
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                  <span className="font-semibold">Explore Resources</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            <Link
              to="/contact"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-8 text-white">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-3">Expert Consultation</h3>
                <p className="opacity-90">
                  Get personalized Oracle ERP consultation from our certified implementation experts.
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
                  <span className="font-semibold">Schedule Consultation</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#04968d] to-[#037f72]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business with Oracle ERP?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading Saudi companies who have already transformed their operations with our Oracle ERP solutions. 
            Get started with a free consultation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-[#04968d] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg transform hover:scale-105 shadow-lg"
            >
              Schedule Free Consultation
              <span className="ml-2">📅</span>
            </Link>
            
            <Link
              to="/brochures"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#04968d] transition-colors font-semibold text-lg"
            >
              Download Oracle ERP Guide
              <span className="ml-2">📄</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeOracle;