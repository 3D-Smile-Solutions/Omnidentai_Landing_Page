import React from 'react';
import './InfoGraphic.css';

const InfoGraphic = ({ isDarkMode }) => {
  return (
    <section className={`infographic ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="infographic-container">
        <div className="infographic-header">
          <h2 className="infographic-title">
            Seamless integration with Your<br />
            <span className="highlight">Existing PME</span>
          </h2>
          <p className="infographic-subtitle">
            Connect effortlessly with your current practice management software
          </p>
        </div>

        <div className="integration-flow">
          <div className="flow-diagram">
            <div className="flow-center">
              <div className="center-circle">
                <span>OmniDent</span>
              </div>
            </div>

            <div className="flow-items">
              <div className="flow-item top-left">
                <div className="flow-card">
                  <h4>Patient Data</h4>
                  <p>Sync patient records</p>
                </div>
                <div className="flow-line line-1"></div>
              </div>

              <div className="flow-item top-right">
                <div className="flow-card">
                  <h4>Appointments</h4>
                  <p>Real-time scheduling</p>
                </div>
                <div className="flow-line line-2"></div>
              </div>

              <div className="flow-item bottom-left">
                <div className="flow-card">
                  <h4>Analytics</h4>
                  <p>Performance insights</p>
                </div>
                <div className="flow-line line-3"></div>
              </div>

              <div className="flow-item bottom-right">
                <div className="flow-card">
                  <h4>Communications</h4>
                  <p>Automated messaging</p>
                </div>
                <div className="flow-line line-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="integration-features">
          <div className="integration-card">
            <div className="integration-icon">🔄</div>
            <h3>Two-way sync</h3>
            <p>Real-time data synchronization ensures your information is always up-to-date</p>
          </div>
          <div className="integration-card">
            <div className="integration-icon">🔒</div>
            <h3>HIPAA Compliant</h3>
            <p>Enterprise-grade security protecting patient data at every touchpoint</p>
          </div>
          <div className="integration-card">
            <div className="integration-icon">⚡</div>
            <h3>Quick Setup</h3>
            <p>Get up and running in minutes with our guided integration process</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoGraphic;