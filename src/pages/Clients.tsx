import React from 'react';
import { useClients } from '../hooks/useDatabaseIntegration';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AnimatedSection from '../components/AnimatedSection';
import { Building2, Users, Globe2, ArrowRight } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04968d]"></div>
    <span className="ml-3 text-gray-600">Loading clients...</span>
  </div>
);

const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="text-center py-20">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

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
  const { data: clients, loading, error, refresh } = useClients();
  
  // Load clients data on component mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  if (loading) {
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
            <LoadingSpinner />
          </AnimatedSection>
        </div>
      </div>
    );
  }

  if (error) {
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
            <ErrorMessage message={`Failed to load clients: ${error}`} onRetry={refresh} />
          </AnimatedSection>
        </div>
      </div>
    );
  }

  if (!clients || clients.length === 0) {
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
            <div className="text-center py-20">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
                <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Building Our Client Portfolio</h3>
                <p className="text-blue-600">We're working with amazing clients and will showcase them here soon!</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

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