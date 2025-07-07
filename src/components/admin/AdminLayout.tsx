import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, description }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-[#213c4d]">
                Active Soft
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/admin/dashboard" className="text-lg text-gray-600 hover:text-[#04968d]">
                Admin Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-[#04968d]">
                View Site 🌐
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout 🔐
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link to="/admin/dashboard" className="hover:text-[#04968d]">Dashboard</Link>
            <span>→</span>
            <span>{title}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;