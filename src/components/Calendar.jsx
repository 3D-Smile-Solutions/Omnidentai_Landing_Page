import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCalendar } from 'react-icons/fi';
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
  const footerLeftRef = useRef(null);
  const footerRightRef = useRef(null);
  const footerBottomRef = useRef(null);

  // State for responsive calendar dimensions
  const [calendarDimensions, setCalendarDimensions] = useState({
    width: '700px',
    height: '650px'
  });

  // Update calendar dimensions based on screen width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width >= 1200) {
        setCalendarDimensions({ width: '700px', height: '650px' });
      } else if (width >= 1024) {
        setCalendarDimensions({ width: '600px', height: '600px' });
      } else if (width >= 768) {
        setCalendarDimensions({ width: '90%', height: '550px' });
      } else if (width >= 600) {
        setCalendarDimensions({ width: '100%', height: '500px' });
      } else if (width >= 480) {
        setCalendarDimensions({ width: '100%', height: '450px' });
      } else {
        setCalendarDimensions({ width: '100%', height: '400px' });
      }
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Load and initialize Cal.com embed
    (function (C, A, L) { 
      let p = function (a, ar) { a.q.push(ar); }; 
      let d = C.document; 
      C.Cal = C.Cal || function () { 
        let cal = C.Cal; 
        let ar = arguments; 
        if (!cal.loaded) { 
          cal.ns = {}; 
          cal.q = cal.q || []; 
          d.head.appendChild(d.createElement("script")).src = A; 
          cal.loaded = true; 
        } 
        if (ar[0] === L) { 
          const api = function () { p(api, arguments); }; 
          const namespace = ar[1]; 
          api.q = api.q || []; 
          if(typeof namespace === "string"){
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar); 
          return;
        } 
        p(cal, ar); 
      }; 
    })(window, "https://app.cal.com/embed/embed.js", "init");
    
    // Initialize Cal.com
    window.Cal("init", "omnident-discovery", {origin:"https://app.cal.com"});

    // Configure inline embed
    window.Cal.ns["omnident-discovery"]("inline", {
      elementOrSelector:"#my-cal-inline-omnident-discovery",
      config: {"layout":"month_view","theme":"dark"},
      calLink: "omnident.ai/omnident-discovery",
    });

    // Configure UI settings
    window.Cal.ns["omnident-discovery"]("ui", {
      "theme":"dark",
      "hideEventTypeDetails":false,
      "layout":"month_view"
    });

    // Cleanup function
    return () => {
      const calElement = document.getElementById('my-cal-inline-omnident-discovery');
      if (calElement) {
        calElement.innerHTML = '';
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

      // Footer Left Section Animation
      gsap.from(footerLeftRef.current, {
        scrollTrigger: {
          trigger: footerLeftRef.current,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        x: -40,
        duration: 0.7,
        delay: 0.4,
        ease: 'power2.out'
      });

      // Footer Right Section Animation
      gsap.from(footerRightRef.current, {
        scrollTrigger: {
          trigger: footerRightRef.current,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        x: 40,
        duration: 0.7,
        delay: 0.5,
        ease: 'power2.out'
      });

      // Footer Bottom Animation
      gsap.from(footerBottomRef.current, {
        scrollTrigger: {
          trigger: footerBottomRef.current,
          start: 'top 90%',
          once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.6,
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
          <span className="section-label haha" ref={labelRef}>• Integration</span>
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
            <div className="calendar-header">
              <FiCalendar className="calendar-icon" />
              <span>Select Your Preferred Time</span>
            </div>
            <div 
              style={{ 
                width: calendarDimensions.width, 
                height: calendarDimensions.height, 
                overflow: 'auto',
                borderRadius: '12px',
                background: 'rgba(10, 15, 28, 0.5)',
                transition: 'all 0.3s ease'
              }}
              id="my-cal-inline-omnident-discovery"
            />
          </div>
        </div>

        <footer className="footer-info">
          <div className="footer-main">
            {/* Left Section */}
            <div className="footer-left" ref={footerLeftRef}>
              <div className="footer-logo-section">
                <img src={NavLogo} alt="OmniDent AI Logo" className="logo-icon" />
              </div>
              
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

            {/* Right Section */}
            <div className="footer-right" ref={footerRightRef}>
              <div className="footer-cta-section">
                <h3>Contact us to explore partnerships,<br />collaborations, or simply to say hello.</h3>
                <button className="footer-chat-btn">Let's Chat</button>
              </div>
              
              <div className="footer-contact-section">
                <p className="contact-label">Contact</p>
                <a href="mailto:hello@omnident.com" className="contact-email">hello@omnident.com</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom" ref={footerBottomRef}>
            <p className="footer-location">San Francisco</p>
            <p className="footer-copyright">©2025 OmniDent All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Calendar;