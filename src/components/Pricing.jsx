import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const Pricing = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const initAnimations = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger?.closest('.pricing')) trigger.kill();
      });

      const mm = gsap.matchMedia();

      /* --------------------------------------------------------------
         DESKTOP (900px+) - Sequential Card Animation (Two Cards)
      -------------------------------------------------------------- */
      mm.add("(min-width: 900px)", () => {
        const stickySection = sectionRef.current.querySelector(".pricing-sticky");
        if (!stickySection) return;

        // Reset mobile styles
        gsap.set([card1Ref.current, card2Ref.current], {
          clearProps: "all"
        });

        // Main timeline with pin
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: stickySection,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });

        // Animate header
        const header = headerRef.current;
        if (header) {
          const title = header.querySelector('.pricing-title');
          const subtitle = header.querySelector('.pricing-subtitle');
          
          if (title) {
            mainTimeline.fromTo(
              title,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
          }

          if (subtitle) {
            mainTimeline.fromTo(
              subtitle,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              '-=0.3'
            );
          }
        }

        // FIRST: Animate left card (Built In)
        mainTimeline.fromTo(
          card1Ref.current,
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

        // Animate left card internals
        if (card1Ref.current) {
          const elements = {
            title: card1Ref.current.querySelector('.card-title'),
            description: card1Ref.current.querySelector('.card-description'),
            features: card1Ref.current.querySelectorAll('.card-features li'),
            footer: card1Ref.current.querySelector('.card-footer')
          };

          const leftTimeline = gsap.timeline();

          if (elements.title) {
            leftTimeline.fromTo(elements.title,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
          }

          if (elements.description) {
            leftTimeline.fromTo(elements.description,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.features.length > 0) {
            leftTimeline.fromTo(elements.features,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.footer) {
            leftTimeline.fromTo(elements.footer,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          mainTimeline.add(leftTimeline, '-=0.6');
        }

        mainTimeline.to({}, { duration: 0.3 });

        // SECOND: Animate right card (Core Platform)
        mainTimeline.fromTo(
          card2Ref.current,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out'
          }
        );

        // Animate right card internals
        if (card2Ref.current) {
          const elements = {
            title: card2Ref.current.querySelector('.card-title'),
            description: card2Ref.current.querySelector('.card-description'),
            priceSection: card2Ref.current.querySelector('.price-section:not(.price-section-empty)'),
            features: card2Ref.current.querySelectorAll('.card-features li'),
            button: card2Ref.current.querySelector('.pricing-btn'),
            footer: card2Ref.current.querySelector('.card-footer')
          };

          const rightTimeline = gsap.timeline();

          if (elements.title) {
            rightTimeline.fromTo(elements.title,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
          }

          if (elements.description) {
            rightTimeline.fromTo(elements.description,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.priceSection) {
            rightTimeline.fromTo(elements.priceSection,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
              '-=0.2'
            );
          }

          if (elements.features.length > 0) {
            rightTimeline.fromTo(elements.features,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.button) {
            rightTimeline.fromTo(elements.button,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.footer) {
            rightTimeline.fromTo(elements.footer,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          mainTimeline.add(rightTimeline, '-=0.6');
        }

        mainTimeline.to({}, { duration: 0.3 });

        return () => {};
      });
    };

    initAnimations();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAnimations();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger?.closest('.pricing')) {
          trigger.kill();
        }
      });
      window.removeEventListener('resize', handleResize);
    };
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
      <section className="pricing-sticky">
        <div className="pricing-header" ref={headerRef}>
          <div className="pricing-header-content">
            <span className="pricing-label">• Pricing</span>
            <h2 className="pricing-title">
              Pricing and <span className="title-accent">Growth Stack</span>
            </h2>
          </div>
          <p className="pricing-subtitle">
            Convert more leads with AI that instantly responds across SMS, web chat, and voice calls. Natural<br />
            conversations that understand context and book appointments seamlessly.
          </p>
        </div>

        <div className="pricing-cards" ref={cardContainerRef}>
          {/* Core Platform Card - RIGHT on desktop, SECOND on mobile */}
          <div 
            ref={card1Ref} 
            className="pricing-card core-platform animate-on-scroll"
            id="pricing-card-2"
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
              <br />
              <div className="card-price">
                <span className="price-amount"><br />$995</span>
                <span className="price-period"><br /><br />/mo</span>
              </div>
              <div className="card-subtitle">
                +$2,000 implementation
              </div>
            </div>

            <ul className="card-features">
              <br />
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
              Includes $1,000 marketing activation credit managed by<br />
              Omnident.ai core
            </p>
          </div>
          {/* Built In Card - LEFT on desktop, FIRST on mobile */}
          <div 
            ref={card2Ref} 
            className="pricing-card built-in animate-on-scroll"
            id="pricing-card-1"
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

            <p className="card-footer">
              $1,000 first-month credit from $2,000 implementation cost.<br />
              Continued marketing services require retention (additional costs) or you<br />
              can return to your previous marketing partner.
            </p>
          </div>

        </div>
      </section>
    </section>
  );
};

export default Pricing;