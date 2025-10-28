import React, { useState } from 'react';
import './Features.css';
// Import all images at the top
import f1 from '../assets/f1.png';
import f2 from '../assets/f2.png';
import f3 from '../assets/f3.png';
import f4 from '../assets/f4.png';
import f5 from '../assets/f5.png';
import f6 from '../assets/f6.png';

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const featureData = [
    {
      id: 1,
      title: "AI-Powered Scheduling",
      count: "(1)",
      description: "Intelligent appointment booking that understands patient preferences, provider availability, and treatment requirements.",
      image: f1 // Use the imported image variable
    },
    {
      id: 2,
      title: "Smart Reminders & Confirmations",
      count: "(2)",
      description: "Automated reminders via SMS, email, and voice calls that reduce no-shows and keep patients informed.",
      image: f2
    },
    {
      id: 3,
      title: "Insurance Verification",
      count: "(3)",
      description: "Instant insurance eligibility checks and coverage verification to streamline the billing process.",
      image: f3
    },
    {
      id: 4,
      title: "Treatment Plan Communication",
      count: "(4)",
      description: "Clear, automated communication of treatment plans, costs, and next steps to improve case acceptance.",
      image: f4
    },
    {
      id: 5,
      title: "Post-Treatment Follow-up",
      count: "(5)",
      description: "Automated follow-up messages to check on patient recovery and schedule necessary appointments.",
      image: f5
    },
    {
      id: 6,
      title: "Practice Analytics Dashboard",
      count: "(6)",
      description: "Real-time insights into practice performance, patient flow, and revenue metrics for data-driven decisions.",
      image: f6
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-content">
          <div className="features-left">
            <div className="features-header">
              <span className="section-label">See The Difference</span>
              <h2 className="features-title">
                Core features<br />
                that drive results
              </h2>
            </div>

            <div className="features-list">
              {featureData.map((feature) => (
                <div
                  key={feature.id}
                  className={`feature-item ${hoveredFeature === feature.id ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="feature-title-wrapper">
                    <h3 className="feature-title">
                      {feature.title} <span className="feature-count">{feature.count}</span>
                    </h3>
                  </div>
                  <div className="feature-description">
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="features-right">
            <div className="feature-image-box">
              {hoveredFeature ? (
                <img 
                  src={featureData.find(f => f.id === hoveredFeature)?.image} 
                  alt="Feature visualization"
                  className="feature-image"
                />
              ) : (
                <div className="feature-placeholder">
                  <span>Hover over a feature to see details</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;