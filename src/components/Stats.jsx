import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';
import toothImage from '../assets/tooth3d.png';

gsap.registerPlugin(ScrollTrigger);

const Stats = ({ isDarkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs for animation targets
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const toothRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoFrameRef = useRef(null);
  const cornersRef = useRef([]);

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
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Title Animation - staggered lines
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 75%',
          end: 'top 40%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Highlight word special animation
      const highlight = titleRef.current.querySelector('.highlight');
      if (highlight) {
        gsap.from(highlight, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
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
          toggleActions: 'play none none reverse'
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
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
        delay: 0.6,
        ease: 'back.out(1.7)'
      });

      // Tooth Animation - single entrance only
      gsap.from(toothRef.current, {
        scrollTrigger: {
          trigger: toothRef.current,
          start: 'top 50%',
          once: true
        },
        opacity: 0,
        x: 100,
        rotation: -45,
        duration: 2,
        ease: 'power3.out'
      });

      // Video Section Entrance
      gsap.from(videoSectionRef.current, {
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
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
          toggleActions: 'play none none reverse'
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
          toggleActions: 'play none none reverse'
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
    <section className="stats" ref={sectionRef}>
      {/* Upper Section - Introduction */}
      <div className="intro-section">
        <div className="intro-content">
          <div className="intro-left">
            <span className="intro-badge" ref={badgeRef}>• Introduction</span>
            <h1 className="intro-title" ref={titleRef}>
              Transforming dentistry<br />
              through precision AI.<br />
              Discover the power of<br />
              <span className="highlight">OmniDent.</span>
            </h1>
            
            <div className="intro-features" ref={featuresRef}>
              <p>Combining deep market insights with cutting-edge AI to eliminate no-shows, automate administrative tasks, and accelerate practice growth.</p>
            </div>
            
            <button className="swipe btn" ref={ctaRef} onClick={() => scrollToSection('calendar')}>
              Get Started Today
              <span className="container">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path>
                </svg>
              </span>
            </button>
          </div>

          <div className="intro-right">
            <div className="tooth-wrapper" ref={toothRef}>
              <img src={toothImage} alt="3D Tooth" className="tooth-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Video Player */}
      <div className="video-section" ref={videoSectionRef}>
        <div className="video-wrapper">
          <div className="video-container">
            <div className="video-frame" ref={videoFrameRef}>
              {!isPlaying ? (
                <div className="video-placeholder" onClick={handlePlayClick}>
                  <div className="play-button">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="rgba(0, 184, 212, 0.9)"/>
                      <path d="M24 20L40 30L24 40V20Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1"
                  title="OmniDent Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
              )}
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