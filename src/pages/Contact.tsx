import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Building2, Clock, Globe2, Send, MessageSquare, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useContactSubmissions } from '../hooks/useDatabaseIntegration';
import AnimatedSection from '../components/AnimatedSection';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Active Soft",
  "description": "Get in touch with Active Soft for Oracle ERP implementation and custom desktop application development",
  "mainEntity": {
    "@type": "Organization",
    "name": "Active Soft",
    "telephone": ["+20-1225077433", "+20-1006467081"],
    "email": "support@activesoft.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sadat City",
      "addressCountry": "Egypt"
    }
  }
};

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(11, 'Phone number must be at least 11 digits'),
  business_field: z.string().min(3, 'Business field must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const testimonials = [
  {
    name: "Sarah Thompson",
    company: "Tech Solutions Inc",
    message: "The team's response time and professional support are outstanding. They've been instrumental in our success.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop"
  },
  {
    name: "Michael Chen",
    company: "Global Manufacturing Ltd",
    message: "Their expertise in Oracle ERP implementation has transformed our operations. Highly recommended!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    name: "Emily Rodriguez",
    company: "Healthcare Systems",
    message: "Exceptional service and technical knowledge. They're always available when we need them.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
  }
];

const ContactStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Clock className="w-8 h-8 text-[#04968d] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-[#213c4d] mb-2">24/7</h3>
        <p className="text-gray-600">Support</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <MessageSquare className="w-8 h-8 text-[#04968d] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-[#213c4d] mb-2">1hr</h3>
        <p className="text-gray-600">Response Time</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Globe2 className="w-8 h-8 text-[#04968d] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-[#213c4d] mb-2">15+</h3>
        <p className="text-gray-600">Countries</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Building2 className="w-8 h-8 text-[#04968d] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-[#213c4d] mb-2">3</h3>
        <p className="text-gray-600">Support Centers</p>
      </div>
    </div>
  );
};

const Contact = () => {
  const { createSubmission } = useContactSubmissions();
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus({ type: null, message: '' });
      
      const result = await createSubmission({
        name: data.name,
        email: data.email,
        phone: data.phone,
        business_field: data.business_field,
        message: data.message || ''
      });
      
      if (result.data) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! Our team will contact you within 24 hours.'
        });
        reset();
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit form. Please try again or contact us directly.'
      });
    }
  };

  // Clear status message after 10 seconds
  React.useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const onSubmit_old = async (data: ContactFormData) => {
    try {
      const result = await createSubmission(data);
      reset();
      alert('Thank you for your message! Our team will contact you within 24 hours.');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit form. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-white to-gray-50">
      <SEOHead
        title="Contact Us - Oracle ERP Consultation | Get Quote - Active Soft"
        description="Contact Active Soft for Oracle ERP implementation, custom desktop applications, and enterprise solutions. Free consultation available. 24/7 support, 1-hour response time. Get started today."
        keywords="contact Active Soft, Oracle ERP consultation, custom software quote, enterprise solutions contact, ERP implementation inquiry"
        url="https://activesoft.com/contact"
        structuredData={contactStructuredData}
      />
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our solutions? Our team is here to help you transform your business
            </p>
          </div>

          <ContactStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Send Us a Message</h2>
              
              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center">
                    {submitStatus.type === 'success' ? (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    <p className="font-medium">{submitStatus.message}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
                      placeholder="Your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Field
                    </label>
                    <input
                      {...register('business_field')}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
                      placeholder="Your industry"
                    />
                    {errors.business_field && (
                      <p className="text-red-500 text-sm mt-1">{errors.business_field.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#04968d] text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#04968d]/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-[#04968d]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#213c4d]">Email</p>
                      <a href="mailto:support@activesoft.com" className="text-gray-600 hover:text-[#04968d]">
                        support@activesoft.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#04968d]/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-[#04968d]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#213c4d]">Phone</p>
                      <p className="text-gray-600">Support: 01225077433</p>
                      <p className="text-gray-600">Sales: 01006467081</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#04968d]/10 p-3 rounded-lg">
                      <Building2 className="h-6 w-6 text-[#04968d]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#213c4d]">Address</p>
                      <p className="text-gray-600">Sadat City, Egypt</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 gradient-text">Client Testimonials</h2>
                <Splide
                  options={{
                    type: 'loop',
                    perPage: 1,
                    arrows: false,
                    pagination: true,
                    autoplay: true,
                    interval: 5000,
                    pauseOnHover: true,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <SplideSlide key={index}>
                      <div className="text-center px-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                        />
                        <p className="text-gray-600 italic mb-4">"{testimonial.message}"</p>
                        <h3 className="font-semibold text-[#213c4d]">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            </div>
          </div>

          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Ready to Transform Your Business?</h2>
            <p className="text-gray-600 mb-6">
              Schedule a free consultation with our experts and discover how our solutions can help you grow
            </p>
            <button className="bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors inline-flex items-center space-x-2">
              <span>Schedule Consultation</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;