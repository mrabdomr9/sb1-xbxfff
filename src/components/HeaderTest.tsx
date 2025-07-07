import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderTest = () => {
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
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/services', label: 'Oracle ERP Services', icon: '🔧' },
    { path: '/clients', label: 'Success Stories', icon: '🏢' },
    { path: '/knowledge-base', label: 'Knowledge Base', icon: '📚' },
    { path: '/roi-calculator', label: 'ROI Calculator', icon: '🧮' },
    { path: '/contact', label: 'Contact Us', icon: '📞' },
    { path: '/brochures', label: 'Resources', icon: '📄' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg text-gray-800' 
          : 'bg-[#213c4d] text-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className={`flex items-center space-x-3 transition-colors ${
              isScrolled ? 'text-[#213c4d]' : 'text-white'
            }`}
          >
            <div className="text-2xl">⚡</div>
            <div>
              <div className="text-xl font-bold">Active Soft</div>
              <div className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-blue-200'}`}>
                Oracle ERP Experts
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  isActive(item.path)
                    ? isScrolled
                      ? 'bg-[#04968d] text-white'
                      : 'bg-white/20 text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:text-[#04968d] hover:bg-gray-100'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Oracle Partnership Badge */}
            <div className={`hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full border ${
              isScrolled 
                ? 'border-[#04968d] text-[#04968d] bg-[#04968d]/10' 
                : 'border-white/30 text-white bg-white/10'
            }`}>
              <span className="text-xs">🏆</span>
              <span className="text-xs font-medium">Oracle Partner</span>
            </div>
            
            {/* Admin Link */}
            <Link
              to="/admin/login"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                isScrolled
                  ? 'border-gray-300 text-gray-600 hover:border-[#04968d] hover:text-[#04968d]'
                  : 'border-white/30 text-gray-300 hover:border-white hover:text-white'
              }`}
            >
              <span className="text-sm">🔐</span>
              <span className="text-sm font-medium">Admin</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'text-gray-600 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out mt-1.5 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out mt-1.5 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className={`py-4 border-t ${
            isScrolled ? 'border-gray-200' : 'border-white/20'
          }`}>
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? isScrolled
                        ? 'bg-[#04968d] text-white'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* Oracle Partnership Badge Mobile */}
              <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg border ${
                isScrolled 
                  ? 'border-[#04968d] text-[#04968d] bg-[#04968d]/10' 
                  : 'border-white/30 text-white bg-white/10'
              }`}>
                <span>🏆</span>
                <span className="font-medium">Oracle Platinum Partner</span>
              </div>
              
              {/* Admin Link Mobile */}
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-300 ${
                  isScrolled
                    ? 'border-gray-300 text-gray-600 hover:border-[#04968d] hover:text-[#04968d]'
                    : 'border-white/30 text-gray-300 hover:border-white hover:text-white'
                }`}
              >
                <span>🔐</span>
                <span className="font-medium">Admin Portal</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[-1]"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default HeaderTest;