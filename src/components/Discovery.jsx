import React from 'react';
import './Discovery.css';

const Discovery = ({ isDarkMode }) => {
  return (
    <section className={`discovery ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="discovery-container">
        <div className="discovery-content">
          <div className="discovery-left">
            <h1 className="discovery-title">
              One AI, Three Ways<br />
              to <span className="highlight">Connect with Patients </span>
            </h1>
            <p className="discovery-subtitle">
              OmniDent.ai is a single intelligent system that patients can reach through their 
              preferred communication channel - text, web chat, or phone call. Same powerful AI, 
              same instant results, their choice of interaction.
            </p>

            <div className="connection-cards">
              <div className="connection-card">
                <div className="card-header">
                  <h3>Text Message Access</h3>
                </div>
                <p>Patients text your practice number and instantly connect with OmniDent.ai for scheduling, questions, and more.</p>
              </div>

              <div className="connection-card">
                <div className="card-header">
                  <h3>Website Chat Widget</h3>
                </div>
                <p>A sleek chat bubble on your website connects visitors directly to OmniDent.ai for instant assistance.</p>
              </div>

              <div className="connection-card">
                <div className="card-header">
                  <h3>Phone Call Access</h3>
                </div>
                <p>Patients call your practice number and speak naturally with OmniDent.ai's voice assistant.</p>
              </div>
            </div>
          </div>

          <div className="discovery-right">
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">3x</div>
                <div className="stat-label">FASTER RESPONSE</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">24-7</div>
                <div className="stat-label">AVAILABILITY</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">AUTOMATED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discovery;