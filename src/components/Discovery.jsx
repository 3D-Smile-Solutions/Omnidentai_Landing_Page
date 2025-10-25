import React from 'react';
import './Discovery.css';

const Discovery = ({ isDarkMode }) => {
  return (
    <section className={`discovery ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="discovery-container">
        <div className="discovery-header">
          <h2 className="discovery-title">
            Your competitors are<br />
            already losing out
          </h2>
          <p className="discovery-subtitle">
            While others struggle with outdated systems, forward-thinking practices 
            are capturing market share with intelligent automation
          </p>
        </div>

        <div className="discovery-content">
          <div className="discovery-video">
            <div className="video-frame">
              <div className="play-button">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="#5EBEC4">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="video-label">See How It Works</p>
            </div>
          </div>

          <div className="discovery-benefits">
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Gain Market Share</h3>
              <p>Capture patients leaving competitors who can't deliver modern experiences</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Accelerate Growth</h3>
              <p>Scale your practice 3x faster with automated patient acquisition</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💎</div>
              <h3>Premium Positioning</h3>
              <p>Position your practice as the innovative leader in your market</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Competitive Edge</h3>
              <p>Stay ahead with AI-powered insights your competitors don't have</p>
            </div>
          </div>
        </div>

        <div className="discovery-cta">
          <h3>Ready to Transform Your Practice?</h3>
          <p>Book Your Discovery Call</p>
          <button className="discovery-button">Schedule Now →</button>
        </div>
      </div>
    </section>
  );
};

export default Discovery;