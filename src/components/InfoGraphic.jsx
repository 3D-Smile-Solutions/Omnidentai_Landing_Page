import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './InfoGraphic.css';
import CurveDental from '../assets/ScrollLogos/Curve Dental.svg';
import Denticon from '../assets/ScrollLogos/Denticon Logo.svg';
import Eaglesoft from '../assets/ScrollLogos/Eaglesoft Logo.png';
import Dentrix from '../assets/ScrollLogos/Dentrix Logo.svg';
import Fuse from '../assets/ScrollLogos/Fuse Dental.svg';
import OpenDental from '../assets/ScrollLogos/Open Dental Logo.png';

const InfoGraphic = ({ isDarkMode }) => {
  const wheelRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Logo data with imported images
  const logos = [
    { id: 1, name: 'Denticon', image: Denticon },
    { id: 2, name: 'Dentrix', image: Dentrix },
    { id: 3, name: 'Curve', image: CurveDental },
    { id: 4, name: 'OpenDental', image: OpenDental },
    { id: 5, name: 'Fuse', image: Fuse },
    { id: 6, name: 'EagleSoft', image: Eaglesoft },
    { id: 7, name: 'Denticon2', image: Denticon }, // Duplicate for more logos
    { id: 8, name: 'Dentrix2', image: Dentrix },
    { id: 9, name: 'Curve2', image: CurveDental },
    { id: 10, name: 'OpenDental2', image: OpenDental },
  ];

  useEffect(() => {
    const wheel = wheelRef.current;
    const cards = wheel.querySelectorAll('.wheel__card');
    
    const setup = () => {
      const radius = wheel.offsetWidth / 2;
      const center = radius;
      const slice = 360 / cards.length;
      const DEG2RAD = Math.PI / 180;

      gsap.set(cards, {
        x: (i) => center + radius * Math.sin(i * slice * DEG2RAD),
        y: (i) => center - radius * Math.cos(i * slice * DEG2RAD),
        rotation: (i) => i * slice,
        xPercent: -50,
        yPercent: -50,
      });
    };

    setup();

    // Auto rotation
    animationRef.current = gsap.to(wheel, {
      rotation: -360,
      ease: 'none',
      duration: 30,
      repeat: -1,
    });

    // Handle resize
    const handleResize = () => setup();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  return (
    <section className={`infographic ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="infographic-container">
        <div className="infographic-header">
          <div className="integration-label">• Integration</div>
          <h2 className="infographic-title">
            Seamless Integration with Your<br />
            <span className="highlight">Existing PMS</span>
          </h2>
          <p className="infographic-subtitle">
            Connect with 80+ practice management systems in under 30 minutes.<br />
            No technical expertise required.
          </p>
        </div>

        {/* Wheel Carousel - Positioned to be half behind CTA */}
        <div className="wheel-wrapper">
          <section 
            className="slider-section"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`wheel ${isPaused ? 'paused' : ''}`} ref={wheelRef}>
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="wheel__card"
                >
                  <div className="logo-content">
                    <img 
                      src={logo.image} 
                      alt={logo.name}
                      className="logo-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom CTA Section */}
        <div className="bottom-cta-section">
          <div className="cta-content">
            <h3 className="cta-title">
              Your competitors are<br />
              already using AI
            </h3>
            <a class="swipe cta-button">Book a Discovery Call<span class="container"><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="#d0ff00ff"></path></svg></span> </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoGraphic;