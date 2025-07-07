import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Client {
  id: number;
  name: string;
  industry: string;
  logo: string;
  description: string;
  website?: string;
  projectType: string;
  testimonial?: string;
  projectYear: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  technology: string;
  year: string;
  status: string;
  image: string;
  category: string;
}

const ClientsPage = () => {
  const [activeTab, setActiveTab] = useState<'clients' | 'projects'>('clients');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Demo data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const clients: Client[] = [
    {
      id: 1,
      name: 'Saudi Aramco',
      industry: 'Oil & Gas',
      logo: '🛢️',
      description: 'Complete Oracle ERP implementation for operational excellence',
      website: 'https://aramco.com',
      projectType: 'Oracle ERP',
      testimonial: 'Active Soft delivered an outstanding ERP solution that transformed our operations.',
      projectYear: '2023'
    },
    {
      id: 2,
      name: 'SABIC',
      industry: 'Manufacturing',
      logo: '🏭',
      description: 'Custom Windows desktop application for inventory management',
      website: 'https://sabic.com',
      projectType: 'Desktop App',
      testimonial: 'Exceptional service and technical expertise. Highly recommended!',
      projectYear: '2023'
    },
    {
      id: 3,
      name: 'Saudi Telecom Company',
      industry: 'Telecommunications',
      logo: '📱',
      description: 'Enterprise web portal for customer service management',
      website: 'https://stc.com.sa',
      projectType: 'Web Portal',
      projectYear: '2024'
    },
    {
      id: 4,
      name: 'Almarai',
      industry: 'Food & Beverage',
      logo: '🥛',
      description: 'Oracle Cloud integration with existing systems',
      website: 'https://almarai.com',
      projectType: 'System Integration',
      projectYear: '2024'
    },
    {
      id: 5,
      name: 'SAMBA Financial Group',
      industry: 'Banking',
      logo: '🏦',
      description: 'Secure desktop banking application with advanced security',
      projectType: 'Banking System',
      projectYear: '2023'
    },
    {
      id: 6,
      name: 'King Saud University',
      industry: 'Education',
      logo: '🎓',
      description: 'Student management system with Oracle backend',
      projectType: 'Education System',
      projectYear: '2024'
    }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise Resource Planning System',
      client: 'Saudi Aramco',
      description: 'Complete Oracle ERP implementation covering finance, HR, and operations modules',
      technology: 'Oracle Cloud ERP',
      year: '2023',
      status: 'Completed',
      image: '🔧',
      category: 'erp'
    },
    {
      id: 2,
      title: 'Inventory Management Desktop App',
      client: 'SABIC',
      description: 'Real-time inventory tracking with barcode scanning and reporting',
      technology: '.NET WPF',
      year: '2023',
      status: 'Completed',
      image: '💻',
      category: 'desktop'
    },
    {
      id: 3,
      title: 'Customer Service Portal',
      client: 'Saudi Telecom Company',
      description: 'Web-based customer service management with ticketing system',
      technology: 'React TypeScript',
      year: '2024',
      status: 'In Progress',
      image: '🌐',
      category: 'web'
    },
    {
      id: 4,
      title: 'Financial Management System',
      client: 'SAMBA Financial Group',
      description: 'Secure desktop application for banking operations',
      technology: '.NET Core',
      year: '2023',
      status: 'Completed',
      image: '🏦',
      category: 'desktop'
    },
    {
      id: 5,
      title: 'Student Information System',
      client: 'King Saud University',
      description: 'Comprehensive student management with Oracle database',
      technology: 'Oracle APEX',
      year: '2024',
      status: 'In Progress',
      image: '🎓',
      category: 'erp'
    }
  ];

  const projectCategories = [
    { key: 'all', label: 'All Projects', icon: '📁' },
    { key: 'erp', label: 'Oracle ERP', icon: '🔧' },
    { key: 'desktop', label: 'Desktop Apps', icon: '💻' },
    { key: 'web', label: 'Web Solutions', icon: '🌐' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const stats = [
    { label: 'Happy Clients', value: '200+', icon: '😊' },
    { label: 'Projects Completed', value: '500+', icon: '✅' },
    { label: 'Years of Experience', value: '10+', icon: '📅' },
    { label: 'Industries Served', value: '15+', icon: '🏢' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Our Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped leading organizations transform their operations with cutting-edge Oracle ERP and Windows Desktop solutions
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#04968d] mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-lg p-2">
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'clients'
                  ? 'bg-[#04968d] text-white'
                  : 'text-gray-600 hover:text-[#04968d]'
              }`}
            >
              🏢 Our Clients
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-[#04968d] text-white'
                  : 'text-gray-600 hover:text-[#04968d]'
              }`}
            >
              💼 Featured Projects
            </button>
          </div>
        </div>

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client) => (
                <div key={client.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-[#04968d]/10 to-[#213c4d]/10 p-8 text-center">
                    <div className="text-6xl mb-4">{client.logo}</div>
                    <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>
                    <p className="text-[#04968d] font-medium">{client.industry}</p>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{client.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-[#04968d]/10 text-[#04968d] px-3 py-1 rounded-full text-sm font-medium">
                        {client.projectType}
                      </span>
                      <span className="text-gray-500 text-sm">{client.projectYear}</span>
                    </div>

                    {client.testimonial && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-600 italic text-sm">"{client.testimonial}"</p>
                      </div>
                    )}

                    {client.website && (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#04968d] hover:text-[#037f72] transition-colors"
                      >
                        Visit Website
                        <span className="ml-1">🔗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Project Categories */}
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-4">
                {projectCategories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-[#04968d] text-white'
                        : 'bg-white text-gray-600 hover:text-[#04968d] shadow-md'
                    }`}
                  >
                    {category.icon} {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-4xl">{project.image}</div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-[#04968d] font-medium mb-4">Client: {project.client}</p>
                    <p className="text-gray-600 mb-6">{project.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {project.technology}
                        </span>
                        <span className="text-gray-500 text-sm">{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📂</div>
                <p className="text-gray-600">No projects found in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-[#04968d] text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our proven Oracle ERP and Windows Desktop solutions can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-[#04968d] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Your Project
              <span className="ml-2">🚀</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#04968d] transition-colors font-semibold"
            >
              View Our Services
              <span className="ml-2">🔧</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;