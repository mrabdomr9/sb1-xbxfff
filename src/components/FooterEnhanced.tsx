import React from 'react';
import { Link } from 'react-router-dom';

const FooterEnhanced = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Oracle ERP Services' },
    { path: '/clients', label: 'Success Stories' },
    { path: '/knowledge-base', label: 'Knowledge Base' },
    { path: '/roi-calculator', label: 'ROI Calculator' },
    { path: '/contact', label: 'Contact Us' }
  ];

  const oracleServices = [
    'Oracle Financials Cloud',
    'Oracle HCM Cloud',
    'Oracle SCM Cloud',
    'Oracle Analytics Cloud',
    'Oracle Implementation',
    'Oracle Training & Support'
  ];

  const certifications = [
    'Oracle Platinum Partner',
    'Oracle Cloud Certified',
    'Oracle Implementation Specialist',
    'ISO 9001:2015 Certified'
  ];

  return (
    <footer className="bg-gradient-to-b from-[#213c4d] to-[#1a2f3a] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[#04968d] to-[#037f72] rounded-xl">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Active Soft</h3>
                <p className="text-[#04968d] font-semibold">Oracle ERP Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your gateway to professional Oracle ERP systems and powerful enterprise solutions. 
              We specialize in streamlining operations and boosting productivity through innovative Oracle implementations.
            </p>
            
            {/* Certifications */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#04968d] uppercase tracking-wide">Certifications</h4>
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                  <span className="text-[#04968d]">🏆</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-[#04968d] transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-[#04968d] rounded-full group-hover:w-2 transition-all duration-300"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Business Hours */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-[#04968d] uppercase tracking-wide mb-3">Business Hours</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-[#04968d]">🕒</span>
                  <span>Sun-Thu: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#04968d]">🕒</span>
                  <span>Fri-Sat: Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Oracle Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Oracle ERP Services</h3>
            <ul className="space-y-3">
              {oracleServices.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-[#04968d] rounded-full group-hover:w-2 transition-all duration-300"></span>
                  <span className="group-hover:text-[#04968d] transition-colors duration-300">{service}</span>
                </li>
              ))}
            </ul>

            {/* Industry Focus */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-[#04968d] uppercase tracking-wide mb-3">Industries We Serve</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div>Manufacturing & Distribution</div>
                <div>Financial Services</div>
                <div>Healthcare & Pharmaceuticals</div>
                <div>Government & Public Sector</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <span className="text-xl text-[#04968d]">📧</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:support@activesoft.com" className="text-white hover:text-[#04968d] transition-colors">
                    support@activesoft.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <Phone className="h-5 w-5 text-[#04968d]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Support</p>
                  <a href="tel:01225077433" className="text-white hover:text-[#04968d] transition-colors">
                    01225077433
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <Phone className="h-5 w-5 text-[#04968d]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Sales</p>
                  <a href="tel:01006467081" className="text-white hover:text-[#04968d] transition-colors">
                    01006467081
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <MapPin className="h-5 w-5 text-[#04968d]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Sadat City, Egypt</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <Globe className="h-5 w-5 text-[#04968d]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Global Reach</p>
                  <p className="text-white">Serving MENA Region</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#04968d] to-[#037f72] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>🚀</span>
                <span>Start Your Oracle Journey</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-[#1a2f3a]">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Active Soft. All rights reserved. | Oracle ERP Specialists
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#04968d] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#04968d] transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>

              <a 
                href="#" 
                className="text-gray-400 hover:text-[#04968d] transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            {/* Oracle Partnership Badge */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="text-[#04968d]">🏆</span>
              <span>Oracle Certified Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterEnhanced;