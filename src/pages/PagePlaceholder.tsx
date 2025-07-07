import React from 'react';
import { Link } from 'react-router-dom';

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon: string;
  isAdmin?: boolean;
}

const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ 
  title, 
  description, 
  icon, 
  isAdmin = false 
}) => {
  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-gray-50' : 'bg-gradient-to-b from-white to-gray-50'} py-12`}>
      {isAdmin && (
        <header className="bg-white shadow-sm border-b mb-8">
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
                <Link to="/admin/login" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Logout 🔐
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}
      
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-8">{icon}</div>
          <h1 className="text-4xl font-bold mb-6 text-gray-800">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              This page is under development and will be available soon with full functionality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={isAdmin ? "/admin/dashboard" : "/"}
                className="inline-flex items-center bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {isAdmin ? "Back to Dashboard" : "Back to Home"}
                <span className="ml-2">🏠</span>
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center border-2 border-[#04968d] text-[#04968d] px-6 py-3 rounded-lg hover:bg-[#04968d] hover:text-white transition-colors"
              >
                Contact Us
                <span className="ml-2">📞</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePlaceholder;