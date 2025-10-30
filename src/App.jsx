import React, { useState, useEffect, useRef } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const appRef = useRef(null);
  const isScrollLocked = useRef(false);

  // Animation durations for each section (in milliseconds)
  // Adjust these based on your actual animation durations + delays
  const sectionAnimationDurations = {
    hero: 1800,        // Hero animations take ~1.8s
    stats: 2000,       // Stats animations take ~2s
    features: 1500,    // Features animations take ~1.5s
    discovery: 1300,   // Discovery animations take ~1.3s
    pricing: 1700,     // Pricing animations take ~1.7s
    results: 1600,     // Results animations take ~1.6s
    infographic: 2000, // InfoGraphic animations take ~2s
    calendar: 1800     // Calendar animations take ~1.8s
  };

  useEffect(() => {
    const sections = gsap.utils.toArray('.snap-section');
    
    sections.forEach((section) => {
      const sectionId = section.id;
      const animationDuration = sectionAnimationDurations[sectionId] || 1500;
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        snap: {
          snapTo: 1,
          duration: { min: 0.5, max: 1 },
          delay: 0.1,
          ease: 'power2.inOut'
        },
        onEnter: () => {
          if (!isScrollLocked.current) {
            lockScroll(animationDuration);
          }
        },
        onEnterBack: () => {
          if (!isScrollLocked.current) {
            lockScroll(animationDuration);
          }
        }
      });
    });

    // Lock scroll function
    const lockScroll = (duration) => {
      isScrollLocked.current = true;
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        document.body.style.overflow = '';
        isScrollLocked.current = false;
      }, duration);
    };

    return () => {
      // Cleanup
      document.body.style.overflow = '';
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`} ref={appRef}>
      <div id="hero" className="snap-section">
        <Hero isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      </div>
      <div id="stats" className="snap-section">
        <Stats isDarkMode={isDarkMode} />
      </div>
      <div id="features" className="snap-section">
        <Features isDarkMode={isDarkMode} />
      </div>
      <div id="discovery" className="snap-section">
        <Discovery isDarkMode={isDarkMode} />
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
  );
};

export default App;