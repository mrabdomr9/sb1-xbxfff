import React from 'react';
import { Link } from 'react-router-dom';

const FooterTest = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Active Soft</h3>
            <p className="text-gray-300">
              شركة رائدة في مجال تطوير البرمجيات وتقنية المعلومات
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📞 +966 XX XXX XXXX</li>
              <li>✉️ info@activesoft.sa</li>
              <li>📍 الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">
            © 2024 Active Soft. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterTest;