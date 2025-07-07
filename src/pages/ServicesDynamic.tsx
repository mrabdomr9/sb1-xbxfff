import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackPageView, trackServiceView } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  modules: string[];
  benefits: string[];
  deliverables: string[];
  timeline: string;
  targetIndustries: string[];
  methodologySteps: string[];
  pricing: {
    startingPrice: string;
    factors: string[];
  };
  successMetrics: string[];
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const ServicesDynamic = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
    
    // Track page view
    trackPageView('services', {
      title: 'Oracle ERP Services Portfolio',
      description: 'Comprehensive Oracle ERP solutions and implementation services'
    });
  }, []);

  const loadServices = () => {
    setIsLoading(true);
    // Load from localStorage
    const savedServices = localStorage.getItem('oracleServices');
    if (savedServices) {
      const parsedServices = JSON.parse(savedServices);
      const activeServices = parsedServices.filter((service: Service) => service.isActive);
      setServices(activeServices);
      if (activeServices.length > 0) {
        setActiveService(activeServices[0].id);
      }
    } else {
      // Fallback to default services if none exist
      const defaultServices: Service[] = [
        {
          id: 'implementation',
          title: 'Oracle ERP Cloud Implementation',
          subtitle: 'Complete Enterprise Resource Planning Solution',
          description: 'End-to-end Oracle ERP Cloud implementation covering all business processes from financial management to supply chain operations, designed specifically for Saudi enterprises.',
          icon: '🔧',
          modules: [
            'Oracle Financials Cloud',
            'Oracle Supply Chain Management',
            'Oracle Human Capital Management',
            'Oracle Project Portfolio Management',
            'Oracle Risk Management',
            'Oracle Analytics Cloud'
          ],
          benefits: [
            'Real-time financial visibility and reporting',
            'Streamlined business processes across departments',
            'Improved compliance with Saudi regulations',
            'Enhanced data security and audit trails',
            'Mobile access for key business functions',
            'Integration with existing systems'
          ],
          deliverables: [
            'Complete system configuration',
            'Data migration and validation',
            'Custom reports and dashboards',
            'User training and documentation',
            'Go-live support and optimization',
            'Post-implementation support plan'
          ],
          timeline: '6-12 months',
          targetIndustries: ['Manufacturing', 'Oil & Gas', 'Healthcare', 'Government', 'Retail', 'Construction'],
          methodologySteps: [
            'Business Requirements Analysis',
            'Solution Architecture Design',
            'System Configuration & Development',
            'Data Migration & Testing',
            'User Training & Change Management',
            'Go-Live & Optimization'
          ],
          pricing: {
            startingPrice: 'Contact for Quote',
            factors: ['Number of users', 'Modules required', 'Customization complexity', 'Integration requirements']
          },
          successMetrics: [
            '40% reduction in month-end close time',
            '60% improvement in reporting accuracy',
            '35% decrease in operational costs',
            '50% faster procurement processes'
          ],
          color: 'from-blue-500 to-blue-700',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'migration',
          title: 'Oracle Cloud Migration Services',
          subtitle: 'Seamless Migration to Oracle Cloud',
          description: 'Expert migration services from legacy Oracle systems or other ERP platforms to Oracle Cloud, ensuring minimal business disruption and maximum data integrity.',
          icon: '☁️',
          modules: [
            'Oracle EBS to Cloud Migration',
            'Third-party ERP Migration',
            'Database Migration Services',
            'Application Modernization',
            'Cloud Infrastructure Setup',
            'Security Implementation'
          ],
          benefits: [
            'Reduced IT infrastructure costs',
            'Automatic updates and maintenance',
            'Enhanced scalability and performance',
            'Improved disaster recovery capabilities',
            'Access to latest Oracle innovations',
            'Simplified IT management'
          ],
          deliverables: [
            'Migration strategy and roadmap',
            'Data mapping and cleansing',
            'Cloud environment setup',
            'Application migration and testing',
            'Performance optimization',
            'Cutover and rollback plans'
          ],
          timeline: '4-8 months',
          targetIndustries: ['All Industries', 'Existing Oracle Users', 'Legacy System Users'],
          methodologySteps: [
            'Current State Assessment',
            'Migration Strategy Development',
            'Cloud Environment Preparation',
            'Data Migration & Validation',
            'Application Testing & Optimization',
            'Cutover & Go-Live Support'
          ],
          pricing: {
            startingPrice: 'Varies by complexity',
            factors: ['Data volume', 'System complexity', 'Customizations', 'Downtime requirements']
          },
          successMetrics: [
            '99.9% data migration accuracy',
            'Minimal business downtime',
            '30% reduction in IT costs',
            'Improved system performance'
          ],
          color: 'from-green-500 to-green-700',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setServices(defaultServices);
      setActiveService(defaultServices[0].id);
      localStorage.setItem('oracleServices', JSON.stringify(defaultServices));
    }
    setIsLoading(false);
  };

  const currentService = services.find(service => service.id === activeService) || services[0];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'modules', label: 'Modules', icon: '🔧' },
    { id: 'methodology', label: 'Methodology', icon: '📊' },
    { id: 'pricing', label: 'Pricing', icon: '💰' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#04968d] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Oracle ERP services...</p>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-6xl mb-6">🔧</div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Services Coming Soon</h1>
            <p className="text-xl text-gray-600 mb-8">
              Our Oracle ERP services are being updated. Please check back soon or contact us directly.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
            >
              Contact Us for Details
              <span className="ml-2">📞</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#04968d]/10 text-[#04968d] px-6 py-3 rounded-full mb-6">
            <span className="text-lg font-medium">🏆 Oracle Platinum Partner Services</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Enterprise Oracle ERP Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Transform your business with comprehensive Oracle ERP Cloud services. From implementation to optimization, 
            we deliver enterprise-grade solutions that streamline operations and boost productivity.
          </p>
          
          {/* Live indicator */}
          <div className="mt-6 inline-flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>{services.length} active services • Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Service Selector */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setActiveService(service.id);
                trackServiceView(service.id, service.title);
              }}
              className={`p-6 rounded-xl transition-all duration-300 text-left transform hover:scale-105 ${
                activeService === service.id
                  ? `bg-gradient-to-br ${service.color} text-white shadow-xl`
                  : 'bg-white hover:shadow-lg border border-gray-200'
              }`}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className={`text-lg font-bold mb-2 ${
                activeService === service.id ? 'text-white' : 'text-gray-800'
              }`}>
                {service.title}
              </h3>
              <p className={`text-sm ${
                activeService === service.id ? 'text-white/90' : 'text-gray-600'
              }`}>
                {service.subtitle}
              </p>
              
              {/* Service indicators */}
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeService === service.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {service.modules.length} modules
                </span>
                <span className={`text-xs ${
                  activeService === service.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {service.timeline}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Service Details */}
        {currentService && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Service Header */}
            <div className={`bg-gradient-to-r ${currentService.color} text-white p-8`}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-5xl">{currentService.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold">{currentService.title}</h2>
                      <p className="text-xl opacity-90">{currentService.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-lg opacity-90 leading-relaxed">
                    {currentService.description}
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <span className="font-semibold">{currentService.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modules:</span>
                      <span className="font-semibold">{currentService.modules.length}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Industries:</span>
                      <span className="font-semibold">{currentService.targetIndustries.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="font-semibold text-sm">
                        {new Date(currentService.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="mt-6 w-full bg-white text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-center block"
                  >
                    Get Free Consultation 📞
                  </Link>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-[#04968d] text-[#04968d] bg-[#04968d]/5'
                        : 'text-gray-600 hover:text-[#04968d]'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Benefits</h3>
                    <div className="space-y-4">
                      {currentService.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-[#04968d] text-xl">✓</span>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold mt-8 mb-6 text-gray-800">Success Metrics</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {currentService.successMetrics.map((metric, index) => (
                        <div key={index} className="bg-green-50 border border-green-200 p-4 rounded-lg">
                          <span className="text-green-800 font-semibold">📈 {metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Deliverables</h3>
                    <div className="space-y-4">
                      {currentService.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-[#04968d] text-xl">📦</span>
                          <span className="text-gray-700">{deliverable}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold mt-8 mb-6 text-gray-800">Target Industries</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {currentService.targetIndustries.map((industry, index) => (
                        <div key={index} className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center">
                          <span className="text-blue-800 font-medium">{industry}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modules Tab */}
              {activeTab === 'modules' && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-gray-800">Oracle ERP Modules & Components</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentService.modules.map((module, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                        <div className="text-3xl mb-3">🔧</div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{module}</h4>
                        <p className="text-gray-600 text-sm">
                          Comprehensive module implementation with full customization and integration capabilities.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Methodology Tab */}
              {activeTab === 'methodology' && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-gray-800">Implementation Methodology</h3>
                  <div className="space-y-6">
                    {currentService.methodologySteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#04968d] text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{step}</h4>
                          <p className="text-gray-600">
                            Detailed phase execution with clear deliverables, milestones, and quality checkpoints to ensure project success.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 bg-[#04968d]/10 rounded-xl p-8">
                    <h4 className="text-xl font-bold text-[#04968d] mb-4">Oracle Approved Methodology</h4>
                    <p className="text-gray-700">
                      Our implementation methodology is based on Oracle's Cloud Adoption Framework and best practices, 
                      ensuring successful project delivery with minimal risk and maximum value realization.
                    </p>
                  </div>
                </div>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-gray-800">Investment & Pricing</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-gradient-to-br from-[#04968d] to-[#037f72] text-white p-8 rounded-xl">
                        <h4 className="text-2xl font-bold mb-4">Starting Investment</h4>
                        <div className="text-4xl font-bold mb-4">{currentService.pricing.startingPrice}</div>
                        <p className="opacity-90">
                          Investment varies based on your specific requirements and business complexity.
                        </p>
                      </div>

                      <div className="mt-6 space-y-4">
                        <h5 className="text-lg font-semibold text-gray-800">What's Included:</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-600">✓</span>
                            <span className="text-gray-700">Complete implementation services</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-600">✓</span>
                            <span className="text-gray-700">Data migration and validation</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-600">✓</span>
                            <span className="text-gray-700">User training and documentation</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-600">✓</span>
                            <span className="text-gray-700">3 months post-go-live support</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 mb-4">Pricing Factors:</h5>
                      <div className="space-y-4">
                        {currentService.pricing.factors.map((factor, index) => (
                          <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                            <span className="text-gray-700">💰 {factor}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-xl">
                        <h5 className="text-lg font-semibold text-blue-800 mb-3">ROI Guarantee</h5>
                        <p className="text-blue-700">
                          We guarantee a minimum 200% ROI within the first year of implementation, 
                          backed by our proven track record and optimization methodology.
                        </p>
                      </div>

                      <div className="mt-6">
                        <Link
                          to="/contact"
                          className="w-full bg-[#04968d] text-white py-4 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block"
                        >
                          Request Detailed Quote 💼
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#213c4d] to-[#04968d] text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our Oracle ERP experts today for a free consultation and discover how we can optimize your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-[#04968d] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Schedule Free Consultation
              <span className="ml-2">📅</span>
            </Link>
            <Link
              to="/brochures"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#04968d] transition-colors font-semibold"
            >
              Download Service Brochures
              <span className="ml-2">📄</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDynamic;