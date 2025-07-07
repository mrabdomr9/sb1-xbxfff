import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  createdAt: string;
  updatedAt: string;
}

const PortfolioManagementPage = () => {
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadPortfolioItems();
  }, []);

  const loadPortfolioItems = () => {
    const savedItems = localStorage.getItem('portfolio_items');
    if (savedItems) {
      setPortfolioItems(JSON.parse(savedItems));
    }
  };

  const savePortfolioItems = (items: PortfolioItem[]) => {
    localStorage.setItem('portfolio_items', JSON.stringify(items));
    setPortfolioItems(items);
  };

  const handleAddNew = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: '',
      category: '',
      description: '',
      technologies: [],
      features: [],
      duration: '',
      client: '',
      image: '💼',
      status: 'planned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedItem(newItem);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleView = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      const updatedItems = portfolioItems.filter(item => item.id !== itemId);
      savePortfolioItems(updatedItems);
    }
  };

  const handleSave = (item: PortfolioItem) => {
    const updatedItem = {
      ...item,
      updatedAt: new Date().toISOString()
    };

    const existingIndex = portfolioItems.findIndex(p => p.id === item.id);
    let updatedItems: PortfolioItem[];
    
    if (existingIndex >= 0) {
      updatedItems = [...portfolioItems];
      updatedItems[existingIndex] = updatedItem;
    } else {
      updatedItems = [...portfolioItems, updatedItem];
    }

    savePortfolioItems(updatedItems);
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
            </div>
            <button
              onClick={handleAddNew}
              className="bg-[#04968d] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#037f72] transition-colors"
            >
              + Add New Portfolio Item
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{portfolioItems.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {portfolioItems.filter(item => item.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">🔄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ongoing</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {portfolioItems.filter(item => item.status === 'ongoing').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Planned</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {portfolioItems.filter(item => item.status === 'planned').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Items Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Portfolio Items</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {portfolioItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{item.image}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit/View */}
      {isModalOpen && selectedItem && (
        <PortfolioModal
          item={selectedItem}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

// Portfolio Modal Component
interface PortfolioModalProps {
  item: PortfolioItem;
  isEditing: boolean;
  onSave: (item: PortfolioItem) => void;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState<PortfolioItem>(item);
  const [technologiesInput, setTechnologiesInput] = useState(item.technologies.join(', '));
  const [featuresInput, setFeaturesInput] = useState(item.features.join('\n'));

  const handleSave = () => {
    const updatedItem = {
      ...formData,
      technologies: technologiesInput.split(',').map(t => t.trim()).filter(t => t),
      features: featuresInput.split('\n').map(f => f.trim()).filter(f => f)
    };
    onSave(updatedItem);
  };

  const handleInputChange = (field: keyof PortfolioItem, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {isEditing ? (item.id === formData.id ? 'Edit Portfolio Item' : 'Add Portfolio Item') : 'View Portfolio Item'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{formData.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.client}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.duration}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              {isEditing ? (
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                >
                  <option value="planned">Planned</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              ) : (
                <p className="text-gray-900 capitalize">{formData.status}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
            {isEditing ? (
              <input
                type="text"
                value={technologiesInput}
                onChange={(e) => setTechnologiesInput(e.target.value)}
                placeholder="Oracle Database, Oracle APEX, PL/SQL, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
            {isEditing ? (
              <textarea
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                rows={5}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              />
            ) : (
              <ul className="space-y-1">
                {formData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#04968d] rounded-full"></span>
                    <span className="text-gray-900">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {isEditing ? 'Cancel' : 'Close'}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#04968d] text-white rounded-md hover:bg-[#037f72]"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagementPage;