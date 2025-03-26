import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PartnersSection from '../components/home/PartnersSection';
import MarketingSection from '../components/home/MarketingSection';
import ProjectsSection from '../components/home/ProjectsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import DifferentiatorsSection from '../components/home/DifferentiatorsSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#213c4d] text-white min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#213c4d] to-[#04968d] opacity-10 animate-pulse"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#04968d]/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Transforming Business Through Technology
            </h1>
            <p className="text-xl md:text-2xl mb-12 animate-fadeInUp text-gray-300 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
              Your gateway to professional Oracle ERP systems and powerful Windows Desktop solutions that drive innovation and growth.
            </p>
            <div className="flex justify-center gap-6" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/services"
                className="group inline-flex items-center space-x-2 bg-[#04968d] px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 animate-fadeInUp shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">Explore Our Services</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-2 border-2 border-[#04968d] px-8 py-4 rounded-lg hover:bg-[#04968d] transition-all duration-300 transform hover:scale-105 animate-fadeInUp shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Sections - Reordered for better flow */}
      <DifferentiatorsSection />
      <FeaturesSection />
      <ProjectsSection />
      <MarketingSection />
      <PartnersSection />
    </div>
  );
};

export default Home;