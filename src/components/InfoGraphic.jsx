import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './InfoGraphic.css';
import CurveDental from '../assets/ScrollLogos/Curve Dental.svg';
import Denticon from '../assets/ScrollLogos/Denticon Logo.svg';
import Eaglesoft from '../assets/ScrollLogos/Eaglesoft Logo.png';
import Dentrix from '../assets/ScrollLogos/Dentrix Logo.svg';
import Fuse from '../assets/ScrollLogos/Fuse Dental.svg';
import OpenDental from '../assets/ScrollLogos/Open Dental Logo.png';

gsap.registerPlugin(ScrollTrigger);

const InfoGraphic = ({ isDarkMode }) => {
  const wheelRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const wheelWrapperRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Logo data with imported images
  const logos = [
    { id: 1, name: 'Denticon', image: Denticon },
    { id: 2, name: 'Dentrix', image: Dentrix },
    { id: 3, name: 'Curve', image: CurveDental },
    { id: 4, name: 'OpenDental', image: OpenDental },
    { id: 5, name: 'Fuse', image: Fuse },
    { id: 6, name: 'EagleSoft', image: Eaglesoft },
    { id: 7, name: 'Denticon2', image: Denticon },
    { id: 8, name: 'Dentrix2', image: Dentrix },
    { id: 9, name: 'Curve2', image: CurveDental },
    { id: 10, name: 'OpenDental2', image: OpenDental },
  ];

  // Wheel setup and rotation
  useEffect(() => {
    const wheel = wheelRef.current;
    const cards = wheel.querySelectorAll('.wheel__card');
    
    const setup = () => {
      const radius = wheel.offsetWidth / 2;
      const center = radius;
      const slice = 360 / cards.length;
      const DEG2RAD = Math.PI / 180;

      gsap.set(cards, {
        x: (i) => center + radius * Math.sin(i * slice * DEG2RAD),
        y: (i) => center - radius * Math.cos(i * slice * DEG2RAD),
        rotation: (i) => i * slice,
        xPercent: -50,
        yPercent: -50,
      });
    };

    setup();

    // Auto rotation
    animationRef.current = gsap.to(wheel, {
      rotation: -360,
      ease: 'none',
      duration: 30,
      repeat: -1,
    });

    // Handle resize
    const handleResize = () => setup();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label Animation
      gsap.from(labelRef.current, {
        scrollTrigger: {
          trigger: labelRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.1,
        ease: 'power3.out'
      });

      // Highlight Animation
      const highlight = titleRef.current.querySelector('.highlight');
      if (highlight) {
        gsap.from(highlight, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            once: true
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          delay: 0.2,
          ease: 'back.out(1.5)'
        });
      }

      // Subtitle Animation
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out'
      });

      // Wheel Animation
      gsap.from(wheelWrapperRef.current, {
        scrollTrigger: {
          trigger: wheelWrapperRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.4,
        ease: 'back.out(1.2)'
      });

      // CTA Section Animation
      gsap.from(ctaSectionRef.current, {
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: 0.5,
        ease: 'power2.out'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  return (
    <section className={`infographic ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      <div className="infographic-container">
        <div className="infographic-header">
          <div className="integration-label" ref={labelRef}>• Integration</div>
          <h2 className="infographic-title" ref={titleRef}>
            Seamless Integration with Your<br />
            <span className="highlight">Existing PMS</span>
          </h2>
          <p className="infographic-subtitle" ref={subtitleRef}>
            Connect with 80+ practice management systems in under 30 minutes.<br />
            No technical expertise required.
          </p>
        </div>

        {/* Wheel Carousel - Positioned to be half behind CTA */}
        <div className="wheel-wrapper" ref={wheelWrapperRef}>
          <section 
            className="slider-section"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`wheel ${isPaused ? 'paused' : ''}`} ref={wheelRef}>
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="wheel__card"
                >
                  <div className="logo-content">
                    <img 
                      src={logo.image} 
                      alt={logo.name}
                      className="logo-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom CTA Section */}
        <div className="bottom-cta-section" ref={ctaSectionRef}>
          <div className="cta-content">
            <h3 className="cta-title">
              Your competitors are<br />
              already using AI
            </h3>
            <button className="swipe cta-button" onClick={() => scrollToSection('calendar')}>
              Book a Discovery Call
              <span className="container">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoGraphic;