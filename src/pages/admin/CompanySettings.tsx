import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CompanySettings {
  companyInfo: {
    name: string;
    description: string;
    website: string;
    foundedYear: number;
    employeeCount: string;
    industry: string;
  };
  contactInfo: {
    email: string;
    supportPhone: string;
    salesPhone: string;
    address: string;
    city: string;
    country: string;
    timezone: string;
  };
  businessSettings: {
    currency: string;
    language: string;
    dateFormat: string;
    businessHours: {
      start: string;
      end: string;
      workDays: string[];
    };
  };
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
    youtube: string;
  };
  oracleSettings: {
    partnershipLevel: string;
    certifications: string[];
    specializations: string[];
    supportedModules: string[];
  };
}

const CompanySettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'business' | 'social' | 'oracle'>('company');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<CompanySettings>({
    companyInfo: {
      name: 'Active Soft',
      description: 'Your gateway to professional Oracle ERP systems and powerful enterprise solutions. We specialize in streamlining operations and boosting productivity through innovative Oracle implementations.',
      website: 'https://www.activesoft.com',
      foundedYear: 2015,
      employeeCount: '50-100',
      industry: 'Information Technology'
    },
    contactInfo: {
      email: 'support@activesoft.com',
      supportPhone: '01225077433',
      salesPhone: '01006467081',
      address: 'Technology District',
      city: 'Sadat City',
      country: 'Egypt',
      timezone: 'UTC+2'
    },
    businessSettings: {
      currency: 'EGP',
      language: 'English',
      dateFormat: 'DD/MM/YYYY',
      businessHours: {
        start: '09:00',
        end: '18:00',
        workDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
      }
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/company/activesoft',
      twitter: 'https://twitter.com/activesoft',
      facebook: 'https://facebook.com/activesoft',
      youtube: 'https://youtube.com/c/activesoft'
    },
    oracleSettings: {
      partnershipLevel: 'Oracle Platinum Partner',
      certifications: [
        'Oracle Cloud Infrastructure Certified',
        'Oracle ERP Cloud Implementation Specialist',
        'Oracle HCM Cloud Certified Professional',
        'Oracle SCM Cloud Certified Consultant'
      ],
      specializations: [
        'Oracle ERP Implementation',
        'Oracle Cloud Migration',
        'Oracle Analytics Solutions',
        'Oracle Integration Services'
      ],
      supportedModules: [
        'Oracle Financials Cloud',
        'Oracle HCM Cloud',
        'Oracle SCM Cloud',
        'Oracle Analytics Cloud',
        'Oracle Integration Cloud'
      ]
    }
  });

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('companySettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSettings = (section: keyof CompanySettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedSettings = (section: keyof CompanySettings, parentField: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...prev[section][parentField as keyof CompanySettings[typeof section]],
          [field]: value
        }
      }
    }));
  };

  const addArrayItem = (section: keyof CompanySettings, field: string, item: string) => {
    if (!item.trim()) return;
    
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section][field as keyof CompanySettings[typeof section]] as string[]), item]
      }
    }));
  };

  const removeArrayItem = (section: keyof CompanySettings, field: string, index: number) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section][field as keyof CompanySettings[typeof section]] as string[]).filter((_, i) => i !== index)
      }
    }));
  };

  const tabs = [
    { id: 'company', label: 'Company Info', icon: '🏢' },
    { id: 'contact', label: 'Contact Details', icon: '📞' },
    { id: 'business', label: 'Business Settings', icon: '⚙️' },
    { id: 'social', label: 'Social Media', icon: '🌐' },
    { id: 'oracle', label: 'Oracle Partnership', icon: '🏛️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">⚙️</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Company Settings</h1>
                <p className="text-gray-600">Manage your company information and preferences</p>
              </div>
            </div>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#04968d] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <span className="animate-spin">⟳</span>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#04968d] text-[#04968d]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Company Info Tab */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Company Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyInfo.name}
                    onChange={(e) => updateSettings('companyInfo', 'name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={settings.companyInfo.website}
                    onChange={(e) => updateSettings('companyInfo', 'website', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                  <input
                    type="number"
                    value={settings.companyInfo.foundedYear}
                    onChange={(e) => updateSettings('companyInfo', 'foundedYear', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                  <select
                    value={settings.companyInfo.employeeCount}
                    onChange={(e) => updateSettings('companyInfo', 'employeeCount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  >
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-500">101-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    value={settings.companyInfo.industry}
                    onChange={(e) => updateSettings('companyInfo', 'industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                <textarea
                  value={settings.companyInfo.description}
                  onChange={(e) => updateSettings('companyInfo', 'description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Contact Details Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={settings.contactInfo.email}
                    onChange={(e) => updateSettings('contactInfo', 'email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                  <input
                    type="tel"
                    value={settings.contactInfo.supportPhone}
                    onChange={(e) => updateSettings('contactInfo', 'supportPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sales Phone</label>
                  <input
                    type="tel"
                    value={settings.contactInfo.salesPhone}
                    onChange={(e) => updateSettings('contactInfo', 'salesPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.contactInfo.timezone}
                    onChange={(e) => updateSettings('contactInfo', 'timezone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  >
                    <option value="UTC-12">UTC-12</option>
                    <option value="UTC-11">UTC-11</option>
                    <option value="UTC-10">UTC-10</option>
                    <option value="UTC-9">UTC-9</option>
                    <option value="UTC-8">UTC-8</option>
                    <option value="UTC-7">UTC-7</option>
                    <option value="UTC-6">UTC-6</option>
                    <option value="UTC-5">UTC-5</option>
                    <option value="UTC-4">UTC-4</option>
                    <option value="UTC-3">UTC-3</option>
                    <option value="UTC-2">UTC-2</option>
                    <option value="UTC-1">UTC-1</option>
                    <option value="UTC+0">UTC+0</option>
                    <option value="UTC+1">UTC+1</option>
                    <option value="UTC+2">UTC+2</option>
                    <option value="UTC+3">UTC+3</option>
                    <option value="UTC+4">UTC+4</option>
                    <option value="UTC+5">UTC+5</option>
                    <option value="UTC+6">UTC+6</option>
                    <option value="UTC+7">UTC+7</option>
                    <option value="UTC+8">UTC+8</option>
                    <option value="UTC+9">UTC+9</option>
                    <option value="UTC+10">UTC+10</option>
                    <option value="UTC+11">UTC+11</option>
                    <option value="UTC+12">UTC+12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={settings.contactInfo.city}
                    onChange={(e) => updateSettings('contactInfo', 'city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={settings.contactInfo.country}
                    onChange={(e) => updateSettings('contactInfo', 'country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={settings.contactInfo.address}
                  onChange={(e) => updateSettings('contactInfo', 'address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Business Settings Tab */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Business Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.businessSettings.currency}
                    onChange={(e) => updateSettings('businessSettings', 'currency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  >
                    <option value="EGP">EGP - Egyptian Pound</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="SAR">SAR - Saudi Riyal</option>
                    <option value="AED">AED - UAE Dirham</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.businessSettings.language}
                    onChange={(e) => updateSettings('businessSettings', 'language', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">العربية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={settings.businessSettings.dateFormat}
                    onChange={(e) => updateSettings('businessSettings', 'dateFormat', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={settings.businessSettings.businessHours.start}
                      onChange={(e) => updateNestedSettings('businessSettings', 'businessHours', 'start', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={settings.businessSettings.businessHours.end}
                      onChange={(e) => updateNestedSettings('businessSettings', 'businessHours', 'end', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Working Days</label>
                  <div className="grid grid-cols-7 gap-2">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <label key={day} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.businessSettings.businessHours.workDays.includes(day)}
                          onChange={(e) => {
                            const workDays = settings.businessSettings.businessHours.workDays;
                            if (e.target.checked) {
                              updateNestedSettings('businessSettings', 'businessHours', 'workDays', [...workDays, day]);
                            } else {
                              updateNestedSettings('businessSettings', 'businessHours', 'workDays', workDays.filter(d => d !== day));
                            }
                          }}
                          className="rounded border-gray-300 text-[#04968d] focus:ring-[#04968d]"
                        />
                        <span className="text-sm">{day.slice(0, 3)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Social Media Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={settings.socialMedia.linkedin}
                    onChange={(e) => updateSettings('socialMedia', 'linkedin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                  <input
                    type="url"
                    value={settings.socialMedia.twitter}
                    onChange={(e) => updateSettings('socialMedia', 'twitter', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="https://twitter.com/yourcompany"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <input
                    type="url"
                    value={settings.socialMedia.facebook}
                    onChange={(e) => updateSettings('socialMedia', 'facebook', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="https://facebook.com/yourcompany"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                  <input
                    type="url"
                    value={settings.socialMedia.youtube}
                    onChange={(e) => updateSettings('socialMedia', 'youtube', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="https://youtube.com/c/yourcompany"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Oracle Partnership Tab */}
          {activeTab === 'oracle' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Oracle Partnership Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Level</label>
                <select
                  value={settings.oracleSettings.partnershipLevel}
                  onChange={(e) => updateSettings('oracleSettings', 'partnershipLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                >
                  <option value="Oracle Authorized Partner">Oracle Authorized Partner</option>
                  <option value="Oracle Silver Partner">Oracle Silver Partner</option>
                  <option value="Oracle Gold Partner">Oracle Gold Partner</option>
                  <option value="Oracle Platinum Partner">Oracle Platinum Partner</option>
                  <option value="Oracle Diamond Partner">Oracle Diamond Partner</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {settings.oracleSettings.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm">{cert}</span>
                        <button
                          onClick={() => removeArrayItem('oracleSettings', 'certifications', index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add new certification"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem('oracleSettings', 'certifications', e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                          addArrayItem('oracleSettings', 'certifications', input.value);
                          input.value = '';
                        }}
                        className="px-4 py-2 bg-[#04968d] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Specializations</h3>
                  <div className="space-y-3">
                    {settings.oracleSettings.specializations.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm">{spec}</span>
                        <button
                          onClick={() => removeArrayItem('oracleSettings', 'specializations', index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add new specialization"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem('oracleSettings', 'specializations', e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                          addArrayItem('oracleSettings', 'specializations', input.value);
                          input.value = '';
                        }}
                        className="px-4 py-2 bg-[#04968d] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Modules */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Supported Oracle Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {settings.oracleSettings.supportedModules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-blue-800">{module}</span>
                      <button
                        onClick={() => removeArrayItem('oracleSettings', 'supportedModules', index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add new Oracle module"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addArrayItem('oracleSettings', 'supportedModules', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                      addArrayItem('oracleSettings', 'supportedModules', input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-[#04968d] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
                  >
                    Add Module
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;