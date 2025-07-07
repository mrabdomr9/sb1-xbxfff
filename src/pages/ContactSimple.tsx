import React, { useState, useEffect } from 'react';
import { trackPageView } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';
import { useContactMutations, useAnalyticsTracking } from '../hooks/useSupabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const ContactSimple = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    trackPageView('/contact');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save to localStorage (for demo purposes)
      const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      const newSubmission = {
        id: Date.now().toString(),
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'new'
      };
      
      const updatedSubmissions = [newSubmission, ...existingSubmissions];
      localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Failed to submit form:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: t('contact.info.email'),
      details: [
        'info@activesoft.com',
        'support@activesoft.com'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📞',
      title: t('contact.info.phone'),
      details: [
        '+20 1225077433 (Support)',
        '+20 1006467081 (Sales)'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📍',
      title: t('contact.info.address'),
      details: [
        'Sadat City, Menoufia',
        'Egypt'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🕒',
      title: t('contact.info.hours'),
      details: [
        'Sun-Thu: 9:00 AM - 6:00 PM',
        'Fri-Sat: Closed'
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#213c4d] via-[#2a4f63] to-[#04968d] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className={`text-3xl font-bold text-[#213c4d] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'أرسل لنا رسالة' : 'Send Us a Message'}
                </h2>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL 
                    ? 'اتصل بنا للحصول على استشارة مجانية حول حلول Oracle ERP'
                    : 'Get in touch for a free consultation about Oracle ERP solutions'
                  }
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <span>✅</span>
                    <span>{t('contact.form.success')}</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <span>❌</span>
                    <span>{t('contact.form.error')}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={isRTL ? 'اكتب اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('contact.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={isRTL ? 'اكتب بريدك الإلكتروني' : 'Enter your email address'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={isRTL ? 'اكتب رقم هاتفك' : 'Enter your phone number'}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('contact.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={isRTL ? 'اكتب اسم الشركة' : 'Enter your company name'}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.form.subject')} *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <option value="">
                      {isRTL ? 'اختر الموضوع' : 'Select Subject'}
                    </option>
                    <option value="oracle-implementation">
                      {isRTL ? 'تطبيق Oracle ERP' : 'Oracle ERP Implementation'}
                    </option>
                    <option value="oracle-migration">
                      {isRTL ? 'ترحيل إلى Oracle Cloud' : 'Oracle Cloud Migration'}
                    </option>
                    <option value="oracle-support">
                      {isRTL ? 'دعم Oracle' : 'Oracle Support'}
                    </option>
                    <option value="oracle-training">
                      {isRTL ? 'تدريب Oracle' : 'Oracle Training'}
                    </option>
                    <option value="general-inquiry">
                      {isRTL ? 'استفسار عام' : 'General Inquiry'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent resize-vertical ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#04968d] to-[#037f72] text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className={`flex items-center justify-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span className="animate-spin">⏳</span>
                      <span>{t('contact.form.sending')}</span>
                    </span>
                  ) : (
                    <span className={`flex items-center justify-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span>{t('contact.send')}</span>
                      <span>📧</span>
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className={`text-2xl font-bold text-[#213c4d] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'معلومات التواصل' : 'Contact Information'}
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${info.color} text-white rounded-lg flex-shrink-0`}>
                        <span className="text-xl">{info.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-[#213c4d] to-[#04968d] text-white rounded-2xl p-8">
                <h3 className={`text-2xl font-bold mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'لماذا تتواصل معنا؟' : 'Why Contact Us?'}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: '🎯',
                      text: isRTL ? 'استشارة مجانية ومخصصة' : 'Free Customized Consultation'
                    },
                    {
                      icon: '⚡',
                      text: isRTL ? 'رد سريع خلال 24 ساعة' : 'Quick Response Within 24 Hours'
                    },
                    {
                      icon: '🏆',
                      text: isRTL ? 'خبراء معتمدون من Oracle' : 'Oracle Certified Experts'
                    },
                    {
                      icon: '🤝',
                      text: isRTL ? 'دعم شامل ومستمر' : 'Comprehensive Ongoing Support'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}>
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSimple;