import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';
import './Discovery.css';
import { FiMessageSquare, FiMonitor, FiPhone } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Discovery = ({ isDarkMode }) => {
  // Refs for animation targets
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Highlight word special animation
      const highlight = titleRef.current.querySelector('.highlight');
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

    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section className={`discovery ${isDarkMode ? 'dark' : 'light'}`} ref={sectionRef}>
      <div className="discovery-container">
        <h1 className="discovery-title" ref={titleRef}>
          One AI, Three Ways<br />
          to <span className="highlight">Connect with Patients</span>
        </h1>
        <p className="discovery-subtitle" ref={subtitleRef}>
          OmniDent.ai is a single intelligent system that patients can reach through their 
          preferred communication channel - text, web chat, or phone call. Same powerful AI, 
          same instant results, their choice of interaction.
        </p>
        
        <div className="channels-grid">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(238, 255, 0, 0.21)">
            <div className="channel-icon-box cyan">
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
            <button className="channel-btn cyan">
              95% delivery rate • Instant responses
            </button>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="channel-icon-box teal">
              <FiMonitor className="channel-icon" />
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
            <button className="channel-btn teal">
              24/7 availability • No app needed
            </button>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 145, 0, 0.2)">
            <div className="channel-icon-box indigo">
              <FiPhone className="channel-icon" />
            </div>
            <h3 className="channel-title">PHONE CALL ACCESS</h3>
            <p className="channel-description">
              Patients call your practice number and speak naturally with OmniDent.ai's voice assistant.
            </p>
            <ul className="channel-features">
              <li>• Prefer talking to typing</li>
              <li>• Need complex help</li>
              <li>• Call after hours</li>
            </ul>
            <button className="channel-btn indigo">
              Natural conversation • Never on hold
            </button>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default Discovery;