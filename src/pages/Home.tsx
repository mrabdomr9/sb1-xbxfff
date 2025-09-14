import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Users, Globe, CheckCircle, Zap, Shield, Clock, Database, Monitor } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/AnimatedSection';
import PartnersSection from '../components/home/PartnersSection';
import MarketingSection from '../components/home/MarketingSection';
import ProjectsSection from '../components/home/ProjectsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import DifferentiatorsSection from '../components/home/DifferentiatorsSection';
import { useStatsStore } from '../store/statsStore';

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Active Soft",
  "url": "https://activesoft.com",
  "logo": "https://activesoft.com/Untitled designfdfdsd.jpg",
  "description": "Leading Oracle ERP implementation and custom desktop application development company in Egypt",
  "foundingDate": "2008",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sadat City",
    "addressCountry": "Egypt"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+20-1225077433",
      "contactType": "customer support"
    },
    {
      "@type": "ContactPoint", 
      "telephone": "+20-1006467081",
      "contactType": "sales"
    }
  ],
  "serviceType": [
    "Oracle ERP Implementation",
    "Custom Desktop Application Development",
    "Enterprise Software Solutions"
  ]
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#04968d]"></div>
  </div>
);

const HeroSection = () => {
  const visitors = useStatsStore((state) => state.visitors);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#213c4d] via-[#2a4a5e] to-[#04968d]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#04968d]/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-[#04968d] rotate-45 animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-6 h-6 border-2 border-white/20 rotate-12 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fadeInUp">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-[#04968d]">
              Transform Your Business
            </span>
            <br />
            <span className="text-white">
              Through Technology
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 animate-fadeInUp text-gray-200 max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Your gateway to professional <span className="text-[#04968d] font-semibold">Oracle ERP systems</span> and 
            powerful <span className="text-[#04968d] font-semibold">Windows Desktop solutions</span> that drive innovation and accelerate growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/services"
              className="group relative inline-flex items-center justify-center space-x-3 bg-[#04968d] px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 animate-fadeInUp shadow-2xl hover:shadow-[#04968d]/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#04968d] to-[#05a89a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative text-lg font-semibold text-white">Explore Our Services</span>
              <ArrowRight className="relative h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center space-x-3 border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 animate-fadeInUp shadow-xl"
            >
              <span className="text-lg font-semibold text-white">Get Started Today</span>
              <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            {[
              { number: '15+', label: 'Years Experience', icon: Award },
              { number: visitors > 0 ? `${Math.floor(visitors / 10) + 200}+` : '200+', label: 'Happy Clients', icon: Users },
              { number: '15+', label: 'Countries', icon: Globe },
              { number: '24/7', label: 'Support', icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                  <stat.icon className="w-8 h-8 text-[#04968d] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      icon: Database,
      title: "Oracle ERP Mastery",
      description: "15+ years of Oracle implementation expertise across industries",
      stats: "500+ Implementations",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Monitor,
      title: "Custom Development",
      description: "Tailored Windows applications that perfectly fit your workflow",
      stats: "1000+ Applications",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security protocols protecting your business data",
      stats: "99.9% Security Rating",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Rapid Innovation",
      description: "Cutting-edge solutions delivered with agile methodologies",
      stats: "30% Faster Delivery",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#04968d] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#213c4d] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#04968d]/10 backdrop-blur-sm border border-[#04968d]/20 rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-[#04968d]" />
            <span className="text-[#04968d] text-sm font-medium">Industry Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Where Technology Meets Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses through innovative Oracle ERP solutions and custom software development. 
            Our proven expertise delivers results that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {expertiseAreas.map((area, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${area.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Icon with Gradient Background */}
              <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-r ${area.gradient} mb-6 shadow-lg`}>
                <area.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-[#213c4d] mb-3 group-hover:text-[#04968d] transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {area.description}
                </p>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${area.gradient} text-white text-sm font-semibold shadow-md`}>
                  <span>{area.stats}</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#04968d]/5 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#213c4d]/5 to-transparent rounded-tr-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-[#213c4d] mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join industry leaders who trust Active Soft for their digital transformation journey. 
              Let's discuss how we can accelerate your business growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center space-x-2 bg-[#04968d] text-white px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center justify-center space-x-2 border-2 border-[#04968d] text-[#04968d] px-8 py-4 rounded-xl hover:bg-[#04968d] hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const CTASection = () => {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-r from-[#213c4d] to-[#04968d] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Join the digital revolution with our cutting-edge enterprise solutions. 
            Let's build the future of your business together.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center space-x-3 bg-white text-[#213c4d] px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl font-semibold"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/services"
              className="group inline-flex items-center justify-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <span>View Our Solutions</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Active Soft - Oracle ERP Implementation & Custom Desktop Solutions | Egypt's Leading Software Company"
        description="Transform your business with Active Soft's Oracle ERP implementation, custom Windows desktop applications, and enterprise solutions. 15+ years experience, 500+ successful implementations across 15+ countries."
        keywords="Oracle ERP implementation, custom desktop applications, enterprise software solutions, Windows desktop development, business automation, ERP consulting Egypt"
        url="https://activesoft.com/"
        structuredData={homeStructuredData}
      />
      <HeroSection />
      <ExpertiseSection />
      <DifferentiatorsSection />
      <FeaturesSection />
      <ProjectsSection />
      <MarketingSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
};

export default Home;