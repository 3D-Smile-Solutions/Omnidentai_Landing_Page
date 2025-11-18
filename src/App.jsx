import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Features from './components/Features';
import Results from './components/Results';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import EliteServices from './components/EliteServices';
import InfoGraphic from './components/InfoGraphic';
import Discovery from './components/Discovery';
import Calendar from './components/Calendar';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // Set dark mode as default (true)
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Mobile-first ScrollTrigger configuration
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true
    });

    // Custom scrollbar styling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
      }
      
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(style);

    // Unified refresh function
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    // Wait for images to load before initializing animations
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    });

    Promise.all(imagePromises).then(() => {
      // Multiple refreshes for stability
      setTimeout(refreshScrollTrigger, 100);
      setTimeout(refreshScrollTrigger, 500);
      setTimeout(refreshScrollTrigger, 1000);
    });

    // Window load event for fonts and remaining resources
    window.addEventListener('load', refreshScrollTrigger);

    // Resize handler with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        // Force reflow on mobile
        if (window.innerWidth <= 768) {
          document.body.style.overflow = 'hidden';
          setTimeout(() => {
            document.body.style.overflow = '';
          }, 100);
        }
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    // Mobile orientation change handling
    const handleOrientationChange = () => {
      setTimeout(refreshScrollTrigger, 500);
    };
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener('load', refreshScrollTrigger);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.head.removeChild(style);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Hero isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="main-content-wrapper">
        <div id="stats" className="snap-section">
          <Stats isDarkMode={isDarkMode} />
        </div>
        <div id="discovery" className="snap-section">
          <Discovery isDarkMode={isDarkMode} />
        </div>
        <div id="features" className="snap-section">
          <Features isDarkMode={isDarkMode} />
        </div>
        <div id="pricing" className="snap-section">
          <Pricing isDarkMode={isDarkMode} />
        </div>
        <div id="results" className="snap-section">
          <Results isDarkMode={isDarkMode} />
        </div>
        <div id="infographic" className="snap-section">
          <InfoGraphic isDarkMode={isDarkMode} />
        </div>
        <div id="calendar" className="snap-section">
          <Calendar isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default App;