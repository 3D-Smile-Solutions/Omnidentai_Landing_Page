import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiArrowRight } from 'react-icons/hi';
import LogoLoop from '../StylingComponents/LogoLoop.jsx';
import './InfoGraphic.css';
import CurveDental from '../assets/ScrollLogos/Curve Dental.svg';
import Denticon from '../assets/ScrollLogos/Denticon Logo.svg';
import Eaglesoft from '../assets/ScrollLogos/Eaglesoft Logo.png';
import Dentrix from '../assets/ScrollLogos/Dentrix Logo.svg';
import Fuse from '../assets/ScrollLogos/Fuse Dental.svg';
import OpenDental from '../assets/ScrollLogos/Open Dental Logo.png';

gsap.registerPlugin(ScrollTrigger);

const InfoGraphic = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const logoLoopRef = useRef(null);
  const ctaSectionRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const dentalLogos = [
    { src: Denticon, alt: 'Denticon', href: '#' },
    { src: Dentrix, alt: 'Dentrix', href: '#' },
    { src: CurveDental, alt: 'Curve Dental', href: '#' },
    { src: OpenDental, alt: 'Open Dental', href: '#' },
    { src: Fuse, alt: 'Fuse Dental', href: '#' },
    { src: Eaglesoft, alt: 'Eaglesoft', href: '#' },
    { src: Denticon, alt: 'Denticon', href: '#' },
    { src: Dentrix, alt: 'Dentrix', href: '#' },
    { src: CurveDental, alt: 'Curve Dental', href: '#' },
    { src: OpenDental, alt: 'Open Dental', href: '#' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        scrollTrigger: { trigger: labelRef.current, start: 'top 80%', once: true },
        opacity: 0, y: -20, duration: 0.5, ease: 'power2.out'
      });

      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 30, duration: 0.6, delay: 0.1, ease: 'power3.out'
      });

      const highlight = titleRef.current.querySelector('.highlight');
      if (highlight) {
        gsap.from(highlight, {
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
          opacity: 0, scale: 0.9, duration: 0.6, delay: 0.2, ease: 'back.out(1.5)'
        });
      }

      gsap.from(subtitleRef.current, {
        scrollTrigger: { trigger: subtitleRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 20, duration: 0.6, delay: 0.3, ease: 'power2.out'
      });

      gsap.from(logoLoopRef.current, {
        scrollTrigger: { trigger: logoLoopRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 0.8, delay: 0.4, ease: 'power2.out'
      });

      gsap.from(ctaSectionRef.current, {
        scrollTrigger: { trigger: ctaSectionRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 50, duration: 0.8, delay: 0.5, ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

        <div className="logo-loop-wrapper" ref={logoLoopRef}>
          <div className="logo-loop-container">
            <LogoLoop
              logos={dentalLogos}
              speed={80}
              direction="left"
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor={isDarkMode ? "#1a1a1a" : "#ffffff"}
              ariaLabel="Practice Management System Partners"
            />
          </div>
        </div>

        <div className="bottom-cta-section" ref={ctaSectionRef}>
          <div className="cta-overlay"></div>
          <div className="cta-content">
            <h3 className="cta-title">
              Your competitors are<br />
              already using AI
            </h3>
            <button 
              type="button"
              className="cta-button" 
              onClick={() => scrollToSection('calendar')}
              style={{ 
                backgroundColor: isDarkMode ? "#fff" : "#111",
                color: isDarkMode ? "#000" : "#fff"
              }}
            >
              Book a Discovery Call
              <HiArrowRight className="button-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoGraphic;