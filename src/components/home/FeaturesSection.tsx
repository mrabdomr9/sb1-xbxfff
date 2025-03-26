import React from 'react';
import { Database, Monitor, Shield } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AnimatedSection from '../AnimatedSection';

const features = [
  {
    Icon: Database,
    title: "Oracle ERP Solutions",
    description: "Enterprise-grade solutions that streamline operations and boost efficiency.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    Icon: Monitor,
    title: "Desktop Applications",
    description: "Custom Windows applications tailored to your business needs.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    Icon: Shield,
    title: "Secure Solutions",
    description: "Bank-grade security protecting your valuable business data.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  }
];

const FeatureCard = ({ feature: { Icon, title, description, image } }) => (
  <div className="group relative overflow-hidden rounded-xl shadow-lg hover-lift h-[400px]">
    <div className="absolute inset-0">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#213c4d] to-transparent opacity-90"></div>
    </div>
    
    <div className="relative p-8 h-full flex flex-col justify-end">
      <div className="mb-4 p-3 rounded-lg bg-white/10 w-fit">
        <Icon className="h-8 w-8 text-[#04968d]" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-200">{description}</p>
      
      <div className="mt-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button className="text-white flex items-center space-x-2 group/btn">
          <span>Learn More</span>
          <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <AnimatedSection className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Comprehensive Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of enterprise solutions designed to transform your business operations
          </p>
        </div>

        <Splide
          options={{
            perPage: 1,
            gap: '2rem',
            arrows: true,
            pagination: true,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            type: 'loop',
          }}
          className="features-slider"
        >
          {features.map((feature, index) => (
            <SplideSlide key={index}>
              <FeatureCard feature={feature} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </AnimatedSection>
  );
};

export default FeaturesSection;