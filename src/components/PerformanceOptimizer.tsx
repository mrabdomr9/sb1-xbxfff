import React, { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero image
      const heroImage = new Image();
      heroImage.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop';
      
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);
    };

    // Optimize images for better loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Add intersection observer for animations
    const addAnimationObserver = () => {
      const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeInScale, .animate-slideInLeft, .animate-slideInRight');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      animatedElements.forEach(el => observer.observe(el));
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeImages();
    addAnimationObserver();

    // Cleanup
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;