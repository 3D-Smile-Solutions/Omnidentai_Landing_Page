import React from 'react';
import './Hero.css';
import heroGif from '../assets/Hero.gif';
import NavLogo from '../assets/Logo.png';

const Hero = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <section className={`hero ${isDarkMode ? 'dark' : 'light'}`} style={{ backgroundImage: `url(${heroGif})` }}>
      {/* Dark Overlay */}
      <div className="hero-overlay"></div>
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <img src={NavLogo} alt="OmniDent AI Logo" className="logo-icon" />
          </div>
          <div className="nav-center">
            <a href="#features" className="nav-link">FEATURES</a>
            <a href="#patent" className="nav-link">PATENT JOURNEY</a>
            <a href="#platform" className="nav-link">PLATFORM</a>
            <a href="#results" className="nav-link">RESULTS</a>
            <a href="#pricing" className="nav-link">PRICING</a>
            <a href="#smilenexus" className="nav-link">SMILENEXUS</a>
          </div>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a class="swipe">Request a Demo<span class="container"><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path></svg></span> </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="highlight">Pioneer</span> the future<br />
            of patient engagement
          </h1>
        </div>
        
        <div className="hero-visual">
          <div className="info-boxes-container">
            {/* First Info Box */}
            <div className="info-box info-box-1">
              <p className="info-box-content">
                Unlock the power of precision dentistry with OmniDent AI unified platform that brings together AI chatflow, imaging insights and advanced analytics for smarter clinical decisions.
              </p>
            </div>

            {/* Second Info Box */}
            <div className="info-box info-box-2">
              <div className="info-box-features">
                <div className="feature-item">
                  <div className="feature-icon"></div>
                  <span className="feature-text">HIPAA Compliant</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"></div>
                  <span className="feature-text">OmniChannel</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"></div>
                  <span className="feature-text">30-day money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
       
        </div>


      </div>

    </section>
  );
};

export default Hero;