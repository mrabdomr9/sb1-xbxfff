import React from 'react';
import { Link } from 'react-router-dom';

const FooterFixed = () => {
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
                  <span className="text-xl text-[#04968d]">📞</span>
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
                  <span className="text-xl text-[#04968d]">📞</span>
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
                  <span className="text-xl text-[#04968d]">📍</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Sadat City, Egypt</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <span className="text-xl text-[#04968d]">🌍</span>
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
                <span className="text-xl">💼</span>
              </a>
              
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#04968d] transition-colors duration-300"
                aria-label="Twitter"
              >
                <span className="text-xl">🐦</span>
              </a>

              <a 
                href="#" 
                className="text-gray-400 hover:text-[#04968d] transition-colors duration-300"
                aria-label="Facebook"
              >
                <span className="text-xl">📘</span>
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

export default FooterFixed;