import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Building2, Clock, Globe2, Send, MessageSquare } from 'lucide-react';
import { useContactStore } from '../store/contactStore';
import type { ContactFormData } from '../types/contact';
import AnimatedSection from '../components/AnimatedSection';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(11, 'Phone number must be at least 11 digits'),
  businessField: z.string().min(3, 'Business field must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

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
  const addSubmission = useContactStore((state) => state.addSubmission);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData & { message: string }>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData & { message: string }) => {
    try {
      addSubmission(data);
      reset();
      alert('Thank you for your message! Our team will contact you soon.');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-white to-gray-50">
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
                      {...register('businessField')}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
                      placeholder="Your industry"
                    />
                    {errors.businessField && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessField.message}</p>
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
                      <span>Sending...</span>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
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