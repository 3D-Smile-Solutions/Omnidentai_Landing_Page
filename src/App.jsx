import React, { useState, useEffect } from 'react';
import { gsap } from "gsap";
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 1000;

    // Function to refresh ScrollTrigger
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    // Wait for everything to load
    const initApp = () => {
      if (document.readyState === 'complete') {
        // Page already loaded
        if (isMobile) {
          // Mobile needs extra time for layout to settle
          setTimeout(refreshScrollTrigger, 200);
          setTimeout(refreshScrollTrigger, 500);
          setTimeout(refreshScrollTrigger, 1000);
        } else {
          setTimeout(refreshScrollTrigger, 100);
        }
      } else {
        // Wait for load event
        window.addEventListener('load', () => {
          if (isMobile) {
            setTimeout(refreshScrollTrigger, 200);
            setTimeout(refreshScrollTrigger, 500);
            setTimeout(refreshScrollTrigger, 1000);
          } else {
            setTimeout(refreshScrollTrigger, 100);
          }
        }, { once: true });
      }
    };

    initApp();

    // Handle resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

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

    return () => {
      window.removeEventListener('resize', handleResize);
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