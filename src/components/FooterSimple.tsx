import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const FooterSimple = () => {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/portfolio', label: t('nav.portfolio') },
    { path: '/brochures', label: t('nav.resources') },
    { path: '/contact', label: t('nav.contact') }
  ];

  const oracleServices = [
    'Oracle Financials Cloud',
    'Oracle HCM Cloud', 
    'Oracle SCM Cloud',
    'Oracle Analytics Cloud',
    'Oracle Implementation',
    'Oracle Training & Support'
  ];

  return (
    <footer className="bg-gradient-to-b from-[#213c4d] to-[#1a2f3a] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className={`flex items-center space-x-3 mb-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="p-3 bg-gradient-to-r from-[#04968d] to-[#037f72] rounded-xl">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{t('footer.company')}</h3>
                <p className="text-[#04968d] font-semibold">{t('footer.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">{t('footer.quickLinks')}</h3>
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
              <h4 className="text-sm font-semibold text-[#04968d] uppercase tracking-wide mb-3">
                {t('footer.businessHours')}
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <span className="text-[#04968d]">🕒</span>
                  <span>Sun-Thu: 9:00 AM - 6:00 PM</span>
                </div>
                <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <span className="text-[#04968d]">🕒</span>
                  <span>Fri-Sat: Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Oracle Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">{t('footer.oracleServices')}</h3>
            <ul className="space-y-3">
              {oracleServices.map((service, index) => (
                <li key={index} className={`text-gray-300 flex items-center space-x-2 group ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
            <h3 className="text-xl font-bold mb-6 text-white">{t('footer.getInTouch')}</h3>
            <div className="space-y-4">
              <div className={`flex items-start space-x-3 group ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <span className="text-xl text-[#04968d]">📧</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.email')}</p>
                  <a href="mailto:info@activesoft.com" className="text-white hover:text-[#04968d] transition-colors">
                    info@activesoft.com
                  </a>
                </div>
              </div>

              <div className={`flex items-start space-x-3 group ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <span className="text-xl text-[#04968d]">📞</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.support')}</p>
                  <a href="tel:01225077433" className="text-white hover:text-[#04968d] transition-colors">
                    01225077433
                  </a>
                </div>
              </div>

              <div className={`flex items-start space-x-3 group ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <span className="text-xl text-[#04968d]">📞</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.sales')}</p>
                  <a href="tel:01006467081" className="text-white hover:text-[#04968d] transition-colors">
                    01006467081
                  </a>
                </div>
              </div>

              <div className={`flex items-start space-x-3 group ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <span className="text-xl text-[#04968d]">📍</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.location')}</p>
                  <p className="text-white">Sadat City, Egypt</p>
                </div>
              </div>

              <div className={`flex items-start space-x-3 group ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="p-2 bg-[#04968d]/20 rounded-lg group-hover:bg-[#04968d]/30 transition-colors">
                  <span className="text-xl text-[#04968d]">🌍</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.globalReach')}</p>
                  <p className="text-white">Serving MENA Region</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                to="/contact"
                className={`inline-flex items-center space-x-2 bg-gradient-to-r from-[#04968d] to-[#037f72] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <span>🚀</span>
                <span>{t('nav.getStarted')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-[#1a2f3a]">
        <div className="container mx-auto px-6 py-8">
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className="text-gray-400 text-sm">
              © {currentYear} {t('footer.company')}. {t('footer.allRights')}
            </div>
            
            {/* Social Links */}
            <div className={`flex items-center space-x-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
            <div className={`flex items-center space-x-2 text-sm text-gray-400 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <span className="text-[#04968d]">🏆</span>
              <span>Oracle Certified Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;