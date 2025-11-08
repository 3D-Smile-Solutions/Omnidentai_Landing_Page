import React from 'react';
import './EliteServices.css';

const EliteServices = ({ isDarkMode }) => {
  return (
    <section className={`elite-services ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="elite-container">
        <div className="elite-header">
          <h2 className="elite-title">
            Elite practices<br />
            are already changing
          </h2>
          <p className="elite-subtitle">
            Join leading dental practices transforming patient care with OmniDent
          </p>
        </div>

        <div className="elite-content">
          <div className="elite-left">
            <div className="elite-video-placeholder">
              <div className="play-button">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#5EBEC4">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span>Video Testimonial</span>
            </div>
          </div>

          <div className="elite-right">
            <h3>Transform Your Practice Today</h3>
            <p>
              Leading dental practices are seeing unprecedented growth with our 
              AI-powered patient engagement platform. From automated appointment 
              reminders to intelligent treatment recommendations, we're helping 
              practices deliver exceptional patient experiences while maximizing 
              operational efficiency.
            </p>
            
            <div className="elite-stats">
              <div className="elite-stat">
                <span className="stat-number">500+</span>
                <span className="stat-text">Practices transformed</span>
              </div>
              <div className="elite-stat">
                <span className="stat-number">2M+</span>
                <span className="stat-text">Patients engaged</span>
              </div>
              <div className="elite-stat">
                <span className="stat-number">98%</span>
                <span className="stat-text">Retention rate</span>
              </div>
            </div>

            <button className="elite-cta">Join Elite Practices →</button>
          </div>
        </div>

        <div className="elite-logos">
          <p className="logos-title">Trusted by industry leaders</p>
          <div className="logos-grid">
            <div className="logo-placeholder">Logo 1</div>
            <div className="logo-placeholder">Logo 2</div>
            <div className="logo-placeholder">Logo 3</div>
            <div className="logo-placeholder">Logo 4</div>
            <div className="logo-placeholder">Logo 5</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteServices;