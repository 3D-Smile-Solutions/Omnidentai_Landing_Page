import React from 'react';
import Testi from '../assets/Testi.jpg';
import './Results.css';

const Results = ({ isDarkMode }) => {
  return (
    <section className={`results ${isDarkMode ? 'dark' : 'light'}`} style={{ backgroundImage: `url(${Testi})` }}>
      {/* Background overlay for better text readability */}
      <div className="results-bg-overlay"></div>
      
      <div className="results-container">
        <div className="results-content">
          <div className="results-text">
            <h2 className="results-title">
              <span className="title-accent">Elite practices</span>
              <br />
              are already winning
            </h2>
          </div>

          <div className="testimonial-carousel">
            <button className="carousel-btn prev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                We've saved 15 hours per week on appointment scheduling. The AI understands dental terminology perfectly.
              </p>
              <div className="testimonial-author">
                — Dr Emily Rodriguez
              </div>
            </div>

            <button className="carousel-btn next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;