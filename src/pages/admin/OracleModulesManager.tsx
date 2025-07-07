import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleTable from '../../components/SimpleTable';

interface OracleModule {
  id: string;
  name: string;
  category: 'ERP Cloud' | 'HCM Cloud' | 'EPM Cloud' | 'SCM Cloud' | 'CX Cloud' | 'Analytics Cloud';
  description: string;
  features: string[];
  benefits: string[];
  implementationTime: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Enterprise';
  prerequisites: string[];
  integrationPoints: string[];
  pricing: {
    type: 'Subscription' | 'License' | 'Custom';
    startingPrice: string;
    currency: 'SAR' | 'USD';
  };
  supportedIndustries: string[];
  oracleDocUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const OracleModulesManager = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<OracleModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<OracleModule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<OracleModule | null>(null);
  const [formData, setFormData] = useState<OracleModule>({
    id: '',
    name: '',
    category: 'ERP Cloud',
    description: '',
    features: [],
    benefits: [],
    implementationTime: '',
    complexity: 'Medium',
    prerequisites: [],
    integrationPoints: [],
    pricing: {
      type: 'Subscription',
      startingPrice: '',
      currency: 'SAR'
    },
    supportedIndustries: [],
    oracleDocUrl: '',
    isActive: true,
    createdAt: '',
    updatedAt: ''
  });
  const [filters, setFilters] = useState({
    category: 'all',
    complexity: 'all',
    active: 'all'
  });

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    loadModules();
  }, [navigate]);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [modules, filters]);

  const loadModules = () => {
    const savedModules = localStorage.getItem('oracleModules');
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    } else {
      // Initialize with Oracle Cloud modules
      const defaultModules: OracleModule[] = [
        {
          id: 'financials-cloud',
          name: 'Oracle Financials Cloud',
          category: 'ERP Cloud',
          description: 'Complete financial management solution with accounting, procurement, project management, and risk management capabilities.',
          features: [
            'General Ledger and Accounting',
            'Accounts Payable and Receivable', 
            'Cash Management',
            'Fixed Assets Management',
            'Financial Reporting and Analytics',
            'Procurement and Sourcing',
            'Project Portfolio Management'
          ],
          benefits: [
            'Real-time financial visibility',
            'Automated accounting processes',
            'Enhanced compliance and controls',
            'Improved cash flow management',
            'Streamlined procurement processes'
          ],
          implementationTime: '4-8 months',
          complexity: 'High',
          prerequisites: [
            'Chart of Accounts definition',
            'Business process documentation',
            'Data migration strategy',
            'User training plan'
          ],
          integrationPoints: [
            'Oracle HCM Cloud',
            'Oracle SCM Cloud',
            'Oracle Analytics Cloud',
            'Third-party banking systems',
            'Legacy ERP systems'
          ],
          pricing: {
            type: 'Subscription',
            startingPrice: '300',
            currency: 'USD'
          },
          supportedIndustries: [
            'Manufacturing',
            'Oil & Gas',
            'Government',
            'Healthcare',
            'Financial Services',
            'Retail'
          ],
          oracleDocUrl: 'https://docs.oracle.com/en/cloud/saas/financials/',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'hcm-cloud',
          name: 'Oracle HCM Cloud',
          category: 'HCM Cloud',
          description: 'Comprehensive human capital management solution covering the complete employee lifecycle from hire to retire.',
          features: [
            'Core HR and Global HR',
            'Talent Management',
            'Workforce Management',
            'Payroll Processing',
            'Benefits Administration',
            'Learning Management',
            'Performance Management'
          ],
          benefits: [
            'Enhanced employee experience',
            'Improved talent retention',
            'Automated HR processes',
            'Better workforce analytics',
            'Compliance with local regulations'
          ],
          implementationTime: '3-6 months',
          complexity: 'Medium',
          prerequisites: [
            'HR organizational structure',
            'Employee data cleanup',
            'Payroll requirements definition',
            'Benefits configuration'
          ],
          integrationPoints: [
            'Oracle Financials Cloud',
            'Oracle Analytics Cloud',
            'Third-party payroll systems',
            'Time tracking systems',
            'Learning management systems'
          ],
          pricing: {
            type: 'Subscription',
            startingPrice: '25',
            currency: 'USD'
          },
          supportedIndustries: [
            'All Industries',
            'Government',
            'Healthcare',
            'Education',
            'Manufacturing'
          ],
          oracleDocUrl: 'https://docs.oracle.com/en/cloud/saas/human-resources/',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'scm-cloud',
          name: 'Oracle SCM Cloud',
          category: 'SCM Cloud',
          description: 'End-to-end supply chain management solution with planning, execution, and logistics capabilities.',
          features: [
            'Supply Chain Planning',
            'Inventory Management',
            'Order Management',
            'Manufacturing Cloud',
            'Logistics and Transportation',
            'Product Lifecycle Management',
            'Supplier Management'
          ],
          benefits: [
            'Optimized inventory levels',
            'Improved supply chain visibility',
            'Reduced operational costs',
            'Enhanced supplier collaboration',
            'Better demand forecasting'
          ],
          implementationTime: '6-12 months',
          complexity: 'Enterprise',
          prerequisites: [
            'Item master data setup',
            'Supplier database',
            'Warehouse configuration',
            'Manufacturing processes definition'
          ],
          integrationPoints: [
            'Oracle Financials Cloud',
            'Oracle Analytics Cloud',
            'Third-party logistics systems',
            'Manufacturing execution systems',
            'E-commerce platforms'
          ],
          pricing: {
            type: 'Subscription',
            startingPrice: '400',
            currency: 'USD'
          },
          supportedIndustries: [
            'Manufacturing',
            'Retail',
            'Automotive',
            'Aerospace',
            'Consumer Goods'
          ],
          oracleDocUrl: 'https://docs.oracle.com/en/cloud/saas/supply-chain-management/',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setModules(defaultModules);
      localStorage.setItem('oracleModules', JSON.stringify(defaultModules));
    }
  };

  const applyFilters = () => {
    let filtered = [...modules];

    if (filters.category !== 'all') {
      filtered = filtered.filter(module => module.category === filters.category);
    }

    if (filters.complexity !== 'all') {
      filtered = filtered.filter(module => module.complexity === filters.complexity);
    }

    if (filters.active !== 'all') {
      const isActive = filters.active === 'active';
      filtered = filtered.filter(module => module.isActive === isActive);
    }

    setFilteredModules(filtered);
  };

  const saveModules = (updatedModules: OracleModule[]) => {
    setModules(updatedModules);
    localStorage.setItem('oracleModules', JSON.stringify(updatedModules));
  };

  const handleCreate = () => {
    setEditingModule(null);
    setFormData({
      id: '',
      name: '',
      category: 'ERP Cloud',
      description: '',
      features: [],
      benefits: [],
      implementationTime: '',
      complexity: 'Medium',
      prerequisites: [],
      integrationPoints: [],
      pricing: {
        type: 'Subscription',
        startingPrice: '',
        currency: 'SAR'
      },
      supportedIndustries: [],
      oracleDocUrl: '',
      isActive: true,
      createdAt: '',
      updatedAt: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (module: OracleModule) => {
    setEditingModule(module);
    setFormData(module);
    setIsModalOpen(true);
  };

  const handleDelete = (module: OracleModule) => {
    if (window.confirm(`Are you sure you want to delete "${module.name}"?`)) {
      const updatedModules = modules.filter(m => m.id !== module.id);
      saveModules(updatedModules);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const moduleData = {
      ...formData,
      id: editingModule ? editingModule.id : generateId(),
      createdAt: editingModule ? editingModule.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedModules;
    if (editingModule) {
      updatedModules = modules.map(m => m.id === editingModule.id ? moduleData : m);
    } else {
      updatedModules = [...modules, moduleData];
    }

    saveModules(updatedModules);
    setIsModalOpen(false);
    setEditingModule(null);
  };

  const generateId = () => {
    return Date.now().toString();
  };

  const addArrayItem = (field: keyof Pick<OracleModule, 'features' | 'benefits' | 'prerequisites' | 'integrationPoints' | 'supportedIndustries'>, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: keyof Pick<OracleModule, 'features' | 'benefits' | 'prerequisites' | 'integrationPoints' | 'supportedIndustries'>, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleArrayInput = (field: keyof Pick<OracleModule, 'features' | 'benefits' | 'prerequisites' | 'integrationPoints' | 'supportedIndustries'>, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addArrayItem(field, (e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const toggleStatus = (module: OracleModule) => {
    const updatedModules = modules.map(m => 
      m.id === module.id ? { ...m, isActive: !m.isActive, updatedAt: new Date().toISOString() } : m
    );
    saveModules(updatedModules);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Enterprise': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ERP Cloud': return '💼';
      case 'HCM Cloud': return '👥';
      case 'SCM Cloud': return '🏭';
      case 'EPM Cloud': return '📊';
      case 'CX Cloud': return '🤝';
      case 'Analytics Cloud': return '📈';
      default: return '☁️';
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Module Information',
      render: (value: string, row: OracleModule) => (
        <div className="flex items-start space-x-3">
          <span className="text-2xl">{getCategoryIcon(row.category)}</span>
          <div>
            <div className="font-semibold text-gray-800">{value}</div>
            <div className="text-sm text-gray-500">{row.category}</div>
            <div className="text-xs text-gray-400 mt-1">
              {row.description.substring(0, 80)}...
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'complexity',
      header: 'Complexity',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(value)}`}>
          {value}
        </span>
      )
    },
    {
      key: 'implementationTime',
      header: 'Implementation',
      render: (value: string) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-800">{value}</div>
          <div className="text-xs text-gray-500">Timeline</div>
        </div>
      )
    },
    {
      key: 'pricing',
      header: 'Pricing',
      render: (value: OracleModule['pricing']) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-800">
            {value.startingPrice} {value.currency}
          </div>
          <div className="text-xs text-gray-500">{value.type}</div>
        </div>
      )
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (value: boolean, row: OracleModule) => (
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
    }
  ];

  const categories = ['ERP Cloud', 'HCM Cloud', 'SCM Cloud', 'EPM Cloud', 'CX Cloud', 'Analytics Cloud'];
  const complexityLevels = ['Low', 'Medium', 'High', 'Enterprise'];
  const pricingTypes = ['Subscription', 'License', 'Custom'];
  const currencies = ['SAR', 'USD'];

  const stats = {
    total: modules.length,
    active: modules.filter(m => m.isActive).length,
    byCategory: categories.map(cat => ({
      name: cat,
      count: modules.filter(m => m.category === cat).length
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">☁️</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Oracle Modules Manager</h1>
                <p className="text-gray-600">Manage Oracle Cloud module catalog and configurations</p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center"
            >
              <span className="mr-2">➕</span>
              Add Oracle Module
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
                <p className="text-sm text-gray-600">Total Modules</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-3xl">☁️</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Modules</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
              </div>
              <div className="text-3xl">📂</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm font-semibold text-gray-800">
                  {modules.length > 0 
                    ? new Date(Math.max(...modules.map(m => new Date(m.updatedAt).getTime()))).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complexity</label>
              <select
                value={filters.complexity}
                onChange={(e) => setFilters({...filters, complexity: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Complexity Levels</option>
                {complexityLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.active}
                onChange={(e) => setFilters({...filters, active: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modules Table */}
        <SimpleTable
          columns={columns}
          data={filteredModules}
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
                  {editingModule ? 'Edit Oracle Module' : 'Add New Oracle Module'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as OracleModule['category']})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Implementation Time
                      </label>
                      <input
                        type="text"
                        value={formData.implementationTime}
                        onChange={(e) => setFormData({...formData, implementationTime: e.target.value})}
                        placeholder="e.g., 3-6 months"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complexity
                      </label>
                      <select
                        value={formData.complexity}
                        onChange={(e) => setFormData({...formData, complexity: e.target.value as OracleModule['complexity']})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      >
                        {complexityLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Pricing Information</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pricing Type
                      </label>
                      <select
                        value={formData.pricing.type}
                        onChange={(e) => setFormData({
                          ...formData,
                          pricing: { ...formData.pricing, type: e.target.value as OracleModule['pricing']['type'] }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      >
                        {pricingTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

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
                        placeholder="100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={formData.pricing.currency}
                        onChange={(e) => setFormData({
                          ...formData,
                          pricing: { ...formData.pricing, currency: e.target.value as OracleModule['pricing']['currency'] }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      >
                        {currencies.map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Oracle Documentation URL
                    </label>
                    <input
                      type="url"
                      value={formData.oracleDocUrl}
                      onChange={(e) => setFormData({...formData, oracleDocUrl: e.target.value})}
                      placeholder="https://docs.oracle.com/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Arrays Section */}
              <div className="mt-8 space-y-6">
                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Features (Press Enter to add)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter feature and press Enter"
                    onKeyDown={(e) => handleArrayInput('features', e)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent mb-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', index)}
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
                    Business Benefits (Press Enter to add)
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
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#04968d] text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                >
                  {editingModule ? 'Update Module' : 'Create Module'} ✅
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OracleModulesManager;