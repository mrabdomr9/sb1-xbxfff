import React from 'react';
import { Code2, Rocket, Users2, Clock, Shield, HeartHandshake } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AnimatedSection from '../AnimatedSection';

const differentiators = [
  {
    icon: Code2,
    title: "Custom Solutions",
    description: "Tailored software that perfectly fits your business needs, not generic one-size-fits-all solutions."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security protocols ensuring your business data remains protected at all times."
  },
  {
    icon: Users2,
    title: "Expert Team",
    description: "Seasoned developers and consultants with deep industry knowledge and technical expertise."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical assistance ensuring your systems run smoothly at all times."
  },
  {
    icon: Rocket,
    title: "Rapid Implementation",
    description: "Swift deployment methodologies that minimize business disruption and maximize ROI."
  },
  {
    icon: HeartHandshake,
    title: "Long-term Partnership",
    description: "We're not just vendors; we're your technology partners committed to your success."
  }
];

const DifferentiatorsSection = () => {
  return (
    <AnimatedSection className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            What Makes Us Different?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine technical excellence with industry expertise to deliver solutions that drive real business value.
          </p>
        </div>

        <Splide
          options={{
            perPage: 3,
            gap: '2rem',
            pagination: false,
            arrows: true,
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
              1024: { perPage: 2 },
              640: { perPage: 1 }
            }
          }}
          className="differentiators-slider"
        >
          {differentiators.map((item, index) => (
            <SplideSlide key={index}>
              <div
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover-lift gradient-border h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-[#04968d]/10">
                    <item.icon className="h-6 w-6 text-[#04968d]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#213c4d]">{item.title}</h3>
                </div>
                <p className="text-gray-600 ml-14">{item.description}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </AnimatedSection>
  );
};

export default DifferentiatorsSection;