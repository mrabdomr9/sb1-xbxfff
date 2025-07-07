import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleTable from '../../components/SimpleTable';
import SimpleFileUpload from '../../components/SimpleFileUpload';

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

const ServicesManagerPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Service>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    icon: '🔧',
    modules: [],
    benefits: [],
    deliverables: [],
    timeline: '',
    targetIndustries: [],
    methodologySteps: [],
    pricing: {
      startingPrice: '',
      factors: []
    },
    successMetrics: [],
    color: 'from-blue-500 to-blue-700',
    isActive: true,
    createdAt: '',
    updatedAt: ''
  });
  const [currentStep, setCurrentStep] = useState(1);

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    loadServices();
  }, [navigate]);

  const loadServices = () => {
    // Load from localStorage or initialize with demo data
    const savedServices = localStorage.getItem('oracleServices');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Initialize with demo Oracle services
      const demoServices: Service[] = [
        {
          id: 'implementation',
          title: 'Oracle ERP Cloud Implementation',
          subtitle: 'Complete Enterprise Resource Planning Solution',
          description: 'End-to-end Oracle ERP Cloud implementation covering all business processes from financial management to supply chain operations.',
          icon: '🔧',
          modules: ['Oracle Financials Cloud', 'Oracle Supply Chain Management', 'Oracle Human Capital Management'],
          benefits: ['Real-time financial visibility', 'Streamlined business processes', 'Improved compliance'],
          deliverables: ['Complete system configuration', 'Data migration and validation', 'User training and documentation'],
          timeline: '6-12 months',
          targetIndustries: ['Manufacturing', 'Oil & Gas', 'Healthcare'],
          methodologySteps: ['Requirements Analysis', 'Solution Design', 'Implementation', 'Testing', 'Go-Live'],
          pricing: {
            startingPrice: 'Contact for Quote',
            factors: ['Number of users', 'Modules required', 'Customization complexity']
          },
          successMetrics: ['40% reduction in close time', '60% improvement in reporting', '35% decrease in costs'],
          color: 'from-blue-500 to-blue-700',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'migration',
          title: 'Oracle Cloud Migration Services',
          subtitle: 'Seamless Migration to Oracle Cloud',
          description: 'Expert migration services from legacy Oracle systems or other ERP platforms to Oracle Cloud.',
          icon: '☁️',
          modules: ['Oracle EBS to Cloud Migration', 'Database Migration Services', 'Cloud Infrastructure Setup'],
          benefits: ['Reduced IT infrastructure costs', 'Automatic updates', 'Enhanced scalability'],
          deliverables: ['Migration strategy', 'Data mapping', 'Cloud environment setup'],
          timeline: '4-8 months',
          targetIndustries: ['All Industries', 'Existing Oracle Users'],
          methodologySteps: ['Assessment', 'Strategy Development', 'Migration', 'Testing', 'Cutover'],
          pricing: {
            startingPrice: 'Varies by complexity',
            factors: ['Data volume', 'System complexity', 'Customizations']
          },
          successMetrics: ['99.9% data accuracy', 'Minimal downtime', '30% IT cost reduction'],
          color: 'from-green-500 to-green-700',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setServices(demoServices);
      localStorage.setItem('oracleServices', JSON.stringify(demoServices));
    }
  };

  const saveServices = (updatedServices: Service[]) => {
    setServices(updatedServices);
    localStorage.setItem('oracleServices', JSON.stringify(updatedServices));
  };

  const handleCreate = () => {
    setEditingService(null);
    setFormData({
      id: '',
      title: '',
      subtitle: '',
      description: '',
      icon: '🔧',
      modules: [],
      benefits: [],
      deliverables: [],
      timeline: '',
      targetIndustries: [],
      methodologySteps: [],
      pricing: {
        startingPrice: '',
        factors: []
      },
      successMetrics: [],
      color: 'from-blue-500 to-blue-700',
      isActive: true,
      createdAt: '',
      updatedAt: ''
    });
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const handleDelete = (service: Service) => {
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      const updatedServices = services.filter(s => s.id !== service.id);
      saveServices(updatedServices);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      id: editingService ? editingService.id : generateId(),
      createdAt: editingService ? editingService.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedServices;
    if (editingService) {
      updatedServices = services.map(s => s.id === editingService.id ? serviceData : s);
    } else {
      updatedServices = [...services, serviceData];
    }

    saveServices(updatedServices);
    setIsModalOpen(false);
    setEditingService(null);
  };

  const generateId = () => {
    return Date.now().toString();
  };

  const addArrayItem = (field: string, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof Service] as string[]), value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof Service] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleArrayInput = (field: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addArrayItem(field, (e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const toggleStatus = (service: Service) => {
    const updatedServices = services.map(s => 
      s.id === service.id ? { ...s, isActive: !s.isActive, updatedAt: new Date().toISOString() } : s
    );
    saveServices(updatedServices);
  };

  const columns = [
    {
      key: 'icon',
      header: 'Icon',
      render: (value: string) => <span className="text-2xl">{value}</span>
    },
    {
      key: 'title',
      header: 'Service Title',
      render: (value: string, row: Service) => (
        <div>
          <div className="font-semibold text-gray-800">{value}</div>
          <div className="text-sm text-gray-500">{row.subtitle}</div>
        </div>
      )
    },
    {
      key: 'timeline',
      header: 'Timeline',
      render: (value: string) => (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{value}</span>
      )
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (value: boolean, row: Service) => (
        <button
          onClick={() => toggleStatus(row)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            value
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          {value ? 'Active' : 'Inactive'}
        </button>
      )
    },
    {
      key: 'updatedAt',
      header: 'Last Updated',
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const iconOptions = ['🔧', '☁️', '🛠️', '📈', '💻', '🌐', '🔒', '📊', '⚡', '🎯'];
  const colorOptions = [
    { label: 'Blue', value: 'from-blue-500 to-blue-700' },
    { label: 'Green', value: 'from-green-500 to-green-700' },
    { label: 'Purple', value: 'from-purple-500 to-purple-700' },
    { label: 'Orange', value: 'from-orange-500 to-orange-700' },
    { label: 'Red', value: 'from-red-500 to-red-700' },
    { label: 'Teal', value: 'from-teal-500 to-teal-700' }
  ];

  const modalSteps = [
    { number: 1, title: 'Basic Information', icon: '📝' },
    { number: 2, title: 'Details & Lists', icon: '📋' },
    { number: 3, title: 'Methodology & Pricing', icon: '💰' },
    { number: 4, title: 'Review & Save', icon: '✅' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🔧</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Services Manager</h1>
                <p className="text-gray-600">Manage Oracle ERP services and offerings</p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center"
            >
              <span className="mr-2">➕</span>
              Add New Service
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-800">{services.length}</p>
              </div>
              <div className="text-3xl">🔧</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-green-600">{services.filter(s => s.isActive).length}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive Services</p>
                <p className="text-2xl font-bold text-red-600">{services.filter(s => !s.isActive).length}</p>
              </div>
              <div className="text-3xl">❌</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm font-semibold text-gray-800">
                  {services.length > 0 
                    ? new Date(Math.max(...services.map(s => new Date(s.updatedAt).getTime()))).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <SimpleTable
          columns={columns}
          data={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#04968d] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Steps */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                {modalSteps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentStep === step.number
                        ? 'bg-white/20'
                        : currentStep > step.number
                        ? 'bg-white/10'
                        : 'opacity-50'
                    }`}
                  >
                    <span className="text-lg">{step.icon}</span>
                    <span className="hidden md:block">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle *
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {iconOptions.map((icon) => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => setFormData({...formData, icon})}
                            className={`p-3 text-2xl border rounded-lg transition-colors ${
                              formData.icon === icon
                                ? 'border-[#04968d] bg-[#04968d]/10'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color Scheme
                      </label>
                      <div className="space-y-2">
                        {colorOptions.map((color) => (
                          <label key={color.value} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="color"
                              value={color.value}
                              checked={formData.color === color.value}
                              onChange={(e) => setFormData({...formData, color: e.target.value})}
                              className="text-[#04968d]"
                            />
                            <div className={`w-8 h-4 bg-gradient-to-r ${color.value} rounded`}></div>
                            <span>{color.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      placeholder="e.g., 6-12 months"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Details & Lists */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Details & Lists</h3>
                  
                  {/* Modules */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Oracle Modules (Press Enter to add)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter module name and press Enter"
                      onKeyDown={(e) => handleArrayInput('modules', e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.modules.map((module, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {module}
                          <button
                            type="button"
                            onClick={() => removeArrayItem('modules', index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Benefits (Press Enter to add)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter benefit and press Enter"
                      onKeyDown={(e) => handleArrayInput('benefits', e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {benefit}
                          <button
                            type="button"
                            onClick={() => removeArrayItem('benefits', index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deliverables (Press Enter to add)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter deliverable and press Enter"
                      onKeyDown={(e) => handleArrayInput('deliverables', e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.deliverables.map((deliverable, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {deliverable}
                          <button
                            type="button"
                            onClick={() => removeArrayItem('deliverables', index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Industries */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Industries (Press Enter to add)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter industry and press Enter"
                      onKeyDown={(e) => handleArrayInput('targetIndustries', e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.targetIndustries.map((industry, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {industry}
                          <button
                            type="button"
                            onClick={() => removeArrayItem('targetIndustries', index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Methodology & Pricing */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Methodology & Pricing</h3>
                  
                  {/* Methodology Steps */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Methodology Steps (Press Enter to add)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter methodology step and press Enter"
                      onKeyDown={(e) => handleArrayInput('methodologySteps', e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                    />
                    <div className="space-y-2">
                      {formData.methodologySteps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="bg-[#04968d] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeArrayItem('methodologySteps', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Starting Price
                      </label>
                      <input
                        type="text"
                        value={formData.pricing.startingPrice}
                        onChange={(e) => setFormData({
                          ...formData,
                          pricing: { ...formData.pricing, startingPrice: e.target.value }
                        })}
                        placeholder="e.g., SAR 150,000 or Contact for Quote"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Pricing Factors */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pricing Factors (Press Enter to add)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pricing factor and press Enter"
                      onKeyDown={(e) => handleArrayInput('pricing.factors', e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.pricing.factors.map((factor, index) => (
                        <span
                          key={index}
                          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {factor}
                          <button
                            type="button"
                            onClick={() => {
                              const updatedFactors = formData.pricing.factors.filter((_, i) => i !== index);
                              setFormData({
                                ...formData,
                                pricing: { ...formData.pricing, factors: updatedFactors }
                              });
                            }}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Success Metrics */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Success Metrics (Press Enter to add)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter success metric and press Enter"
                      onKeyDown={(e) => handleArrayInput('successMetrics', e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.successMetrics.map((metric, index) => (
                        <span
                          key={index}
                          className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {metric}
                          <button
                            type="button"
                            onClick={() => removeArrayItem('successMetrics', index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Review & Save</h3>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <span className="text-4xl">{formData.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-gray-800">{formData.title}</h4>
                        <p className="text-lg text-gray-600 mb-4">{formData.subtitle}</p>
                        <p className="text-gray-700 mb-4">{formData.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-2">Modules ({formData.modules.length})</h5>
                            <div className="text-sm text-gray-600">
                              {formData.modules.slice(0, 3).map((module, index) => (
                                <div key={index}>• {module}</div>
                              ))}
                              {formData.modules.length > 3 && <div>• +{formData.modules.length - 3} more...</div>}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-2">Benefits ({formData.benefits.length})</h5>
                            <div className="text-sm text-gray-600">
                              {formData.benefits.slice(0, 3).map((benefit, index) => (
                                <div key={index}>• {benefit}</div>
                              ))}
                              {formData.benefits.length > 3 && <div>• +{formData.benefits.length - 3} more...</div>}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Timeline:</span>
                            <span className="font-semibold">{formData.timeline}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Starting Price:</span>
                            <span className="font-semibold">{formData.pricing.startingPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      ← Previous
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  {currentStep < modalSteps.length ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-3 bg-[#04968d] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#04968d] text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                    >
                      {editingService ? 'Update Service' : 'Create Service'} ✅
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagerPage;