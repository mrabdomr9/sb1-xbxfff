import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const HeaderSimple = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/portfolio', label: t('nav.portfolio') },
    { path: '/brochures', label: t('nav.resources') },
    { path: '/contact', label: t('nav.contact') }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-gradient-to-r from-[#213c4d] to-[#04968d]'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white' 
                  : 'bg-white/20 text-white group-hover:bg-white/30'
              }`}>
                <span className="text-xl">🏛️</span>
              </div>
              <div className={`flex flex-col ${isRTL ? 'items-end' : ''}`}>
                <span className={`font-bold text-lg transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  {t('footer.company')}
                </span>
                <span className={`text-xs font-medium transition-colors ${
                  isScrolled ? 'text-[#04968d]' : 'text-white/80'
                }`}>
                  {t('footer.tagline')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? isScrolled
                        ? 'bg-[#04968d] text-white'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:text-[#04968d] hover:bg-gray-100'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Language Toggle & CTA & Mobile Menu */}
            <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-[#04968d] border border-gray-300 hover:border-[#04968d]'
                    : 'text-white/90 hover:text-white border border-white/30 hover:border-white'
                }`}
              >
                {language === 'ar' ? 'EN' : 'ع'}
              </button>

              {/* CTA Button - Hidden on mobile */}
              <Link
                to="/contact"
                className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white shadow-md hover:shadow-lg'
                    : 'bg-white text-[#04968d] shadow-md hover:shadow-lg hover:bg-gray-50'
                }`}
              >
                <span>{t('nav.getStarted')}</span>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 transform ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : 'mb-1'
                  }`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'mb-1'
                  }`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 transform ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className={`absolute top-16 ${isRTL ? 'right-6 left-6' : 'left-6 right-6'} bg-white rounded-xl shadow-2xl border max-h-[calc(100vh-6rem)] overflow-y-auto`}>
            <div className="p-4">
              <div className="grid gap-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white py-3 rounded-lg font-semibold"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSimple;