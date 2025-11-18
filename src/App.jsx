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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Detect mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Wait for everything to load before initializing ScrollTrigger
    const initializeApp = async () => {
      // Wait for DOM
      await new Promise(resolve => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', resolve, { once: true });
        } else {
          resolve();
        }
      });

      // Wait for images to load
      const images = Array.from(document.images);
      await Promise.all(
        images
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      );

      // Wait for fonts to load
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // Extra delay for mobile to ensure layout is stable
      if (isMobile) {
        await new Promise(resolve => setTimeout(resolve, 300));
      } else {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Mark as ready
      setIsReady(true);

      // Force multiple refreshes for mobile
      if (isMobile) {
        ScrollTrigger.refresh(true);
        setTimeout(() => ScrollTrigger.refresh(true), 200);
        setTimeout(() => ScrollTrigger.refresh(true), 500);
      } else {
        ScrollTrigger.refresh(true);
        setTimeout(() => ScrollTrigger.refresh(true), 300);
      }
    };

    initializeApp();

    // Handle mobile viewport height changes (address bar)
    if (isMobile) {
      function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      
      setVH();
      window.addEventListener('resize', setVH);
      window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
        setTimeout(() => ScrollTrigger.refresh(true), 200);
      });
    }

    // Refresh on resize with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
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

    // Cleanup
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