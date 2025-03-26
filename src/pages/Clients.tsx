import React from 'react';
import { useClientStore } from '../store/clientStore';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AnimatedSection from '../components/AnimatedSection';
import { Building2, Users, Globe2, ArrowRight } from 'lucide-react';

const ClientStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Building2 className="w-8 h-8 text-[#04968d] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-[#213c4d] mb-2">200+</h3>
        <p className="text-gray-600">Active Clients</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Users className="w-8 h-8 text-[#04968d] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-[#213c4d] mb-2">50K+</h3>
        <p className="text-gray-600">End Users</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Globe2 className="w-8 h-8 text-[#04968d] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-[#213c4d] mb-2">15+</h3>
        <p className="text-gray-600">Countries</p>
      </div>
    </div>
  );
};

const Clients = () => {
  const { clients } = useClientStore();

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Trusted Clients</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to work with industry leaders who trust us to deliver exceptional solutions
            </p>
          </div>

          <ClientStats />

          <Splide
            options={{
              perPage: 3,
              gap: '2rem',
              arrows: true,
              pagination: true,
              autoplay: true,
              interval: 4000,
              pauseOnHover: true,
              breakpoints: {
                1024: { perPage: 2 },
                640: { perPage: 1 }
              }
            }}
            className="clients-slider mb-16"
          >
            {clients.map((client) => (
              <SplideSlide key={client.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#213c4d] mb-3 group-hover:text-[#04968d] transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{client.description}</p>
                    <button className="flex items-center text-[#04968d] font-medium group/btn">
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your business with our enterprise solutions and join our growing list of satisfied clients
            </p>
            <button className="bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors inline-flex items-center space-x-2">
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Clients;