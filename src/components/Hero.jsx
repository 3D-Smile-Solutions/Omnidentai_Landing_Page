import React, { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import heroGif from '../assets/Hero.gif';
import heroBG from '../assets/HeroBgAnimation.mp4';
import NavLogo from '../assets/Logo.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs for animations
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const infoBox1Ref = useRef(null);
  const infoBox2Ref = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false); // Close mobile menu after clicking
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Title Animation - plays on load and when scrolling back to top
      gsap.from(heroTextRef.current, {
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Info Box 1 Animation
      gsap.from(infoBox1Ref.current, {
        scrollTrigger: {
          trigger: infoBox1Ref.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Info Box 2 Animation
      gsap.from(infoBox2Ref.current, {
        scrollTrigger: {
          trigger: infoBox2Ref.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power2.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`hero ${isDarkMode ? 'dark' : 'light'}`} ref={heroRef}>
      {/* Video Background */}
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
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <img src={NavLogo} alt="OmniDent AI Logo" className="logo-icon" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-center">
            <a onClick={() => scrollToSection('features')} className="nav-link">FEATURES</a>
            <a onClick={() => scrollToSection('stats')} className="nav-link">PATIENT JOURNEY</a>
            <a onClick={() => scrollToSection('discovery')} className="nav-link">PLATFORM</a>
            <a onClick={() => scrollToSection('results')} className="nav-link">RESULTS</a>
            <a onClick={() => scrollToSection('pricing')} className="nav-link">PRICING</a>
            <a href="https://smilenexus.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-link">SMILENEXUS</a>
          </div>
          
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a className="swipe nav-demo-btn" onClick={() => scrollToSection('calendar')}>
              Request a Demo
              <span className="container">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path>
                </svg>
              </span>
            </a>
            
            {/* Hamburger Menu Button */}
            <button className="hamburger-menu" onClick={toggleMenu}>
              {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollToSection('features')} className="mobile-nav-link">FEATURES</a>
          <a onClick={() => scrollToSection('stats')} className="mobile-nav-link">PATIENT JOURNEY</a>
          <a onClick={() => scrollToSection('discovery')} className="mobile-nav-link">PLATFORM</a>
          <a onClick={() => scrollToSection('results')} className="mobile-nav-link">RESULTS</a>
          <a onClick={() => scrollToSection('pricing')} className="mobile-nav-link">PRICING</a>
          <a href="https://smilenexus.vercel.app/" target="_blank" rel="noopener noreferrer" className="mobile-nav-link">SMILENEXUS</a>
          <a className="swipe mobile-demo-btn" onClick={() => scrollToSection('calendar')}>
            Request a Demo
            <span className="container">
              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path>
              </svg>
            </span>
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text" ref={heroTextRef}>
          <h1 className="hero-title">
            <span className="highlight">Grow Your Practice</span>,<br /> Not Your Workload.
          </h1>
        </div>
        
        <div className="hero-visual">
          <div className="info-boxes-container">
            {/* First Info Box */}
            <div className="info-box info-box-1" ref={infoBox1Ref}>
              <p className="info-box-content">
                Unlock the power of precision dentistry with OmniDent AI unified platform that brings together AI chatflow, imaging insights and advanced analytics for smarter clinical decisions.
              </p>
            </div>

            {/* Second Info Box */}
            <div className="info-box info-box-2" ref={infoBox2Ref}>
              <div className="info-box-features">
                <span className="feature-text">HIPAA Compliant</span>
                <span className="feature-text">OmniChannel</span>
                <span className="feature-text">30-day money back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;