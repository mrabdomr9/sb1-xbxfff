import React from 'react';

const BrochuresSimple = () => {
  const brochures = [
    {
      id: 1,
      title: 'Oracle ERP Solutions',
      description: 'Comprehensive guide to our Oracle ERP implementation services and capabilities',
      category: 'ERP Systems',
      pages: 24,
      size: '2.5 MB',
      downloadUrl: '#',
      previewImage: '📊',
      features: [
        'Oracle Cloud Applications',
        'Custom ERP Development',
        'System Integration',
        'Implementation Methodology'
      ]
    },
    {
      id: 2,
      title: 'Windows Desktop Applications',
      description: 'Discover our expertise in building powerful Windows desktop solutions',
      category: 'Desktop Development',
      pages: 18,
      size: '1.8 MB',
      downloadUrl: '#',
      previewImage: '💻',
      features: [
        '.NET Framework Development',
        'WPF & UWP Applications',
        'Database Integration',
        'Enterprise Security'
      ]
    },
    {
      id: 3,
      title: 'Web Development Services',
      description: 'Modern web applications and enterprise portals built with cutting-edge technology',
      category: 'Web Development',
      pages: 20,
      size: '3.1 MB',
      downloadUrl: '#',
      previewImage: '🌐',
      features: [
        'React & TypeScript',
        'Enterprise Portals',
        'API Development',
        'Cloud Deployment'
      ]
    },
    {
      id: 4,
      title: 'Company Profile',
      description: 'Learn about Active Soft - our history, team, expertise, and success stories',
      category: 'Company Information',
      pages: 32,
      size: '4.2 MB',
      downloadUrl: '#',
      previewImage: '🏢',
      features: [
        'Company Overview',
        'Team Expertise',
        'Client Success Stories',
        'Service Portfolio'
      ]
    },
    {
      id: 5,
      title: 'Technology Consultation',
      description: 'Strategic technology consulting services to help you make informed decisions',
      category: 'Consulting',
      pages: 16,
      size: '1.5 MB',
      downloadUrl: '#',
      previewImage: '🎯',
      features: [
        'Technology Assessment',
        'Digital Transformation',
        'Architecture Planning',
        'Implementation Roadmap'
      ]
    },
    {
      id: 6,
      title: 'Support & Maintenance',
      description: 'Comprehensive support and maintenance services to keep your systems running smoothly',
      category: 'Support Services',
      pages: 14,
      size: '1.2 MB',
      downloadUrl: '#',
      previewImage: '🛠️',
      features: [
        '24/7 Support',
        'Preventive Maintenance',
        'Performance Monitoring',
        'Update Management'
      ]
    }
  ];

  const categories = ['All', 'ERP Systems', 'Desktop Development', 'Web Development', 'Company Information', 'Consulting', 'Support Services'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredBrochures = selectedCategory === 'All' 
    ? brochures 
    : brochures.filter(brochure => brochure.category === selectedCategory);

  const handleDownload = (brochureTitle: string) => {
    // Simulate download
    alert(`Downloading: ${brochureTitle}`);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Service Brochures</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download our comprehensive brochures to learn more about our services, capabilities, and how we can help your business succeed
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-[#04968d] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Brochures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrochures.map((brochure) => (
            <div
              key={brochure.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Preview */}
              <div className="bg-gradient-to-br from-[#04968d]/10 to-[#213c4d]/10 p-8 text-center">
                <div className="text-6xl mb-4">{brochure.previewImage}</div>
                <div className="text-sm text-[#04968d] font-semibold bg-white/80 rounded-full px-3 py-1 inline-block">
                  {brochure.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{brochure.title}</h3>
                <p className="text-gray-600 mb-4">{brochure.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Topics:</h4>
                  <ul className="space-y-1">
                    {brochure.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="text-[#04968d] mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Info */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>📄 {brochure.pages} pages</span>
                  <span>📁 {brochure.size}</span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(brochure.title)}
                  className="w-full bg-[#04968d] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Download PDF</span>
                  <span>⬇️</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-[#213c4d] text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Custom Information?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't see what you're looking for? Contact us for custom brochures tailored to your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold">
              Request Custom Brochure 📄
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#213c4d] transition-colors font-semibold">
              Contact Sales Team 📞
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Download Information</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• All brochures are available in PDF format</li>
                <li>• No registration required for download</li>
                <li>• Updated regularly with latest information</li>
                <li>• Available in both English and Arabic versions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochuresSimple;