import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const Pricing = ({ isDarkMode }) => {
  // Refs for animation targets
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

      // Title Highlight Animation
      const highlight = titleRef.current.querySelector('.title-highlight');
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

      // Pricing Cards - Simple Slide Up Animation
      gsap.from(cardsContainerRef.current, {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        delay: 0.4,
        ease: 'power2.out'
      });

    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section className={`pricing ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      <div className="pricing-container">
        <div className="pricing-header">
          <span className="pricing-label" ref={labelRef}>• Pricing</span>
          <h2 className="pricing-title" ref={titleRef}>
            Pricing and <span className="title-highlight">Growth Stack</span>
          </h2>
          <p className="pricing-subtitle" ref={subtitleRef}>
            Convert more leads with AI that instantly responds across SMS, web chat, and voice calls. Natural<br />
            conversations that understand context and book appointments seamlessly.
          </p>
        </div>

        <div className="pricing-cards" ref={cardsContainerRef}>
          {/* Core Platform Card */}
          <div className="pricing-card core-platform">
            <div className="card-header">
              <h3 className="card-title">CORE PLATFORM</h3>
              <p className="card-description">
                Automated intake, two-way<br />
                messaging, scheduling, and<br />
                live practice analytics.
              </p>
            </div>
            <div className="card-price">
              <span className="price-amount">$995</span>
              <span className="price-period">/mo</span>
            </div>
            <div className="card-subtitle">
              +$5,000 implementation
            </div>
            <ul className="card-features">
              <li>
                <span className="feature-icon"></span>
                <span>Patient engagement and booking automation</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Analytics dashboard, QR., OPA, show rates, ROI</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>HIPAA-ready architecture and integrations</span>
              </li>
            </ul>
            <button className="swipe pricing-btn" onClick={() => scrollToSection('calendar')}>
              Book A Demo
              <span className="container">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path>
                </svg>
              </span>
            </button>     
            <p className="card-footer">
              Includes SAVE marketing activation credit managed by<br />
              Omnicient.ai core
            </p>
          </div>

          {/* Built In Card */}
          <div className="pricing-card built-in">
            <div className="card-header">
              <h3 className="card-title">BUILT IN</h3>
              <p className="card-description">
                Marketing partner inside<br />
                OmniDent.AI. Uses platform<br />
                metrics to optimize spend
              </p>
            </div>
            <ul className="card-features">
              <li>
                <span className="feature-icon"></span>
                <span>$1,000 activation credit included</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>SEO, landing pages, and paid campaign builds</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Continuous tuning from OmniDent.ai analytics</span>
              </li>
            </ul>
            <button className="swipe pricing-btn" onClick={() => scrollToSection('calendar')}>
              Book A Strategy Call
              <span className="container">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path>
                </svg>
              </span>
            </button>
            <p className="card-footer">
              Runs as part of your OmniDent.ai subscription
            </p>
          </div>

          {/* Optional Card */}
          <div className="pricing-card optional">
            <div className="card-header">
              <h3 className="card-title">OPTIONAL</h3>
              <p className="card-description">
                Social media partner for<br />
                practices that want growth<br />
                in reach and content.
              </p>
            </div>
            <ul className="card-features">
              <li>
                <span className="feature-icon"></span>
                <span>Content planning and production</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Platform growth and engagement tactics</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Aligns with campaigns from Connector.work</span>
              </li>
            </ul>
            <a 
              href="https://itfactorgroup.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="swipe pricing-btn"
            >
              Grow Social Media
              <span className="container">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path>
                </svg>
              </span>
            </a>
            <p className="card-footer">
              Runs as part of your OmniDent.ai subscription
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;