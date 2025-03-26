import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AnimatedSection from '../AnimatedSection';

const marketingContent = [
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    title: "Enterprise Solutions",
    description: "Delivering cutting-edge Oracle ERP solutions that transform businesses. Our proven track record spans across industries, from manufacturing to healthcare.",
    stat: "500+",
    statLabel: "Implementations"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80",
    title: "Expert Team",
    description: "Our certified Oracle consultants and developers bring decades of combined experience in enterprise solutions and digital transformation.",
    stat: "50+",
    statLabel: "Oracle Experts"
  },
  {
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    title: "Global Reach",
    description: "Supporting businesses across continents with localized solutions and round-the-clock technical assistance. Your success is our priority.",
    stat: "20+",
    statLabel: "Countries"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80",
    title: "Client Success",
    description: "Building lasting partnerships through continuous innovation and dedicated support. Our client satisfaction speaks volumes about our commitment.",
    stat: "98%",
    statLabel: "Satisfaction Rate"
  }
];

const MarketingSection = () => {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Driving Business Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your business with our enterprise solutions and expert services
          </p>
        </div>

        <Splide
          options={{
            perPage: 2,
            gap: '2rem',
            arrows: true,
            pagination: true,
            autoplay: true,
            interval: 4500,
            pauseOnHover: true,
            breakpoints: {
              768: { perPage: 1 }
            }
          }}
          className="marketing-slider"
        >
          {marketingContent.map((item, index) => (
            <SplideSlide key={index}>
              <div
                className="group relative overflow-hidden rounded-xl shadow-lg hover-lift bg-white h-[500px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213c4d]/90 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <div className="text-right">
                          <span className="block text-3xl font-bold text-[#04968d]">
                            {item.stat}
                          </span>
                          <span className="text-sm text-gray-200">{item.statLabel}</span>
                        </div>
                      </div>
                      <p className="text-gray-200 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </AnimatedSection>
  );
};

export default MarketingSection;