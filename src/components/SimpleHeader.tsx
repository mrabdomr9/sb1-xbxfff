import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHeader = () => {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo بدون أيقونة */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Active Soft</span>
          </Link>

          {/* Simple Navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              الرئيسية
            </Link>
            <Link to="/admin/login" className="hover:text-blue-200 transition-colors">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SimpleHeader;