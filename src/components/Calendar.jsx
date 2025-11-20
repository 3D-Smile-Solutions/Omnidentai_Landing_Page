import React, { useState, useEffect, useRef } from 'react';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';
import Cal, { getCalApi } from "@calcom/embed-react";
import footerBg from '../assets/Footer.jpg';
import './Calendar.css';
import logoD from '../assets/LogoD.png';
import NavLogo from '../assets/Logo.png';

const Calendar = ({ isDarkMode }) => {
  // Refs
  const calendarEmbedRef = useRef(null);

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
      
      // Add custom CSS to hide/style Cal.com branding
      const style = document.createElement('style');
      style.textContent = `
        /* Hide Cal.com branding or make it dark */
        [class*="cal-"] a[href*="cal.com"] {
          background: #1a1a1a !important;
          color: #1a1a1a !important;
          opacity: 0.1 !important;
        }
        
        /* Alternative: completely hide it */
        [class*="powered-by"],
        [class*="branding"],
        a[href*="cal.com/signup"],
        a[aria-label*="Cal.com"] {
          display: none !important;
        }
        
        /* Make the calendar footer area dark */
        .cal-embed[data-cal-namespace="omnident-discovery"] > div > div:last-child {
          background: #1a1a1a !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
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
  
  return (
    <section className={`calendar-section ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="calendar-bg-wrapper">
        <div className="calendar-overlay"></div>
      </div>
      
      <div className="calendar-container">
        <div className="calendar-header">
          <span className="section-label">• Integration</span>
          <h2 className="calendar-title">
            Ready to Transform Your Practice?
            <br />Book Your Discovery Call
          </h2>
          <p className="calendar-subtitle">
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
                <div className="scroll-indicator">
                  <FiChevronDown className="scroll-icon" />
                  <span>Scroll to see more dates</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="footer-info">
          {/* Top Section - Navigation and Contact */}
          <div className="footer-top">
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
                <a href="https://cal.com/omnident.ai/3dss-discovery" target="_blank" rel="noopener noreferrer">
                  <button className="footer-chat-btn">Let's Chat</button>
                </a>
              </div>
              
              <div className="footer-contact-section">
                <p className="contact-label">Contact</p>
                <a href="mailto:han@omnident.ai" className="contact-email">han@omnident.ai</a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Logo, Location and Copyright */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-logo-wrapper">
                <img src={isDarkMode ? NavLogo : logoD} alt="OmniDent AI Logo" className="footer-logo" />
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