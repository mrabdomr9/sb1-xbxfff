import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContentSection {
  id: string;
  name: string;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  type: 'text' | 'html' | 'json';
  category: 'home' | 'services' | 'about' | 'contact' | 'general';
  isActive: boolean;
  lastModified: string;
}

const ContentManagementPage = () => {
  const navigate = useNavigate();
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadContentSections();
  }, []);

  const loadContentSections = () => {
    const savedContent = localStorage.getItem('content_sections');
    if (savedContent) {
      setContentSections(JSON.parse(savedContent));
    } else {
      // Default content sections
      const defaultSections: ContentSection[] = [
        {
          id: '1',
          name: 'Hero Section - Main Title',
          title_en: 'Custom Oracle Database Solutions',
          title_ar: 'حلول Oracle Database المخصصة',
          content_en: 'Professional custom applications built on Oracle Database to streamline your business operations',
          content_ar: 'تطبيقات مخصصة احترافية مبنية على قاعدة بيانات Oracle لتحسين عمليات شركتك',
          type: 'text',
          category: 'home',
          isActive: true,
          lastModified: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Company Description',
          title_en: 'About Active Soft',
          title_ar: 'عن شركة Active Soft',
          content_en: 'We are Oracle Database specialists with 15+ years of experience in developing custom business applications. We help businesses transform their operations through innovative database solutions.',
          content_ar: 'نحن متخصصون في قواعد بيانات Oracle مع أكثر من 15 عام من الخبرة في تطوير تطبيقات الأعمال المخصصة. نساعد الشركات في تحويل عملياتها من خلال حلول قواعد البيانات المبتكرة.',
          type: 'text',
          category: 'about',
          isActive: true,
          lastModified: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Contact Information',
          title_en: 'Contact Details',
          title_ar: 'بيانات التواصل',
          content_en: JSON.stringify({
            email: 'info@activesoft.com',
            support_email: 'support@activesoft.com',
            phone_support: '+20 1225077433',
            phone_sales: '+20 1006467081',
            address: 'Sadat City, Menoufia, Egypt',
            working_hours: 'Sun-Thu: 9:00 AM - 6:00 PM'
          }),
          content_ar: JSON.stringify({
            email: 'info@activesoft.com',
            support_email: 'support@activesoft.com',
            phone_support: '+20 1225077433',
            phone_sales: '+20 1006467081',
            address: 'مدينة السادات، المنوفية، مصر',
            working_hours: 'الأحد-الخميس: 9:00 ص - 6:00 م'
          }),
          type: 'json',
          category: 'contact',
          isActive: true,
          lastModified: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Services Overview',
          title_en: 'Our Database Solutions',
          title_ar: 'حلول قواعد البيانات',
          content_en: 'We provide comprehensive Oracle Database solutions including custom application development, system integration, performance optimization, and ongoing support.',
          content_ar: 'نقدم حلول Oracle Database شاملة تشمل تطوير التطبيقات المخصصة، تكامل الأنظمة، تحسين الأداء، والدعم المستمر.',
          type: 'text',
          category: 'services',
          isActive: true,
          lastModified: new Date().toISOString()
        }
      ];
      
      setContentSections(defaultSections);
      localStorage.setItem('content_sections', JSON.stringify(defaultSections));
    }
  };

  const saveContentSections = (sections: ContentSection[]) => {
    localStorage.setItem('content_sections', JSON.stringify(sections));
    setContentSections(sections);
  };

  const handleAddNew = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      name: '',
      title_en: '',
      title_ar: '',
      content_en: '',
      content_ar: '',
      type: 'text',
      category: 'general',
      isActive: true,
      lastModified: new Date().toISOString()
    };
    setSelectedSection(newSection);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEdit = (section: ContentSection) => {
    setSelectedSection(section);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleView = (section: ContentSection) => {
    setSelectedSection(section);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleDelete = (sectionId: string) => {
    if (window.confirm('Are you sure you want to delete this content section?')) {
      const updatedSections = contentSections.filter(section => section.id !== sectionId);
      saveContentSections(updatedSections);
    }
  };

  const handleSave = (section: ContentSection) => {
    const updatedSection = {
      ...section,
      lastModified: new Date().toISOString()
    };

    const existingIndex = contentSections.findIndex(s => s.id === section.id);
    let updatedSections: ContentSection[];
    
    if (existingIndex >= 0) {
      updatedSections = [...contentSections];
      updatedSections[existingIndex] = updatedSection;
    } else {
      updatedSections = [...contentSections, updatedSection];
    }

    saveContentSections(updatedSections);
    setIsModalOpen(false);
    setSelectedSection(null);
  };

  const toggleActive = (sectionId: string) => {
    const updatedSections = contentSections.map(section =>
      section.id === sectionId 
        ? { ...section, isActive: !section.isActive, lastModified: new Date().toISOString() }
        : section
    );
    saveContentSections(updatedSections);
  };

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'home', label: 'Home Page' },
    { key: 'services', label: 'Services' },
    { key: 'about', label: 'About Us' },
    { key: 'contact', label: 'Contact' },
    { key: 'general', label: 'General' }
  ];

  const filteredSections = filter === 'all' 
    ? contentSections 
    : contentSections.filter(section => section.category === filter);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'home': return 'bg-blue-100 text-blue-800';
      case 'services': return 'bg-green-100 text-green-800';
      case 'about': return 'bg-purple-100 text-purple-800';
      case 'contact': return 'bg-orange-100 text-orange-800';
      case 'general': return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            </div>
            <button
              onClick={handleAddNew}
              className="bg-[#04968d] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#037f72] transition-colors"
            >
              + Add New Content
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
                <span className="text-2xl">📄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sections</p>
                <p className="text-2xl font-semibold text-gray-900">{contentSections.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {contentSections.filter(s => s.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">⏸️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {contentSections.filter(s => !s.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🔄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recently Updated</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {contentSections.filter(s => {
                    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                    return new Date(s.lastModified) > dayAgo;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === category.key
                    ? 'bg-[#04968d] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Content Sections</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSections.map((section) => (
                  <tr key={section.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{section.name}</div>
                        <div className="text-sm text-gray-500">{section.title_en}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(section.category)}`}>
                        {section.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {section.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(section.id)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          section.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {section.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(section.lastModified).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(section)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(section)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(section.id)}
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
      {isModalOpen && selectedSection && (
        <ContentModal
          section={selectedSection}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSection(null);
          }}
        />
      )}
    </div>
  );
};

// Content Modal Component
interface ContentModalProps {
  section: ContentSection;
  isEditing: boolean;
  onSave: (section: ContentSection) => void;
  onClose: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ section, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState<ContentSection>(section);

  const handleSave = () => {
    onSave(formData);
  };

  const handleInputChange = (field: keyof ContentSection, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {isEditing ? (section.id === formData.id ? 'Edit Content Section' : 'Add Content Section') : 'View Content Section'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              {isEditing ? (
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                >
                  <option value="home">Home Page</option>
                  <option value="services">Services</option>
                  <option value="about">About Us</option>
                  <option value="contact">Contact</option>
                  <option value="general">General</option>
                </select>
              ) : (
                <p className="text-gray-900 capitalize">{formData.category}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              {isEditing ? (
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                >
                  <option value="text">Text</option>
                  <option value="html">HTML</option>
                  <option value="json">JSON</option>
                </select>
              ) : (
                <p className="text-gray-900">{formData.type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              {isEditing ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="mr-2"
                  />
                  Active
                </label>
              ) : (
                <p className="text-gray-900">{formData.isActive ? 'Active' : 'Inactive'}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => handleInputChange('title_en', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.title_en}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title (Arabic)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title_ar}
                  onChange={(e) => handleInputChange('title_ar', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent text-right"
                  dir="rtl"
                />
              ) : (
                <p className="text-gray-900 text-right" dir="rtl">{formData.title_ar}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content (English)</label>
              {isEditing ? (
                <textarea
                  value={formData.content_en}
                  onChange={(e) => handleInputChange('content_en', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded border max-h-40 overflow-y-auto">
                  {formData.content_en}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content (Arabic)</label>
              {isEditing ? (
                <textarea
                  value={formData.content_ar}
                  onChange={(e) => handleInputChange('content_ar', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#04968d] focus:border-transparent text-right"
                  dir="rtl"
                />
              ) : (
                <div className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded border text-right max-h-40 overflow-y-auto" dir="rtl">
                  {formData.content_ar}
                </div>
              )}
            </div>
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

export default ContentManagementPage;