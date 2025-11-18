import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';
// Import all images at the top
import f1 from '../assets/f1.png';
import f2 from '../assets/f2.png';
import f3 from '../assets/f3.png';
import f4 from '../assets/f4.png';
import f5 from '../assets/f5.png';
import f6 from '../assets/f6.png';

gsap.registerPlugin(ScrollTrigger);

const Features = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const featureData = [
    {
      id: 1,
      title: "AI-Powered Scheduling",
      description:
        "Intelligent appointment booking that understands patient preferences, provider availability, and treatment requirements.",
      bgColor: "#4B6474", // Dental Steel Blue
      image: f1,
      stats: ["95% Booking Efficiency", "5 min Average Time", "24/7 Availability"]
    },
    {
      id: 2,
      title: "Smart Reminders & Confirmations",
      description:
        "Automated reminders via SMS, email, and voice calls that reduce no-shows and keep patients informed.",
      bgColor: "#3F6F72", // Slate Teal
      image: f2,
      stats: ["60% Fewer No-Shows", "Multi-Channel Delivery", "Real-Time Updates"]
    },
    {
      id: 3,
      title: "Insurance Verification",
      description:
        "Instant insurance eligibility checks and coverage verification to streamline the billing process.",
      bgColor: "#2F3C48", // Dusty Navy
      image: f3,
      stats: ["2 sec Verification", "99% Accuracy Rate", "500+ Plans Supported"]
    },
    {
      id: 4,
      title: "Treatment Plan Communication",
      description:
        "Clear, automated communication of treatment plans, costs, and next steps to improve case acceptance.",
      bgColor: "#39454F", // Graphite Blue-Grey
      image: f4,
      stats: ["85% Acceptance Rate", "Clear Cost Breakdown", "Patient Portal Access"]
    },
    {
      id: 5,
      title: "Post-Treatment Follow-up",
      description:
        "Automated follow-up messages to check on patient recovery and schedule necessary appointments.",
      bgColor: "#6B8F92", // Muted Aqua Grey
      image: f5,
      stats: ["92% Satisfaction", "Automated Scheduling", "Recovery Tracking"]
    },
    {
      id: 6,
      title: "Practice Analytics Dashboard",
      description:
        "Real-time insights into practice performance, patient flow, and revenue metrics for data-driven decisions.",
      bgColor: "#2A2F33", // Deep Charcoal Blue
      image: f6,
      stats: ["50+ Key Metrics", "Real-Time Insights", "Custom Reports"]
    }
  ];

  useEffect(() => {
    // Preload all images
    const loadImages = async () => {
      const imagePromises = featureData.map(feature => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = feature.image;
          img.onload = img.onerror = resolve;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Horizontal scroll with preview effect
      mm.add("(min-width: 768px)", () => {
        // Header animation - show on entry
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1
            }
          }
        );

        // FIXED: Better scroll distance calculation
        const totalCards = featureData.length;
        const viewportHeight = window.innerHeight;
        
        // Calculate based on viewport - prevents extra space
        const baseScrollPerCard = viewportHeight * 0.9; // Reduced from implicit 100vh
        const scrollDistance = (totalCards * baseScrollPerCard) + (viewportHeight * 0.2); // Small buffer

        // Pin the section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        });

        // Master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        const stepDuration = 1 / totalCards;

        // Fade out header when first card starts appearing
        tl.to(headerRef.current,
          { 
            opacity: 0, 
            duration: stepDuration * 0.5,
            ease: "power2.inOut"
          },
          stepDuration * 0.1
        );

        // Animate each card with preview/peek effect
        itemRefs.current.forEach((card, index) => {
          if (!card) return;

          const startTime = index * stepDuration;
          const previewStart = startTime - stepDuration * 0.4;

          // Set initial state - card is hidden on the right
          gsap.set(card, {
            clipPath: 'inset(0 0 0 100%)',
            width: '15%',
            right: 0,
            left: 'auto'
          });

          // Phase 1: Preview - Show narrow peek from the right (if not first card)
          if (index > 0) {
            tl.to(card,
              { 
                clipPath: 'inset(0 0 0 85%)',
                duration: stepDuration * 0.4,
                ease: "power1.out"
              },
              previewStart
            );
          }

          // Phase 2: Full reveal - Expand to full width
          tl.to(card,
            { 
              clipPath: 'inset(0 0 0 0%)',
              width: '100%',
              duration: stepDuration * 0.6,
              ease: "power2.inOut"
            },
            startTime
          );

          // Phase 3: Hold the last card without extra space
          if (index === itemRefs.current.length - 1) {
            tl.to({}, { duration: stepDuration * 0.2 }, "+=0");
          }
        });
      });

      // Mobile: Bottom-to-top with preview effect
      mm.add("(max-width: 767px)", () => {
        // Header animation - show on entry
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1
            }
          }
        );

        // CRITICAL FIX: Better mobile scroll distance calculation
        const totalCards = featureData.length;
        const viewportHeight = window.innerHeight;
        
        // Adjust scroll distance based on viewport height and content
        // Taller screens need less scroll per card
        let scrollPerCard;
        if (viewportHeight > 900) {
          scrollPerCard = viewportHeight * 0.7; // Very tall screens
        } else if (viewportHeight > 750) {
          scrollPerCard = viewportHeight * 0.8; // Tall screens
        } else if (viewportHeight > 650) {
          scrollPerCard = viewportHeight * 0.9; // Medium screens
        } else {
          scrollPerCard = viewportHeight * 1.0; // Short screens
        }
        
        const scrollDistance = (totalCards * scrollPerCard) + (viewportHeight * 0.15);

        // Pin the section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true, // Better mobile performance
          preventOverlaps: true,
        });

        // Master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          }
        });

        const stepDuration = 1 / totalCards;

        // Fade out header when first card starts appearing
        tl.to(headerRef.current,
          { 
            opacity: 0, 
            duration: stepDuration * 0.5,
            ease: "power2.inOut"
          },
          stepDuration * 0.1
        );

        // Animate each card with preview from bottom
        itemRefs.current.forEach((card, index) => {
          if (!card) return;

          const startTime = index * stepDuration;
          const previewStart = startTime - stepDuration * 0.4;

          // Set initial state - card is hidden at the bottom
          gsap.set(card, {
            clipPath: 'inset(100% 0 0 0)',
            height: '20%',
            bottom: 0,
            top: 'auto'
          });

          // Phase 1: Preview - Show small peek from bottom (if not first card)
          if (index > 0) {
            tl.to(card,
              { 
                clipPath: 'inset(80% 0 0 0)',
                duration: stepDuration * 0.4,
                ease: "power1.out"
              },
              previewStart
            );
          }

          // Phase 2: Full reveal - Expand to full height
          tl.to(card,
            { 
              clipPath: 'inset(0% 0 0 0)',
              height: '100%',
              duration: stepDuration * 0.6,
              ease: "power2.inOut"
            },
            startTime
          );

          // Phase 3: Hold the last card
          if (index === itemRefs.current.length - 1) {
            tl.to({}, { duration: stepDuration * 0.2 }, "+=0");
          }
        });
      });

    }, sectionRef);

    // CRITICAL: Refresh after setup and after a delay
    const refreshTimer1 = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);

    const refreshTimer2 = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      ctx.revert();
    };
  }, [featureData.length, imagesLoaded]);

  return (
    <section className={`features-horizontal ${isDarkMode ? 'dark-mode' : 'light-mode'}`} ref={sectionRef}>
      {/* Header */}
      <div className="features-horizontal-header" ref={headerRef}>
        <span className="features-label">See The Difference</span>
        <h2 className="features-heading">
          Core <span className="title-accent">Features</span> That Drive Results
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div className="features-horizontal-container" ref={containerRef}>
        {featureData.map((feature, index) => (
          <div 
            key={feature.id} 
            className="feature-card"
            ref={el => itemRefs.current[index] = el}
            style={{ backgroundColor: feature.bgColor }}
          >
            <div className="feature-card-inner">
              <div className="feature-card-content">
                <span className="feature-number">0{feature.id}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-stats">
                  {feature.stats.map((stat, idx) => (
                    <li key={idx} className="feature-stat">
                      <span className="stat-icon">✓</span>
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-card-image">
                <img src={feature.image} alt={feature.title} loading="eager" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;