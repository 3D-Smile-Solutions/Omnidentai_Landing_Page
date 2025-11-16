import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
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
    // Initialize Lenis smooth scroll globally
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 0.8, // Slightly slower scroll
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Simple approach: just hide the scrollbar to prevent fast dragging
    // Users can still scroll smoothly with mouse wheel or trackpad
    const style = document.createElement('style');
    style.textContent = `
      html {
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

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
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