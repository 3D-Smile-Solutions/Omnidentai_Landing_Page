import React, { useState } from 'react';
import './Stats.css';
import toothImage from '../assets/tooth3d.png'; // Add your 3D tooth image

const Stats = ({ isDarkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="stats">
      {/* Upper Section - Introduction */}
      <div className="intro-section">
        <div className="intro-content">
          <div className="intro-left">
            <span className="intro-badge">• Introduction</span>
            <h1 className="intro-title">
              Transforming dentistry<br />
              through precision AI.<br />
              Discover the power of<br />
              <span className="highlight">OmniDent.</span>
            </h1>
            
            <div className="intro-features">
              <p>Combining deep market insights with cutting-edge AI to eliminate no-shows, automate administrative tasks, and accelerate practice growth.</p>
            </div>
            <a class="swipe btn">Get Started Today<span class="container"><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path></svg></span> </a>

          </div>

          <div className="intro-right">
            <div className="tooth-wrapper">
              <img src={toothImage} alt="3D Tooth" className="tooth-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Video Player */}
      <div className="video-section">
        <div className="video-wrapper">
          <div className="video-container">
            <div className="video-frame">
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
                  src="https://www.youtube.com/embed/watch?v=xvFZjo5PgG0"
                  title="OmniDent Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
              )}
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