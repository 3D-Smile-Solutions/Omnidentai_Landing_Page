import React, { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import heroGif from '../assets/Hero.gif';
import heroBG from '../assets/HeroBgAnimation.mp4';
import NavLogo from '../assets/Logo.png';
import { HiArrowRight } from 'react-icons/hi';

import CardNav from '../StylingComponents/CardNav.jsx';
import Navbar from '../StylingComponents/Navbar.jsx';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ issDarkMode, toggleDarkMode }) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const items = [
    {
      label: "Products",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Features", href: "#features", ariaLabel: "View Features" },
        { label: "Platform", href: "#platform", ariaLabel: "Platform Overview" }
      ]
    },
    {
      label: "Solutions", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Patient Journey", href: "#patient-journey", ariaLabel: "Patient Journey" },
        { label: "SmileNexus", href: "#smilenexus", ariaLabel: "SmileNexus Solution" }
      ]
    },
    {
      label: "Company",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Pricing", href: "#pricing", ariaLabel: "View Pricing" },
        { label: "Results", href: "#results", ariaLabel: "View Results" }
      ]
    }
  ];

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs for animations
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroSloganRef = useRef(null);
  const infoBox1Ref = useRef(null);

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
      // Hero Title Animation
      gsap.from(heroTextRef.current, {
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });

      // Slogan Animation
      gsap.from(heroSloganRef.current, {
        scrollTrigger: {
          trigger: heroSloganRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
      });

      // Info Box Animation
      gsap.from(infoBox1Ref.current, {
        scrollTrigger: {
          trigger: infoBox1Ref.current,
          start: 'top 90%',
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`hero-section ${isDarkMode ? 'dark' : 'light'}`} ref={heroRef}>
      {/* Video Background Container with rounded corners */}
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
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Content */}
      <div className="hero-content-wrapper">
        {/* Title Section - Below Navbar */}
        <div className="hero-title-section" ref={heroTextRef}>
          <h1 className="hero-title">
            <span className="highlight">DO MORE DENTISTRY</span>
          </h1>
        </div>
        
        {/* Description Section - Bottom Left */}
        <div className="hero-description-section" ref={infoBox1Ref}>
          <div className="info-box-description">
            <p className="info-box-content">
              Unlock the power of precision dentistry with OmniDent AI unified platform that brings together AI chatflow, imaging insights and advanced analytics for smarter clinical decisions.
            </p>
            <div className="info-box-features">
              <span className="feature-badge">HIPAA Compliant</span>
              <span className="feature-badge">OmniChannel</span>
              <span className="feature-badge">30-day money back guarantee</span>
            </div>
          </div>
          
          {/* CTA Button below description */}
          <button
            type="button"
            className="hero-cta-button"
            style={{ 
              backgroundColor: isDarkMode ? "#fff" : "#111",
              color: isDarkMode ? "#000" : "#fff"
            }}
          >
            Book a Demo
            <HiArrowRight className="button-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;