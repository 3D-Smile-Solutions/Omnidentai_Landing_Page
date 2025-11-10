import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const Pricing = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline with pin
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Animate title
      mainTimeline.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      // Animate subtitle
      mainTimeline.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Animate cards with stagger - center card first, then sides
      mainTimeline.fromTo(
        cardsRef.current[1], // Center card (Core Platform)
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out'
        },
        '-=0.2'
      );

      // Animate side cards together
      mainTimeline.fromTo(
        [cardsRef.current[0], cardsRef.current[2]], // Left and right cards
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        },
        '-=0.6'
      );

      // Animate card internals
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardTitle = card.querySelector('.card-title');
        const cardDescription = card.querySelector('.card-description');
        const priceSection = card.querySelector('.price-section:not(.price-section-empty)');
        const features = card.querySelectorAll('.card-features li');
        const button = card.querySelector('.pricing-btn');
        const footer = card.querySelector('.card-footer');

        const cardTimeline = gsap.timeline();

        cardTimeline
          .fromTo(cardTitle,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          )
          .fromTo(cardDescription,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '-=0.2'
          );

        if (priceSection) {
          cardTimeline.fromTo(priceSection,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
            '-=0.2'
          );
        }

        cardTimeline
          .fromTo(features,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
            '-=0.2'
          )
          .fromTo(button,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '-=0.2'
          )
          .fromTo(footer,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' },
            '-=0.2'
          );

        mainTimeline.add(cardTimeline, `-=${0.6 - (index * 0.15)}`);
      });

      // Hold at the end
      mainTimeline.to({}, { duration: 0.3 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={sectionRef} className={`pricing ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="pricing-container">
        <div className="pricing-header" ref={titleRef}>
          <span className="pricing-label">• Pricing</span>
          <h2 className="pricing-title">
            Pricing and <span className="title-highlight">Growth Stack</span>
          </h2>
        </div>
        <p ref={subtitleRef} className="pricing-subtitle">
          Convert more leads with AI that instantly responds across SMS, web chat, and voice calls. Natural<br />
          conversations that understand context and book appointments seamlessly.
        </p>

        <div className="pricing-cards">
          {/* Built In Card - Left Side */}
          <div 
            ref={el => cardsRef.current[0] = el} 
            className="pricing-card built-in"
          >
            <div className="card-header">
              <h3 className="card-title">BUILT IN</h3>
              <p className="card-description">
                Marketing partner inside<br />
                OmniDent.AI. Uses platform<br />
                metrics to optimize spend
              </p>
            </div>
            
            <div className="price-section price-section-empty"></div>

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

            <div className="card-action">
              <button className="swipe pricing-btn" onClick={() => scrollToSection('calendar')}>
                Book A Strategy Call
              </button>
            </div>

            <p className="card-footer">
              Runs as part of your OmniDent.ai subscription
            </p>
          </div>

          {/* Core Platform Card - CENTER (Featured) */}
          <div 
            ref={el => cardsRef.current[1] = el} 
            className="pricing-card core-platform"
          >
            <div className="card-header">
              <h3 className="card-title">CORE PLATFORM</h3>
              <p className="card-description">
                Automated intake, two-way<br />
                messaging, scheduling, and<br />
                live practice analytics.
              </p>
            </div>
            
            <div className="price-section">
              <div className="card-price">
                <span className="price-amount">$995</span>
                <span className="price-period">/mo</span>
              </div>
              <div className="card-subtitle">
                +$5,000 implementation
              </div>
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

            <div className="card-action">
              <button className="swipe pricing-btn" onClick={() => scrollToSection('calendar')}>
                Book A Demo
              </button>     
            </div>

            <p className="card-footer">
              Includes SAVE marketing activation credit managed by<br />
              Omnicient.ai core
            </p>
          </div>

          {/* Optional Card - Right Side */}
          <div 
            ref={el => cardsRef.current[2] = el} 
            className="pricing-card optional"
          >
            <div className="card-header">
              <h3 className="card-title">OPTIONAL</h3>
              <p className="card-description">
                Social media partner for<br />
                practices that want growth<br />
                in reach and content.
              </p>
            </div>
            
            <div className="price-section price-section-empty"></div>

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

            <div className="card-action">
              <a 
                href="https://itfactorgroup.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="swipe pricing-btn"
              >
                Grow Social Media
              </a>
            </div>

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