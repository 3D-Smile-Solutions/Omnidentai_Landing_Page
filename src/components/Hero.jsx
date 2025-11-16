import React, { useState, useEffect, useRef } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import heroBG from '../assets/HeroBgAnimation.mp4';
import Navbar from '../StylingComponents/Navbar.jsx';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs for animations
  const heroRef = useRef(null);
  const heroContainerRef = useRef(null);
  const heroTextRef = useRef(null);
  const infoBoxRef = useRef(null);
  const scrollTextRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Container Scale & Fade - Shrinks and fades as you scroll past it
      gsap.to(heroContainerRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top', // Completes when hero exits viewport
          scrub: 1,
          // markers: true, // Uncomment to debug
        },
        scale: 0.85,
        opacity: 0,
        borderRadius: '40px',
        ease: 'none'
      });

      // Hero Title Animation - Initial Load
      gsap.from(heroTextRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Info Box Animation - Initial Load
      gsap.from(infoBoxRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });

      // Scroll Text Animation - Initial Load
      gsap.from(scrollTextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.9
      });

      // Fade out scroll text on scroll
      gsap.to(scrollTextRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '20% top',
          scrub: 1,
        },
        opacity: 0,
        y: -20,
        ease: 'none'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`hero-section ${isDarkMode ? 'dark' : 'light'}`} ref={heroRef} id="home">
      {/* Rounded Container - This is what scales */}
      <div className="hero-rounded-container" ref={heroContainerRef}>
        
        {/* Video Background */}
        <div className="hero-video-container">
          <video 
            className="hero-video-bg" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={heroBG} type="video/mp4" />
          </video>
          
          {/* Dark Overlay */}
          <div className="hero-overlay"></div>
        </div>
        
        {/* Navigation - Pass props */}
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Hero Content */}
        <div className="hero-content-wrapper">
          {/* Title Section - Center Aligned */}
          <div className="hero-title-section" ref={heroTextRef}>
            <h1 className="hero-title">
              DO MORE <span className="title-accent">DENTISTRY</span>
            </h1>
            
            {/* Subtitle */}
            <p className="hero-subtitle">Unlock the power of precision dentistry with OmniDent, a unified platform that brings together AI charting,<br /> imaging insights and advanced analytics for smarter clinical decisions.</p>
            
            {/* Feature Tags */}
            <div className="info-features" ref={infoBoxRef}>
              <span className="feature-badge">HIPAA Compliant</span>
              <span className="feature-badge">OmniChannel</span>
              <span className="feature-badge">30-day money back guarantee</span>
            </div>
          </div>
          
          {/* Scroll to Explore Text - Center Bottom */}
          <div className="hero-scroll-text" ref={scrollTextRef}>
            <p>Scroll to Explore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;