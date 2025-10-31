import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';
import './Discovery.css';
import { FiMessageSquare, FiMonitor, FiPhone } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Discovery = ({ isDarkMode }) => {
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

      // Animate cards with stagger
      mainTimeline.fromTo(
        cardsRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        },
        '-=0.2'
      );

      // Animate card internals
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector('.channel-icon-box');
        const title = card.querySelector('.channel-title');
        const description = card.querySelector('.channel-description');
        const features = card.querySelectorAll('.channel-features li');
        const button = card.querySelector('.channel-btn');

        const cardTimeline = gsap.timeline();

        cardTimeline
          .fromTo(icon, 
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }
          )
          .fromTo(title,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '-=0.2'
          )
          .fromTo(description,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '-=0.2'
          )
          .fromTo(features,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
            '-=0.2'
          )
          .fromTo(button,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '-=0.2'
          );

        mainTimeline.add(cardTimeline, `-=${0.6 - (index * 0.15)}`);
      });

      // Hold at the end
      mainTimeline.to({}, { duration: 0.3 });

    }, sectionRef);

    return () => ctx.revert();
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
          <SpotlightCard 
            ref={el => cardsRef.current[0] = el}
            className="custom-spotlight-card x" 
            spotlightColor="rgba(238, 255, 0, 0.21)"
          >
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

          <SpotlightCard 
            ref={el => cardsRef.current[1] = el}
            className="custom-spotlight-card y" 
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
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

          <SpotlightCard 
            ref={el => cardsRef.current[2] = el}
            className="custom-spotlight-card z" 
            spotlightColor="rgba(255, 145, 0, 0.2)"
          >
            <div className="channel-icon-box indigo">
              <FiPhone className="channel-icon" />
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