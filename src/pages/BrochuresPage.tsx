import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Brochure {
  id: number;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  pages: number;
  lastUpdated: string;
  downloadCount: number;
  previewImage: string;
  featured: boolean;
}

const BrochuresPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Demo brochures data
  const brochures: Brochure[] = [
    {
      id: 1,
      title: 'Oracle ERP Solutions Overview',
      description: 'Comprehensive guide to our Oracle ERP implementation services, featuring case studies and ROI analysis.',
      category: 'Oracle ERP',
      fileSize: '4.2 MB',
      pages: 24,
      lastUpdated: '2024-01-15',
      downloadCount: 1250,
      previewImage: '🔧',
      featured: true
    },
    {
      id: 2,
      title: 'Windows Desktop Applications Portfolio',
      description: 'Showcase of our custom Windows desktop applications with technical specifications and user testimonials.',
      category: 'Desktop Apps',
      fileSize: '6.8 MB',
      pages: 32,
      lastUpdated: '2024-01-10',
      downloadCount: 890,
      previewImage: '💻',
      featured: true
    },
    {
      id: 3,
      title: 'Web Development Services Guide',
      description: 'Modern web development solutions including React applications and enterprise portals.',
      category: 'Web Development',
      fileSize: '3.5 MB',
      pages: 18,
      lastUpdated: '2024-01-08',
      downloadCount: 650,
      previewImage: '🌐',
      featured: false
    },
    {
      id: 4,
      title: 'System Integration Case Studies',
      description: 'Real-world examples of successful system integrations across various industries.',
      category: 'Integration',
      fileSize: '5.1 MB',
      pages: 28,
      lastUpdated: '2023-12-20',
      downloadCount: 420,
      previewImage: '🔗',
      featured: false
    },
    {
      id: 5,
      title: 'Oracle Cloud Migration Guide',
      description: 'Step-by-step guide for migrating from legacy systems to Oracle Cloud infrastructure.',
      category: 'Oracle ERP',
      fileSize: '7.2 MB',
      pages: 45,
      lastUpdated: '2023-12-15',
      downloadCount: 980,
      previewImage: '☁️',
      featured: true
    },
    {
      id: 6,
      title: 'Technical Support & Maintenance',
      description: 'Overview of our 24/7 support services and maintenance packages.',
      category: 'Support',
      fileSize: '2.8 MB',
      pages: 12,
      lastUpdated: '2024-01-05',
      downloadCount: 340,
      previewImage: '🛠️',
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All Brochures', icon: '📁' },
    { key: 'Oracle ERP', label: 'Oracle ERP', icon: '🔧' },
    { key: 'Desktop Apps', label: 'Desktop Apps', icon: '💻' },
    { key: 'Web Development', label: 'Web Development', icon: '🌐' },
    { key: 'Integration', label: 'System Integration', icon: '🔗' },
    { key: 'Support', label: 'Support Services', icon: '🛠️' }
  ];

  // Filter brochures
  const filteredBrochures = brochures.filter(brochure => {
    const matchesCategory = selectedCategory === 'all' || brochure.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      brochure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brochure.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBrochures = brochures.filter(brochure => brochure.featured);

  const handleDownload = (brochure: Brochure) => {
    // In a real app, this would trigger actual file download
    alert(`Downloading: ${brochure.title}\nThis is a demo - actual file download would happen here.`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Service Brochures</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download comprehensive guides about our Oracle ERP and Windows Desktop solutions, complete with case studies and technical specifications.
          </p>
        </div>

        {/* Featured Brochures */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">🌟 Featured Downloads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBrochures.map((brochure) => (
              <div key={brochure.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-[#04968d]/20 to-[#213c4d]/20 p-8 text-center">
                  <div className="text-6xl mb-4">{brochure.previewImage}</div>
                  <span className="bg-[#04968d] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{brochure.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{brochure.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>📄 {brochure.pages} pages</span>
                    <span>📦 {brochure.fileSize}</span>
                    <span>⬇️ {brochure.downloadCount}</span>
                  </div>

                  <button
                    onClick={() => handleDownload(brochure)}
                    className="w-full bg-[#04968d] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                  >
                    Download PDF 📥
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Brochures
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📂 Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-[#04968d] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon} {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Brochures */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            📚 All Brochures 
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({filteredBrochures.length} results)
            </span>
          </h2>

          {filteredBrochures.length > 0 ? (
            <div className="space-y-6">
              {filteredBrochures.map((brochure) => (
                <div key={brochure.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="grid md:grid-cols-5 gap-6 p-6">
                    {/* Preview */}
                    <div className="md:col-span-1 text-center">
                      <div className="text-5xl mb-2">{brochure.previewImage}</div>
                      <span className="text-xs text-gray-500">{brochure.category}</span>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {brochure.title}
                        {brochure.featured && (
                          <span className="ml-2 bg-[#04968d] text-white px-2 py-1 rounded text-xs">
                            Featured
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 mb-4">{brochure.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <span>📄</span>
                          <span className="ml-1">{brochure.pages} pages</span>
                        </div>
                        <div className="flex items-center">
                          <span>📦</span>
                          <span className="ml-1">{brochure.fileSize}</span>
                        </div>
                        <div className="flex items-center">
                          <span>⬇️</span>
                          <span className="ml-1">{brochure.downloadCount} downloads</span>
                        </div>
                        <div className="flex items-center">
                          <span>📅</span>
                          <span className="ml-1">{formatDate(brochure.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Download */}
                    <div className="md:col-span-1 flex flex-col justify-center">
                      <button
                        onClick={() => handleDownload(brochure)}
                        className="w-full bg-[#04968d] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold mb-2"
                      >
                        Download 📥
                      </button>
                      <button className="w-full border-2 border-[#04968d] text-[#04968d] py-2 px-4 rounded-lg hover:bg-[#04968d] hover:text-white transition-colors text-sm">
                        Preview 👁️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No brochures found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-[#213c4d] text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Need More Information?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our team is ready to provide customized solutions and detailed proposals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
            >
              Request Custom Proposal
              <span className="ml-2">📋</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center border-2 border-[#04968d] text-[#04968d] px-8 py-4 rounded-lg hover:bg-[#04968d] hover:text-white transition-colors font-semibold"
            >
              Explore Our Services
              <span className="ml-2">🔧</span>
            </Link>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gray-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">📧 Stay Updated</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to receive notifications when new brochures and case studies are available
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
            />
            <button className="bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochuresPage;