import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackPageView, trackContactSubmission } from '../utils/analytics';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const ContactPage = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Track page view
  useEffect(() => {
    trackPageView('contact', {
      title: 'Contact Us - Oracle ERP Services',
      description: 'Contact form for Oracle ERP consultation and services'
    });
  }, []);

  const services = [
    'Oracle ERP Implementation',
    'Windows Desktop Applications',
    'Web Development Solutions',
    'System Integration',
    'Technical Consulting',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage (simulate database)
    const submission = {
      id: Date.now().toString(),
      ...form,
      submittedAt: new Date().toISOString(),
      status: 'new' as const,
      priority: 'medium' as const,
      notes: '',
      assignedTo: ''
    };

    // Get existing submissions
    const existingSubmissions = localStorage.getItem('contactSubmissions');
    const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : [];
    
    // Add new submission
    submissions.unshift(submission);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    // Track contact submission
    trackContactSubmission({
      service: form.service,
      company: form.company,
      submissionId: submission.id
    });
    
    console.log('Contact form submitted and saved:', submission);
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form
    setForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Back to Home
                  <span className="ml-2">🏠</span>
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center border-2 border-[#04968d] text-[#04968d] px-6 py-3 rounded-lg hover:bg-[#04968d] hover:text-white transition-colors"
                >
                  Send Another Message
                  <span className="ml-2">📝</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business? Let's discuss your project requirements and how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Office</h3>
                    <p className="text-gray-600">
                      Riyadh, Saudi Arabia<br />
                      King Fahd Road, Al Olaya District
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+966 11 XXX XXXX</p>
                    <p className="text-sm text-gray-500">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">info@activesoft.sa</p>
                    <p className="text-gray-600">sales@activesoft.sa</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🌐</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Website</h3>
                    <p className="text-gray-600">www.activesoft.sa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-[#04968d] text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Why Choose Active Soft?</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">⚡</span>
                  <span>Fast Response Within 24 Hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🎯</span>
                  <span>Tailored Solutions for Your Business</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🏆</span>
                  <span>Proven Track Record</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🔒</span>
                  <span>Secure & Reliable Solutions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="+966 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service of Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                  placeholder="Please describe your project requirements, timeline, and any specific needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#04968d] text-white py-4 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="ml-2">📤</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Need Immediate Assistance?
            </h2>
            <p className="text-gray-600 mb-6">
              For urgent inquiries, call us directly or check out our service brochures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+966XXXXXXXX"
                className="inline-flex items-center bg-[#213c4d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Call Now
                <span className="ml-2">📞</span>
              </a>
              <Link
                to="/brochures"
                className="inline-flex items-center border-2 border-[#213c4d] text-[#213c4d] px-6 py-3 rounded-lg hover:bg-[#213c4d] hover:text-white transition-colors"
              >
                Download Brochures
                <span className="ml-2">📄</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;