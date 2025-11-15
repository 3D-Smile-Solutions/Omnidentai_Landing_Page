import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Discovery.css';
import cardCover from '../assets/Testi.jpg';

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

      const mm = gsap.matchMedia();

      /* --------------------------------------------------------------
      MOBILE – Slide‑over‑one‑by‑one (Smooth onUpdate version)
      -------------------------------------------------------------- */
      mm.add("(max-width: 999px)", () => {
        // Header is always visible on mobile
        gsap.set(stickyHeaderRef.current, { opacity: 1, y: 0 });

        // Initial stacked positions
        gsap.set(card1Ref.current, { y: "0%", scale: 1, zIndex: 3 });
        gsap.set(card2Ref.current, { y: "120%", scale: 0.9, zIndex: 2 });
        gsap.set(card3Ref.current, { y: "240%", scale: 0.8, zIndex: 1 });

        let lastProgress = 0;

        ScrollTrigger.create({
          trigger: sectionRef.current.querySelector(".sticky"),
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const direction = p > lastProgress ? "down" : "up";
            lastProgress = p;

            // Smooth interpolation function
            const smoothInterpolate = (start, end, progress) => {
              return start + (end - start) * progress;
            };

            /* ---------- Phase 1: Card 2 slides over Card 1 (0% - 33%) ---------- */
            if (p <= 0.33) {
              const prog = gsap.utils.mapRange(0, 0.33, 0, 1, p);
              const y2 = smoothInterpolate(120, 0, prog);
              const scale2 = smoothInterpolate(0.9, 1, prog);
              const scale1 = smoothInterpolate(1, 0.9, prog);
              
              gsap.to(card2Ref.current, { 
                y: `${y2}%`,
                scale: scale2,
                duration: 0.1 // Small duration for smoothness
              });
              
              gsap.to(card1Ref.current, { 
                scale: scale1,
                duration: 0.1
              });

              // Z-index changes halfway through phase 1
              if (prog > 0.5) {
                gsap.set(card1Ref.current, { zIndex: 2 });
                gsap.set(card2Ref.current, { zIndex: 3 });
              } else {
                gsap.set(card1Ref.current, { zIndex: 3 });
                gsap.set(card2Ref.current, { zIndex: 2 });
              }
            }

            /* ---------- Phase 2: Card 3 slides over Card 2 (33% - 66%) ---------- */
            if (p >= 0.33 && p <= 0.66) {
              const prog = gsap.utils.mapRange(0.33, 0.66, 0, 1, p);
              const y3 = smoothInterpolate(240, 0, prog);
              const scale3 = smoothInterpolate(0.8, 1, prog);
              const scale2 = smoothInterpolate(1, 0.9, prog);
              
              gsap.to(card3Ref.current, { 
                y: `${y3}%`,
                scale: scale3,
                duration: 0.1
              });
              
              gsap.to(card2Ref.current, { 
                scale: scale2,
                duration: 0.1
              });

              // Z-index changes halfway through phase 2
              if (prog > 0.5) {
                gsap.set(card2Ref.current, { zIndex: 2 });
                gsap.set(card3Ref.current, { zIndex: 3 });
              } else {
                gsap.set(card2Ref.current, { zIndex: 3 });
                gsap.set(card3Ref.current, { zIndex: 2 });
              }
            }

            /* ---------- Handle reverse scrolling ---------- */
            if (direction === "up") {
              // When scrolling back up, reset z-indexes appropriately
              if (p < 0.16) { // Before midpoint of phase 1
                gsap.set(card1Ref.current, { zIndex: 3 });
                gsap.set(card2Ref.current, { zIndex: 2 });
              } else if (p < 0.33 && p >= 0.16) { // After midpoint of phase 1
                gsap.set(card1Ref.current, { zIndex: 2 });
                gsap.set(card2Ref.current, { zIndex: 3 });
              } else if (p < 0.5 && p >= 0.33) { // Before midpoint of phase 2
                gsap.set(card2Ref.current, { zIndex: 3 });
                gsap.set(card3Ref.current, { zIndex: 2 });
              } else if (p >= 0.5 && p <= 0.66) { // After midpoint of phase 2
                gsap.set(card2Ref.current, { zIndex: 2 });
                gsap.set(card3Ref.current, { zIndex: 3 });
              }
            }
          },
        });

        return () => {};
      });

      // Desktop: Original animations (unchanged)
      mm.add("(min-width: 1000px)", () => {
        // Reset mobile styles
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          y: 0,
          scale: 1,
          rotation: 0,
          clearProps: "all"
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

            // Gap and border-radius animation
            if (progress >= 0.35 && !isGapAnimationCompletedRef.current) {
              gsap.to(cardContainerRef.current, {
                gap: "20px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to(["#card-1", "#card-2", "#card-3"], {
                borderRadius: "20px",
                duration: 0.5,
                ease: "power3.out",
              });

              isGapAnimationCompletedRef.current = true;
            } else if (progress < 0.35 && isGapAnimationCompletedRef.current) {
              gsap.to(cardContainerRef.current, {
                gap: "0px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to("#card-1", {
                borderRadius: "20px 0 0 20px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to("#card-2", {
                borderRadius: "0px",
                duration: 0.5,
                ease: "power3.out",
              });

              gsap.to("#card-3", {
                borderRadius: "0 20px 20px 0",
                duration: 0.5,
                ease: "power3.out",
              });

              isGapAnimationCompletedRef.current = false;
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
        if (trigger.vars.trigger?.closest('.discovery')) {
          trigger.kill();
        }
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={`discovery ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      <section className='sticky'>
        <div className="sticky-header" ref={stickyHeaderRef}>
          <h1>One AI, Three Ways to Connect with Patients</h1>
        </div>
        <div className="card-container" ref={cardContainerRef}>
          <div className="card" id="card-1" ref={card1Ref}>
            <div className="card-front">
              <img src={cardCover} alt="Text Message Access" />
            </div>
            <div className="card-back">
              <div className="card-back-content">
                <span className="card-span">( 01 )</span>
                <p className="card-title">Text Message Access</p>
                <p className="card-description">Patients text your practice number and instantly connect with OmniDent.ai for scheduling, questions, and more.</p>
              </div>
            </div>
          </div>
          <div className="card" id="card-2" ref={card2Ref}>
            <div className="card-front">
              <img src={cardCover} alt="Website Chat Widget" />
            </div>
            <div className="card-back">
              <div className="card-back-content">
                <span className="card-span">( 02 )</span>
                <p className="card-title">Website Chat Widget</p>
                <p className="card-description">A sleek chat bubble on your website connects visitors directly to OmniDent.ai for instant assistance.</p>
              </div>
            </div>
          </div>
          <div className="card" id="card-3" ref={card3Ref}>
            <div className="card-front">
              <img src={cardCover} alt="Phone Call Access" />
            </div>
            <div className="card-back">
              <div className="card-back-content">
                <span className="card-span">( 03 )</span>
                <p className="card-title">Phone Call Access</p>
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