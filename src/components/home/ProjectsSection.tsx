import React, { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AnimatedSection from '../AnimatedSection';
import { useProjects } from '../../hooks/useDatabaseIntegration';
import { ArrowRight } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-96">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04968d]"></div>
    <span className="ml-3 text-gray-600">Loading projects...</span>
  </div>
);

const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center h-96 text-center">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
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

const ProjectsSection: React.FC = () => {
  const { data: projects, loading, error, refresh } = useProjects();

  if (loading) {
    return (
      <AnimatedSection className="h-screen relative bg-[#213c4d] overflow-hidden">
        <LoadingSpinner />
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection className="h-screen relative bg-[#213c4d] overflow-hidden">
        <ErrorMessage message={`Failed to load projects: ${error}`} onRetry={refresh} />
      </AnimatedSection>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <AnimatedSection className="h-screen relative bg-[#213c4d] overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">No Projects Available</h2>
          <p className="text-gray-300">Check back soon for our latest work!</p>
        </div>
      </AnimatedSection>
    );
  }

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