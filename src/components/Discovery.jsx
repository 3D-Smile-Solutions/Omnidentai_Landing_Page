import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiArrowRight } from 'react-icons/hi';
import SpotlightCard from './SpotlightCard';
import './Discovery.css';
import { FiMessageSquare, FiMonitor, FiPhone } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Discovery = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const leftSideRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      // Desktop version - Vertical card scroll with viewport-responsive pin duration
      mm.add("(min-width: 1025px)", () => {
        const rightSide = cardsContainerRef.current.parentElement;
        const cardsContainer = cardsContainerRef.current;
        
        // Get viewport dimensions
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Calculate responsive scroll distance based on viewport height
        let SCROLL_DISTANCE;
        if (viewportHeight <= 700) {
          SCROLL_DISTANCE = 400; // Shorter screens need more scroll distance
        } else if (viewportHeight <= 800) {
          SCROLL_DISTANCE = 350;
        } else if (viewportHeight <= 900) {
          SCROLL_DISTANCE = 300;
        } else if (viewportHeight <= 1080) {
          SCROLL_DISTANCE = 280;
        } else {
          SCROLL_DISTANCE = 250; // Taller screens need less
        }
        
        // Adjust for ultra-wide screens
        if (viewportWidth >= 2560) {
          SCROLL_DISTANCE = SCROLL_DISTANCE * 0.9;
        } else if (viewportWidth >= 1920) {
          SCROLL_DISTANCE = SCROLL_DISTANCE * 0.95;
        }
        
        const TOP_PADDING = 220;
        const BOTTOM_PADDING = 80;
        
        const availableHeight = rightSide.clientHeight - TOP_PADDING - BOTTOM_PADDING;
        const totalCardsHeight = cardsContainer.scrollHeight;
        const scrollAmount = -(totalCardsHeight - availableHeight);

        // Pin the entire section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top-=100 top',
          end: `+=${SCROLL_DISTANCE}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Animate cards vertically within boundaries
        gsap.fromTo(cardsContainer,
          {
            y: TOP_PADDING
          },
          {
            y: scrollAmount + TOP_PADDING,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top-=100 top',
              end: `+=${SCROLL_DISTANCE}%`,
              scrub: 1,
            }
          }
        );
      });

      // Mobile version - Horizontal card scroll with responsive pin
      mm.add("(max-width: 1024px)", () => {
        const cardsContainer = cardsContainerRef.current;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Increased scroll distance for mobile/tablet to ensure full card scrolling
        let SCROLL_DISTANCE;
        if (viewportWidth <= 375) {
          SCROLL_DISTANCE = 400; // Extra small phones
        } else if (viewportWidth <= 425) {
          SCROLL_DISTANCE = 380; // Small phones
        } else if (viewportWidth <= 480) {
          SCROLL_DISTANCE = 360; // Medium phones
        } else if (viewportWidth <= 768) {
          SCROLL_DISTANCE = 400; // Large phones/small tablets
        } else if (viewportWidth <= 1024) {
          SCROLL_DISTANCE = 420; // Tablets
        } else {
          SCROLL_DISTANCE = 300; // Fallback
        }
        
        const LEFT_PADDING = 0;
        const RIGHT_PADDING = 100;
        
        const cardWidth = 320;
        const gap = 24;
        const totalWidth = (cardWidth * cardsRef.current.length) + (gap * (cardsRef.current.length - 1));
        const scrollAmount = -(totalWidth - viewportWidth + RIGHT_PADDING);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top-=100 top',
          end: `+=${SCROLL_DISTANCE}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        gsap.fromTo(cardsContainer,
          {
            x: LEFT_PADDING
          },
          {
            x: scrollAmount + LEFT_PADDING,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top-=100 top',
              end: `+=${SCROLL_DISTANCE}%`,
              scrub: 1,
            }
          }
        );
      });

      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Animate CTA button
      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });

      // Animate individual cards on entry
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out'
        });
      });

    }, sectionRef);

    // 🟢 Add this part BELOW your GSAP setup (still inside useEffect)

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    // 🧹 Cleanup
    return () => {
      ctx.revert();
      window.removeEventListener("resize", () => {
        ScrollTrigger.refresh();
      });
    };

  }, []);

  return (
    <section className={`discovery ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      {/* Background first, then overlay on top */}
      <div className="discovery-background"></div>
      <div className="discovery-overlay"></div>
      
      <div className="discovery-wrapper">
        {/* Left Side - Static Content */}
        <div className="discovery-left" ref={leftSideRef}>
          <div className="discovery-left-content">
            <div className="discovery-eyebrow">How it connects</div>
            <h1 className="discovery-title" ref={titleRef}>
              One AI, Three Ways<br />
              to <span className="highlight">Connect with Patients</span>
            </h1>
            <p className="discovery-subtitle" ref={subtitleRef}>
              OmniDent.ai is a single intelligent system that patients can reach through their 
              preferred communication channel - text, web chat, or phone call.
            </p>
            
            <button 
              className="discovery-cta-button" 
              ref={ctaRef}
            >
              Explore Channels
              <HiArrowRight className="button-icon" />
            </button>
          </div>
        </div>

        {/* Right Side - Scrolling Cards */}
        <div className="discovery-right">
          <div className="channels-stack" ref={cardsContainerRef}>
            <SpotlightCard 
              ref={el => cardsRef.current[0] = el}
              className="custom-spotlight-card" 
              spotlightColor="rgba(81, 226, 210, 0.2)"
            >
              <div className="channel-icon-box">
                <FiMessageSquare className="channel-icon" />
              </div>
              <h3 className="channel-title">TEXT MESSAGE ACCESS</h3>
              <p className="channel-description">
                Patients text your practice number and instantly connect with OmniDent.ai for scheduling, questions, and more.
              </p>
              <ul className="channel-features">
                <li>• Prefer quick text conversations</li>
                <li>• Want to book on-the-go</li>
                <li>• Need appointment reminders</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard 
              ref={el => cardsRef.current[1] = el}
              className="custom-spotlight-card" 
              spotlightColor="rgba(81, 226, 210, 0.2)"
            >
              <div className="channel-icon-box">
              </div>
              <h3 className="channel-title">WEBSITE CHAT WIDGET</h3>
              <p className="channel-description">
                A sleek chat bubble on your website connects visitors directly to OmniDent.ai for instant assistance.
              </p>
              <ul className="channel-features">
                <li>• Are browsing your website</li>
                <li>• Have immediate questions</li>
                <li>• Want to book instantly</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard 
              ref={el => cardsRef.current[2] = el}
              className="custom-spotlight-card" 
              spotlightColor="rgba(81, 226, 210, 0.2)"
            >
              <div className="channel-icon-box">
              </div>
              <h3 className="channel-title">PHONE CALL ACCESS</h3>
              <p className="channel-description">
                Patients call your practice number and speak naturally with your OmniDent.ai's voice assistant.
              </p>
              <ul className="channel-features">
                <li>• Prefer talking to typing</li>
                <li>• Need complex help</li>
                <li>• Call after hours</li>
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discovery;