import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Discovery.css';
import cardCover from '../assets/Testi.png';

gsap.registerPlugin(ScrollTrigger);

const Discovery = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const cardContainerRef = useRef(null);
  const stickyHeaderRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const isGapAnimationCompletedRef = useRef(false);
  const isFlipAnimationCompletedRef = useRef(false);

  useEffect(() => {
    const initAnimations = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger?.closest('.discovery')) trigger.kill();
      });

      // MOBILE FIX: Enable normalize scroll for mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        ScrollTrigger.normalizeScroll({
          allowNestedScroll: true,
          lockAxis: false,
          momentum: true,
          type: "touch,wheel,pointer"
        });
      }

      // Configure ScrollTrigger for mobile
      ScrollTrigger.config({
        ignoreMobileResize: true, // Ignore address bar resize
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
      });

      const mm = gsap.matchMedia();

      /* --------------------------------------------------------------
      MOBILE – Cards slide up over each other - FIXED
      -------------------------------------------------------------- */
      mm.add("(max-width: 999px)", () => {
        const stickySection = sectionRef.current.querySelector(".sticky");
        const cardContainer = cardContainerRef.current;
        
        // Calculate dynamic height based on viewport
        const cardHeight = Math.min(550, window.innerHeight * 0.6);
        
        // Make cards absolute positioned for stacking
        gsap.set(cardContainer, { 
          position: 'relative', 
          height: `${cardHeight}px`
        });
        
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          position: 'absolute',
          top: 0,
          left: '50%',
          x: '-50%',
          width: '90%',
          maxWidth: '350px'
        });
        
        // Set initial positions - Card 2 and 3 below Card 1
        gsap.set(card1Ref.current, { 
          y: 0,
          zIndex: 1,
          rotateZ: -5
        });
        gsap.set(card2Ref.current, { 
          y: '110%',
          zIndex: 2,
          rotateZ: 0
        });
        gsap.set(card3Ref.current, { 
          y: '220%',
          zIndex: 3,
          rotateZ: 5
        });

        // CRITICAL FIX: Proper scroll duration calculation
        // Each card needs time to slide up + hold time
        const scrollHeight = window.innerHeight * 2.5; // Increased from 2 to 2.5

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${scrollHeight}`, // Use function for dynamic calculation
            pin: true,
            scrub: 1,
            anticipatePin: 1, // Changed back to 1 for smoother pinning
            pinSpacing: true,
            invalidateOnRefresh: true,
            // markers: true, // Uncomment to debug
          }
        });

        // FIXED: Adjust animation timing for smoother progression
        // Total timeline duration is 1, so we divide it properly
        
        // Card 2 slides up over Card 1 (40% of timeline)
        tl.to(card2Ref.current, {
          y: 0,
          duration: 0.35,
          ease: "power2.inOut"
        })
        // Hold Card 2 (10% of timeline)
        .to({}, { duration: 0.15 })
        // Card 3 slides up over Card 2 (40% of timeline)
        .to(card3Ref.current, {
          y: 0,
          duration: 0.35,
          ease: "power2.inOut"
        })
        // Hold Card 3 at the end (10% of timeline)
        .to({}, { duration: 0.15 });

        return () => {
          // Reset on cleanup
          gsap.set(cardContainer, { clearProps: 'all' });
          gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], { clearProps: 'all' });
          
          // Disable normalizeScroll on cleanup
          if (isMobile) {
            ScrollTrigger.normalizeScroll(false);
          }
        };
      });

      // Desktop: Original animations with seamless joining fix
      mm.add("(min-width: 1000px)", () => {
        // Reset mobile styles and set initial state for seamless joining
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          y: 0,
          scale: 1,
          rotation: 0,
          marginLeft: 0,
          marginRight: 0,
          clearProps: "transform,margin"
        });

        // Set initial border radius for outer corners when joined
        gsap.set(card1Ref.current, {
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        });
        
        gsap.set(card2Ref.current, {
          borderRadius: 0
        });
        
        gsap.set(card3Ref.current, {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px"
        });

        // Add initial micro-overlap for middle card to prevent gaps
        gsap.set(card2Ref.current, {
          marginLeft: "-0.5px",
          marginRight: "-0.5px",
          zIndex: 1
        });

        // Set initial state for header
        gsap.set(stickyHeaderRef.current, {
          opacity: 0,
          y: 40,
        });

        ScrollTrigger.create({
          trigger: sectionRef.current.querySelector(".sticky"),
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Header animation - slides up from behind cards
            if (progress >= 0.05 && progress <= 0.2) {
              const headerProgress = gsap.utils.mapRange(0.05, 0.2, 0, 1, progress);
              const yValue = gsap.utils.mapRange(0, 1, 100, 0, headerProgress);
              const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

              gsap.set(stickyHeaderRef.current, {
                y: yValue,
                opacity: opacityValue,
              });
            } else if (progress < 0.05) {
              gsap.set(stickyHeaderRef.current, {
                y: 100,
                opacity: 0,
              });
            } else if (progress > 0.2) {
              gsap.set(stickyHeaderRef.current, {
                y: 0,
                opacity: 1,
              });
            }

            // Card container width animation
            if (progress <= 0.25) {
              const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
              gsap.set(cardContainerRef.current, { width: `${widthPercentage}%` });
            } else {
              gsap.set(cardContainerRef.current, { width: "60%" });
            }

            // Gap and border-radius animation - ONLY apply border-radius when splitting
            if (progress >= 0.35 && !isGapAnimationCompletedRef.current) {
              // First remove the overlap
              gsap.set(card2Ref.current, {
                marginLeft: 0,
                marginRight: 0,
                zIndex: "auto"
              });
              
              // Animate gap opening
              gsap.to(cardContainerRef.current, {
                gap: "20px",
                duration: 0.5,
                ease: "power3.out",
              });

              // Apply full border radius to ALL cards when they split
              gsap.to([card1Ref.current, card2Ref.current, card3Ref.current], {
                borderRadius: "10px",
                duration: 0.5,
                ease: "power3.out",
              });

              isGapAnimationCompletedRef.current = true;
            } else if (progress < 0.35 && isGapAnimationCompletedRef.current) {
              // Animate gap closing
              gsap.to(cardContainerRef.current, {
                gap: "0px",
                duration: 0.5,
                ease: "power3.out",
                onStart: () => {
                  // Add micro overlap immediately to prevent flash
                  gsap.set(card2Ref.current, {
                    marginLeft: "-0.5px",
                    marginRight: "-0.5px",
                    zIndex: 1
                  });
                }
              });

              // Restore outer corner radius only when joining back together
              gsap.to(card1Ref.current, {
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to(card2Ref.current, {
                borderRadius: "0px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to(card3Ref.current, {
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                duration: 0.5,
                ease: "power3.out",
              });

              isGapAnimationCompletedRef.current = false;
            }
            
            // Ensure overlap when cards should be joined (progress < 0.35)
            if (progress < 0.35 && cardContainerRef.current.style.gap === "0px") {
              gsap.set(card2Ref.current, {
                marginLeft: "-0.5px",
                marginRight: "-0.5px",
                zIndex: 1
              });
            }

            // Flip animation - Forward (scrolling down)
            if (progress >= 0.7 && !isFlipAnimationCompletedRef.current) {
              gsap.to(".discovery .card", {
                rotationY: 180,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: 0.1,
              });

              gsap.to([".discovery #card-1", ".discovery #card-3"], {
                y: 30,
                rotationZ: (i) => [-15, 15][i],
                duration: 0.75,
                ease: "power3.inOut",
              });

              isFlipAnimationCompletedRef.current = true;
            } 
            // Flip animation - Reverse (scrolling back up)
            else if (progress < 0.7 && isFlipAnimationCompletedRef.current) {
              gsap.to(".discovery .card", {
                rotationY: 0,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: 0.1,
              });

              gsap.to([".discovery #card-1", ".discovery #card-3"], {
                y: 0,
                rotationZ: 0,
                duration: 0.75,
                ease: "power3.inOut",
              });

              isFlipAnimationCompletedRef.current = false;
            }
          },
        });

        return () => {};
      });
    };

    initAnimations();

    // MOBILE FIX: Better resize and orientation handling
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        initAnimations();
      }, 250);
    };

    const handleOrientation = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);

    // MOBILE FIX: Refresh after all content loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger?.closest('.discovery')) {
          trigger.kill();
        }
      });
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className={`discovery ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      <section className='sticky'>
        <div className="sticky-header" ref={stickyHeaderRef}>
          <h1>One AI, <span className="title-accent">Three Ways</span> to Connect with Patients</h1>
        </div>
        <div className="card-container" ref={cardContainerRef}>
          <div className="card" id="card-1" ref={card1Ref}>
            <div className="card-front">
              <div className="card-image" style={{ backgroundImage: `url(${cardCover})` }}></div>
            </div>
            <div className="card-back">
              <div className="card-back-content">
                <span className="card-span">( 01 )</span>
                <p className="card-title">SMS</p>
                <p className="card-description">Patients text your practice number and instantly connect with OmniDent.ai for scheduling, questions, and more.</p>
              </div>
            </div>
          </div>
          <div className="card" id="card-2" ref={card2Ref}>
            <div className="card-front">
              <div className="card-image" style={{ backgroundImage: `url(${cardCover})` }}></div>
            </div>
            <div className="card-back">
              <div className="card-back-content">
                <span className="card-span">( 02 )</span>
                <p className="card-title">Web Chat</p>
                <p className="card-description">A sleek chat bubble on your website connects visitors directly to OmniDent.ai for instant assistance.</p>
              </div>
            </div>
          </div>
          <div className="card" id="card-3" ref={card3Ref}>
            <div className="card-front">
              <div className="card-image" style={{ backgroundImage: `url(${cardCover})` }}></div>
            </div>
            <div className="card-back">
              <div className="card-back-content">
                <span className="card-span">( 03 )</span>
                <p className="card-title">Phone Call</p>
                <p className="card-description">Patients call your practice number and speak naturally with OmniDent.ai's voice assistant.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Discovery;