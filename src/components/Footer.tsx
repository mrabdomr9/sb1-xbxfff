import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#213c4d] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Active Soft</h3>
            <p className="text-gray-300">
              Your gateway to professional Oracle ERP systems and powerful Windows Desktop solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#04968d]" />
                <span>info@activesoft.net</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#04968d]" />
                <span>Support: 01225077433</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#04968d]" />
                <span>Sales: 01006467081</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-[#04968d]" />
                <span>Sadat City, Egypt</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/Active.soft.erp" target="_blank" className="hover:text-[#04968d] transition-colors">LinkedIn</a>
              <a href="https://web.facebook.com/Active.soft.erp" target="_blank" className="hover:text-[#04968d] transition-colors">Twitter</a>
              <a href="https://web.facebook.com/Active.soft.erp" target="_blank" className="hover:text-[#04968d] transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Active Soft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
