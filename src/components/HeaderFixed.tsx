import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderFixed = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: 'Home', icon: '🏠', description: 'Homepage' },
    { path: '/services', label: 'Oracle ERP Services', icon: '🔧', description: 'Our Oracle solutions' },
    { path: '/clients', label: 'Success Stories', icon: '🏢', description: 'Client testimonials' },
    { path: '/knowledge-base', label: 'Knowledge Base', icon: '📚', description: 'Oracle resources' },
    { path: '/roi-calculator', label: 'ROI Calculator', icon: '🧮', description: 'Calculate Oracle ROI' },
    { path: '/contact', label: 'Contact Us', icon: '📞', description: 'Get in touch' },
    { path: '/brochures', label: 'Resources', icon: '📄', description: 'Download materials' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
            : 'bg-gradient-to-r from-[#213c4d] to-[#04968d]'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white' 
                  : 'bg-white/20 text-white group-hover:bg-white/30'
              }`}>
                <span className="text-2xl">🏛️</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-xl transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  Active Soft
                </span>
                <span className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-[#04968d]' : 'text-white/80'
                }`}>
                  Oracle ERP Solutions
                </span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? isScrolled
                        ? 'bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white shadow-lg transform scale-105'
                        : 'bg-white/25 text-white shadow-lg backdrop-blur-sm'
                      : isScrolled
                        ? 'text-gray-700 hover:bg-gradient-to-r hover:from-[#04968d]/10 hover:to-[#213c4d]/10 hover:text-[#04968d] hover:shadow-md'
                        : 'text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.label}</span>
                    <span className={`text-xs opacity-70 ${isActive(item.path) ? 'opacity-90' : ''}`}>
                      {item.description}
                    </span>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-current rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button + Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* CTA Button - Hidden on mobile */}
              <Link
                to="/contact"
                className={`hidden lg:flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white shadow-lg hover:shadow-xl'
                    : 'bg-white text-[#04968d] shadow-lg hover:shadow-xl hover:bg-gray-50'
                }`}
              >
                <span>🚀</span>
                <span>Get Started</span>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className={`xl:hidden p-3 rounded-xl transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 transform ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'
                  }`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'mb-1'
                  }`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 transform ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className="absolute top-20 left-6 right-6 bg-white rounded-2xl shadow-2xl border max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="p-6">
              <div className="grid gap-3">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    <div className={`p-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-white/20'
                        : 'bg-gray-100 group-hover:bg-[#04968d]/10'
                    }`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.label}</div>
                      <div className={`text-sm ${
                        isActive(item.path) ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                    {isActive(item.path) && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>🚀</span>
                  <span>Get Started with Oracle ERP</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderFixed;