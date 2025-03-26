import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AnimatedSection from '../AnimatedSection';
import { useProjectStore } from '../../store/projectStore';
import { ArrowRight } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const projects = useProjectStore((state) => state.projects);

  return (
    <AnimatedSection className="h-screen relative bg-[#213c4d] overflow-hidden">
      <div className="relative h-full">
        <Splide
          options={{
            type: 'fade',
            rewind: true,
            arrows: true,
            pagination: true,
            autoplay: true,
            interval: 6000,
            pauseOnHover: true,
            resetProgress: false,
            height: '100vh',
          }}
          className="h-full project-slider"
        >
          {projects.map((project) => (
            <SplideSlide key={project.id}>
              <div className="relative h-full group">
                {/* Background Image with Parallax */}
                <div className="absolute inset-0 transition-transform duration-[2s] group-hover:scale-110">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-1000" />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-2xl font-semibold text-[#04968d] mb-4 transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000">
                        Featured Project
                      </h2>
                      <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
                        {project.title}
                      </h3>
                      <p className="text-xl md:text-2xl text-gray-300 mb-12 transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 delay-200 leading-relaxed">
                        {project.description}
                      </p>
                      <button className="inline-flex items-center space-x-3 bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 delay-300 text-lg">
                        <span>View Case Study</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div className="h-full bg-[#04968d] w-0 group-hover:w-full transition-all duration-[6000ms] ease-linear" />
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#04968d]/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#04968d]/20 to-transparent pointer-events-none" />
    </AnimatedSection>
  );
};

export default ProjectsSection;