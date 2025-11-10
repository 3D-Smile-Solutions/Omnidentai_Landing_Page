import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';
import Cal, { getCalApi } from "@calcom/embed-react";
import footerBg from '../assets/Footer.jpg';
import './Calendar.css';
import NavLogo from '../assets/Logo.png';

gsap.registerPlugin(ScrollTrigger);

const Calendar = ({ isDarkMode }) => {
  // Refs for animations
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const calendarEmbedRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const footerRef = useRef(null);
  const footerTopRef = useRef(null);
  const footerBottomRef = useRef(null);

  // State for responsive calendar dimensions and scroll indicator
  const [calendarDimensions, setCalendarDimensions] = useState({
    width: '900px',
    height: '700px'
  });
  
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Update calendar dimensions based on screen width - increased sizes
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width >= 1400) {
        setCalendarDimensions({ width: '900px', height: '750px' });
      } else if (width >= 1200) {
        setCalendarDimensions({ width: '800px', height: '700px' });
      } else if (width >= 1024) {
        setCalendarDimensions({ width: '700px', height: '650px' });
      } else if (width >= 768) {
        setCalendarDimensions({ width: '95%', height: '600px' });
      } else if (width >= 600) {
        setCalendarDimensions({ width: '100%', height: '550px' });
      } else if (width >= 480) {
        setCalendarDimensions({ width: '100%', height: '500px' });
      } else {
        setCalendarDimensions({ width: '100%', height: '450px' });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Cal.com API initialization
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "omnident-discovery" });
      cal("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view",
        theme: isDarkMode ? "dark" : "light"
      });
    })();
  }, [isDarkMode]);

  // Handle scroll indicator visibility
  useEffect(() => {
    const calendarElement = calendarEmbedRef.current;
    
    if (!calendarElement) return;

    const handleScroll = () => {
      const scrollTop = calendarElement.scrollTop;
      const scrollHeight = calendarElement.scrollHeight;
      const clientHeight = calendarElement.clientHeight;
      
      // Hide indicator if scrolled or if content doesn't overflow
      if (scrollTop > 50 || scrollHeight <= clientHeight) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    // Check initial state after a delay to allow Cal.com to load
    const checkOverflow = () => {
      if (!calendarElement) return;
      const scrollHeight = calendarElement.scrollHeight;
      const clientHeight = calendarElement.clientHeight;
      setShowScrollIndicator(scrollHeight > clientHeight + 50);
    };

    const timeoutId = setTimeout(checkOverflow, 2500);
    calendarElement.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      if (calendarElement) {
        calendarElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // GSAP Scroll Animations
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
        delay: 0.2,
        ease: 'power2.out'
      });

      // Calendar Embed Animation
      gsap.from(calendarEmbedRef.current, {
        scrollTrigger: {
          trigger: calendarEmbedRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
      });

      // Scroll Indicator Animation
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      // Footer Animations
      gsap.from(footerTopRef.current, {
        scrollTrigger: {
          trigger: footerTopRef.current,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out'
      });

      gsap.from(footerBottomRef.current, {
        scrollTrigger: {
          trigger: footerBottomRef.current,
          start: 'top 90%',
          once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <section className={`calendar-section ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      <div className="calendar-bg-wrapper">
        <img src={footerBg} alt="" className="calendar-bg-image"/>
        <div className="calendar-overlay"></div>
      </div>
      
      <div className="calendar-container">
        <div className="calendar-header">
          <span className="section-label" ref={labelRef}>• Integration</span>
          <h2 className="calendar-title" ref={titleRef}>
            Ready to Transform Your Practice?
            <br />Book Your Discovery Call
          </h2>
          <p className="calendar-subtitle" ref={subtitleRef}>
            See OmniDent.ai in action. Get a personalized demo and learn
            <br />how we can revolutionize your patient experience.
          </p>
        </div>

        <div className="calendar-embed-wrapper" ref={calendarEmbedRef}>
          <div className="calendar-widget">
            <div className="calendar-widget-header">
              <FiCalendar className="calendar-icon" />
              <span>Select Your Preferred Time</span>
            </div>
            <div 
              className="calendar-embed-container"
              ref={calendarEmbedRef}
              style={{ 
                width: calendarDimensions.width, 
                height: calendarDimensions.height, 
                overflow: 'auto',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
            >
              <Cal 
                namespace="omnident-discovery"
                calLink="omnident.ai/omnident-discovery"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ 
                  layout: "month_view", 
                  theme: isDarkMode ? "dark" : "auto" 
                }}
              />
              {showScrollIndicator && (
                <div className="scroll-indicator" ref={scrollIndicatorRef}>
                  <FiChevronDown className="scroll-icon" />
                  <span>Scroll to see more dates</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="footer-info" ref={footerRef}>
          {/* Top Section - Navigation and Contact */}
          <div className="footer-top" ref={footerTopRef}>
            <div className="footer-left">
              <div className="footer-nav-section">
                <h4 className="footer-section-title">Quick Links</h4>
                <div className="footer-nav-links">
                  <div className="nav-column">
                    <a href="#home" className="footer-link">Home</a>
                    <a href="#platform" className="footer-link">Platform</a>
                    <a href="#pricing" className="footer-link">Pricing</a>
                  </div>
                  <div className="nav-column">
                    <a href="#patient-journey" className="footer-link">Patient Journey</a>
                    <a href="#results" className="footer-link">Results</a>
                    <a href="#smilenexus" className="footer-link">SmileNexus</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-right">
              <div className="footer-cta-section">
                <h3>Contact us to explore partnerships,<br />collaborations, or simply to say hello.</h3>
                <button className="footer-chat-btn">Let's Chat</button>
              </div>
              
              <div className="footer-contact-section">
                <p className="contact-label">Contact</p>
                <a href="mailto:hello@omnident.com" className="contact-email">han@omnident.ai</a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Logo, Location and Copyright */}
          <div className="footer-bottom" ref={footerBottomRef}>
            <div className="footer-bottom-content">
              <div className="footer-logo-wrapper">
                <img src={NavLogo} alt="OmniDent AI Logo" className="footer-logo" />
              </div>
              
              <div className="footer-meta">
                <p className="footer-location">San Francisco</p>
                <span className="footer-divider">•</span>
                <p className="footer-copyright">©2025 OmniDent All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Calendar;