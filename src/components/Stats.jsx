import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiArrowRight } from 'react-icons/hi';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const Stats = ({ isDarkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs for animation targets
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoFrameRef = useRef(null);
  const cornersRef = useRef([]);
  const imageTopLeftRef = useRef(null);
  const imageBottomRightRef = useRef(null);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Badge Animation
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: badgeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Highlight word animation
      const highlight = titleRef.current.querySelector('.highlight');
      if (highlight) {
        gsap.from(highlight, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(1.7)'
        });
      }

      // Features Animation
      gsap.from(featuresRef.current, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.4,
        ease: 'power2.out'
      });

      // CTA Button Animation
      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
        delay: 0.6,
        ease: 'back.out(1.7)'
      });

      // Top Left Image Animation
      gsap.from(imageTopLeftRef.current, {
        scrollTrigger: {
          trigger: imageTopLeftRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        y: -50,
        rotation: -15,
        duration: 1,
        ease: 'power3.out'
      });

      // Bottom Right Image Animation
      gsap.from(imageBottomRightRef.current, {
        scrollTrigger: {
          trigger: imageBottomRightRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        y: 50,
        rotation: 15,
        duration: 1,
        ease: 'power3.out'
      });

      // Video Section Entrance
      gsap.from(videoSectionRef.current, {
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Video Frame Scale Animation
      gsap.from(videoFrameRef.current, {
        scrollTrigger: {
          trigger: videoFrameRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'back.out(1.2)'
      });

      // Video Corners Animation - staggered
      gsap.from(cornersRef.current, {
        scrollTrigger: {
          trigger: videoFrameRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        delay: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className={`stats ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      {/* Decorative Images */}
      <div className="decorative-image top-left" ref={imageTopLeftRef}>
        {/* Placeholder for top left image */}
        <div className="image-placeholder"></div>
      </div>
      
      <div className="decorative-image bottom-right" ref={imageBottomRightRef}>
        {/* Placeholder for bottom right image */}
        <div className="image-placeholder"></div>
      </div>

      {/* Upper Section - Introduction */}
      <div className="intro-section">
        <div className="intro-content">
          <span className="intro-badge" ref={badgeRef}>• Introduction</span>
          
          <h1 className="intro-title" ref={titleRef}>
            Transforming dentistry through precision AI.<br />
            Discover the power of <span className="highlight">OmniDent.</span>
          </h1>
          
          <div className="intro-features" ref={featuresRef}>
            <p>
              Unlocking personalised dental care with intelligent diagnostics, automated notes, and streamlined workflows that put patients first. This approach improves outcomes and practice efficiency, delivering expert support and measurable results every day.
            </p>
          </div>
          
          <button 
            className="stats-cta-button" 
            ref={ctaRef} 
            onClick={() => scrollToSection('calendar')}
          >
            Get Started Today
            <HiArrowRight className="button-icon" />
          </button>
        </div>
      </div>

      {/* Lower Section - Video Player */}
      <div className="video-section" ref={videoSectionRef}>
        <div className="video-wrapper">
          <div className="video-container">
            <div className="video-frame" ref={videoFrameRef}>
              <div className="video-placeholder" onClick={handlePlayClick}>
                <div className="play-button">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="rgba(81, 226, 210, 0.9)"/>
                    <path d="M24 20L40 30L24 40V20Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="video-corner top-left" ref={el => cornersRef.current[0] = el}></div>
            <div className="video-corner top-right" ref={el => cornersRef.current[1] = el}></div>
            <div className="video-corner bottom-left" ref={el => cornersRef.current[2] = el}></div>
            <div className="video-corner bottom-right" ref={el => cornersRef.current[3] = el}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;