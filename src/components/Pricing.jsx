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
  const card3Ref = useRef(null);

  useEffect(() => {
    const initAnimations = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger?.closest('.pricing')) trigger.kill();
      });

      const mm = gsap.matchMedia();

      /* --------------------------------------------------------------
         MOBILE (<1400px) – Cards slide up over each other
      -------------------------------------------------------------- */
      mm.add("(max-width: 1399px)", () => {
        const stickySection = sectionRef.current.querySelector(".pricing-sticky");
        if (!stickySection) return;

        const cardContainer = cardContainerRef.current;
        if (!cardContainer) return;

        // Check if all cards exist
        if (!card1Ref.current || !card2Ref.current || !card3Ref.current) {
          return;
        }
        
        // Make cards absolute positioned for stacking
        gsap.set(cardContainer, { 
          position: 'relative', 
          height: '500px' 
        });
        
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          position: 'absolute',
          top: 0,
          left: '50%',
          x: '-50%',
          width: '90%',
          maxWidth: '420px'
        });
        
        // Set initial positions
        // Order: Core Platform (card2) -> Built In (card1) -> Optional (card3)
        gsap.set(card2Ref.current, { 
          y: 0,
          zIndex: 1,
          rotateZ: 0
        });
        gsap.set(card1Ref.current, { 
          y: '110%',
          zIndex: 2,
          rotateZ: -3
        });
        gsap.set(card3Ref.current, { 
          y: '220%',
          zIndex: 3,
          rotateZ: 4
        });

        // Create timeline for the animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: `+=${window.innerHeight * 2}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            pinSpacing: true
          }
        });

        // Built In slides up over Core Platform
        tl.to(card1Ref.current, {
          y: 0,
          rotateZ: 0,
          duration: 1,
          ease: "none"
        })
        // Optional slides up over Built In
        .to(card3Ref.current, {
          y: 0,
          rotateZ: 0,
          duration: 1,
          ease: "none"
        }, ">");

        return () => {
          gsap.set(cardContainer, { clearProps: 'all' });
          gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], { clearProps: 'all' });
        };
      });

      /* --------------------------------------------------------------
         DESKTOP (1400px+) - Sequential Card Animation
      -------------------------------------------------------------- */
      mm.add("(min-width: 1400px)", () => {
        const stickySection = sectionRef.current.querySelector(".pricing-sticky");
        if (!stickySection) return;

        // Reset mobile styles
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
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

        // FIRST: Animate center card (Core Platform)
        mainTimeline.fromTo(
          card2Ref.current,
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

        // Animate center card internals
        if (card2Ref.current) {
          const elements = {
            title: card2Ref.current.querySelector('.card-title'),
            description: card2Ref.current.querySelector('.card-description'),
            priceSection: card2Ref.current.querySelector('.price-section:not(.price-section-empty)'),
            features: card2Ref.current.querySelectorAll('.card-features li'),
            button: card2Ref.current.querySelector('.pricing-btn'),
            footer: card2Ref.current.querySelector('.card-footer')
          };

          const centerTimeline = gsap.timeline();

          if (elements.title) {
            centerTimeline.fromTo(elements.title,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
          }

          if (elements.description) {
            centerTimeline.fromTo(elements.description,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.priceSection) {
            centerTimeline.fromTo(elements.priceSection,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
              '-=0.2'
            );
          }

          if (elements.features.length > 0) {
            centerTimeline.fromTo(elements.features,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.button) {
            centerTimeline.fromTo(elements.button,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          if (elements.footer) {
            centerTimeline.fromTo(elements.footer,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, ease: 'power2.out' },
              '-=0.2'
            );
          }

          mainTimeline.add(centerTimeline, '-=0.6');
        }

        mainTimeline.to({}, { duration: 0.3 });

        // SECOND: Animate left card (Built In)
        mainTimeline.fromTo(
          card1Ref.current,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out'
          }
        );

        // Animate left card internals
        if (card1Ref.current) {
          const elements = {
            title: card1Ref.current.querySelector('.card-title'),
            description: card1Ref.current.querySelector('.card-description'),
            features: card1Ref.current.querySelectorAll('.card-features li'),
            footer: card1Ref.current.querySelector('.card-footer')
          };

          if (elements.title && elements.description && elements.features.length > 0 && elements.footer) {
            const leftTimeline = gsap.timeline();

            leftTimeline
              .fromTo(elements.title,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
              )
              .fromTo(elements.description,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
                '-=0.2'
              )
              .fromTo(elements.features,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
                '-=0.2'
              )
              .fromTo(elements.footer,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' },
                '-=0.2'
              );

            mainTimeline.add(leftTimeline, '-=0.6');
          }
        }

        mainTimeline.to({}, { duration: 0.2 });

        // THIRD: Animate right card (Optional)
        mainTimeline.fromTo(
          card3Ref.current,
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
        if (card3Ref.current) {
          const elements = {
            title: card3Ref.current.querySelector('.card-title'),
            description: card3Ref.current.querySelector('.card-description'),
            features: card3Ref.current.querySelectorAll('.card-features li'),
            footer: card3Ref.current.querySelector('.card-footer')
          };

          if (elements.title && elements.description && elements.features.length > 0 && elements.footer) {
            const rightTimeline = gsap.timeline();

            rightTimeline
              .fromTo(elements.title,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
              )
              .fromTo(elements.description,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
                '-=0.2'
              )
              .fromTo(elements.features,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
                '-=0.2'
              )
              .fromTo(elements.footer,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' },
                '-=0.2'
              );

            mainTimeline.add(rightTimeline, '-=0.6');
          }
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
          {/* Built In Card */}
          <div 
            ref={card1Ref} 
            className="pricing-card built-in"
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

          {/* Core Platform Card - CENTER (Featured) */}
          <div 
            ref={card2Ref} 
            className="pricing-card core-platform"
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
              <div className="card-price">
                <span className="price-amount">$995</span>
                <span className="price-period">/mo</span>
              </div>
              <div className="card-subtitle">
                +$2,000 implementation
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
              Includes $1,000 marketing activation credit managed by<br />
              Omnicient.ai core
            </p>
          </div>

          {/* Optional Card */}
          <div 
            ref={card3Ref} 
            className="pricing-card optional"
            id="pricing-card-3"
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

            <p className="card-footer">
              Contact our team to learn about social media growth packages<br />
              and pricing options for your practice.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Pricing;