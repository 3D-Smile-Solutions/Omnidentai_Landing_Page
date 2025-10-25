import React from 'react';
import './Stats.css';

const Stats = ({ isDarkMode }) => {
  return (
    <section className={`stats ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Dental Three Years</h2>
          <p className="stats-subtitle">
            Transforming dental practices with proven results and consistent growth
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">24.9</div>
            <div className="stat-label">Average revenue increase (%)</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">87%</div>
            <div className="stat-label">Customer satisfaction rate</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: '87%' }}></div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">3.2x</div>
            <div className="stat-label">ROI within first year</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Implementation success rate</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        <div className="stats-details">
          <div className="detail-card">
            <h3>Practice Growth</h3>
            <p>Consistent month-over-month growth with our automated patient engagement systems</p>
          </div>
          <div className="detail-card">
            <h3>Patient Retention</h3>
            <p>Industry-leading retention rates through personalized communication strategies</p>
          </div>
          <div className="detail-card">
            <h3>Operational Efficiency</h3>
            <p>Reduce administrative burden by 60% with intelligent automation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;