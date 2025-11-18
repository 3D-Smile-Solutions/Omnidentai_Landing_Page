import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import PatientJourneyAnim from '../assets/PatientJourneyAnimation.mp4';

import './Stats.css';

const Stats = ({ isDarkMode }) => {
  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`stats ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Upper Section - Introduction */}
      <div className="intro-section">
        <div className="intro-content">
          <span className="intro-badge">• Introduction</span>
          
          <h1 className="intro-title">
            Transforming <span className="title-accent">dentistry</span> through precision AI.
          </h1>
          
          <div className="intro-features">
            <p>
              Unlocking personalised dental care with intelligent diagnostics, automated notes, and streamlined workflows that put patients first.
            </p>
            <p>
              This approach improves outcomes and practice efficiency, delivering expert support and measurable results every day.
            </p>
          </div>
          
          <button 
            className="stats-cta-button" 
            onClick={() => scrollToSection('calendar')}
          >
            Get Started Today
            <HiArrowRight className="button-icon" />
          </button>
        </div>
      </div>

      {/* Lower Section - Video Player */}
      <div className="video-section">
        <div className="video-wrapper">
          <div className="video-container">
            <div className="video-frame">
              {/* Autoplay Video - No Controls */}
              <video 
                className="video-content"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src={PatientJourneyAnim} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-corner top-left"></div>
            <div className="video-corner top-right"></div>
            <div className="video-corner bottom-left"></div>
            <div className="video-corner bottom-right"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;