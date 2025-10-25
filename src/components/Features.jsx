import React from 'react';
import './Features.css';

const Features = ({ isDarkMode }) => {
  return (
    <section className={`features ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="features-container">
        {/* Video Player */}
        <div className="video-wrapper">
          <div className="video-frame">
            <div className="corner-bracket top-left"></div>
            <div className="corner-bracket top-right"></div>
            <div className="corner-bracket bottom-left"></div>
            <div className="corner-bracket bottom-right"></div>
            
            <div className="video-placeholder">
              <div className="play-button">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#5EBEC4">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="video-text">Video Placeholder</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-header">
          <span className="section-label">OUR SOLUTION</span>
          <h2 className="features-title">
            Automating all<br />
            every campaign
          </h2>
          <p className="features-subtitle">
            Advanced automation streamlines your entire patient engagement workflow, 
            from initial contact through treatment completion.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📧</div>
            <h3>Automated Patient Outreach</h3>
            <p>Intelligent email and SMS campaigns that adapt to patient preferences and behaviors</p>
            <div className="feature-stats">
              <span className="stat-value">45%</span>
              <span className="stat-label">Higher engagement</span>
            </div>
            <button className="feature-btn">Learn more</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Comprehensive Analytics</h3>
            <p>Real-time dashboards providing deep insights into campaign performance and ROI</p>
            <div className="feature-stats">
              <span className="stat-value">3x</span>
              <span className="stat-label">Better ROI tracking</span>
            </div>
            <button className="feature-btn">Learn more</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Targeting</h3>
            <p>AI-driven segmentation delivers the right message to the right patient at the right time</p>
            <div className="feature-stats">
              <span className="stat-value">68%</span>
              <span className="stat-label">Conversion increase</span>
            </div>
            <button className="feature-btn">Learn more</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;