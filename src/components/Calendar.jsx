import React, { useState, useEffect } from 'react';
import footerBg from '../assets/Footer.jpg';
import './Calendar.css';
import NavLogo from '../assets/Logo.png';

const Calendar = ({ isDarkMode }) => {
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
      elementOrSelector:"#cal-embed-omnident",
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
      const calElement = document.getElementById('cal-embed-omnident');
      if (calElement) {
        calElement.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <section className={`calendar-section ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="calendar-bg-wrapper">
        <img src={footerBg} alt="" className="calendar-bg-image"/>
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

        <div className="calendar-embed-wrapper">
          <div className="calendar-embed-container">
            <div 
              className="cal-embed-box"
              id="cal-embed-omnident"
            />
          </div>
        </div>

        <footer className="footer-info">
          <div className="footer-main">
            {/* Left Section */}
            <div className="footer-left">
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
            <div className="footer-right">
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

          <div className="footer-bottom">
            <p className="footer-location">San Francisco</p>
            <p className="footer-copyright">©2025 OmniDent All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Calendar;