import React from 'react';
import './Pricing.css';

const Pricing = ({ isDarkMode }) => {
  return (
    <section className={`pricing ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="pricing-container">
        <div className="pricing-header">
          <span className="pricing-label">• Pricing</span>
          <h2 className="pricing-title">
            Pricing and <span className="title-highlight">Growth Stack</span>
          </h2>
          <p className="pricing-subtitle">
            Convert more leads with AI that instantly responds across SMS, web chat, and voice calls. Natural<br />
            conversations that understand context and book appointments seamlessly.
          </p>
        </div>

        <div className="pricing-cards">
          {/* Core Platform Card */}
          <div className="pricing-card core-platform">
            <div className="card-header">
              <h3 className="card-title">CORE PLATFORM</h3>
              <p className="card-description">
                Automated intake, two-way<br />
                messaging, scheduling, and<br />
                live practice analytics.
              </p>
            </div>
            <div className="card-price">
              <span className="price-amount">$995</span>
              <span className="price-period">/mo</span>
            </div>
            <div className="card-subtitle">
              +$5,000 implementation
            </div>
            <ul className="card-features">
              <li>
                <span className="feature-icon"></span>
                <span>Patient engagement and booking automation</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Analytics dashboard, QR., OPA, show rates, ROI</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>HIPAA-ready architecture and integrations</span>
              </li>
            </ul>
            <a class="swipe pricing-btn">Book A Demo<span class="container"><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path></svg></span> </a>     
            <p className="card-footer">
              Includes SAVE marketing activation credit managed by<br />
              Omnicient.ai core
            </p>
          </div>

          {/* Built In Card */}
          <div className="pricing-card built-in">
            <div className="card-header">
              <h3 className="card-title">BUILT IN</h3>
              <p className="card-description">
                Marketing partner inside<br />
                OmniDent.AI. Uses platform<br />
                metrics to optimize spend
              </p>
            </div>
            <ul className="card-features">
              <li>
                <span className="feature-icon"></span>
                <span>$1,000 activation credit included</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>SEO, landing pages, and paid campaign builds</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Continuous tuning from OmniDent.ai analytics</span>
              </li>
            </ul>
            <a class="swipe pricing-btn">Book A Strategy Call<span class="container"><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path></svg></span> </a>
            <p className="card-footer">
              Runs as part of your OmniDent.ai subscription
            </p>
          </div>

          {/* Optional Card */}
          <div className="pricing-card optional">
            <div className="card-header">
              <h3 className="card-title">OPTIONAL</h3>
              <p className="card-description">
                Social media partner for<br />
                practices that want growth<br />
                in reach and content.
              </p>
            </div>
            <ul className="card-features">
              <li>
                <span className="feature-icon"></span>
                <span>Content planning and production</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Platform growth and engagement tactics</span>
              </li>
              <li>
                <span className="feature-icon"></span>
                <span>Aligns with campaigns from Connector.work</span>
              </li>
            </ul>
            <a class="swipe pricing-btn">Grow Social Media<span class="container"><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path></svg></span> </a>
            <p className="card-footer">
              Runs as part of your OmniDent.ai subscription
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;