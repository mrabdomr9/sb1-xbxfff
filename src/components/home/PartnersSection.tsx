import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { usePartnerStore } from '../../store/partnerStore';
import AnimatedSection from '../AnimatedSection';

const PartnersSection = () => {
  const { partners } = usePartnerStore();

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Trusted Technology Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with industry leaders to deliver cutting-edge solutions
          </p>
        </div>

        <Splide
          options={{
            perPage: 4,
            gap: '2rem',
            arrows: true,
            pagination: false,
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            breakpoints: {
              1024: { perPage: 3 },
              768: { perPage: 2 },
              640: { perPage: 1 }
            }
          }}
          className="partners-slider"
        >
          {partners.map((partner) => (
            <SplideSlide key={partner.id}>
              <div className="group relative bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#04968d]/20 to-[#213c4d]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Partner Logo with Hover Effect */}
                <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-24 object-contain filter group-hover:brightness-110"
                  />
                </div>
                
                {/* Partner Name with Fade-in Effect */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#213c4d] to-transparent p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-center text-sm font-medium">
                    {partner.name}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#04968d]/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#213c4d]/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </AnimatedSection>
  );
};

export default PartnersSection;