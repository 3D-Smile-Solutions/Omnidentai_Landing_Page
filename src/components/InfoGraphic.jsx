import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import LogoLoop from '../StylingComponents/LogoLoop.jsx';
import './InfoGraphic.css';
import CurveDental from '../assets/ScrollLogos/Curve Dental.svg';
import Denticon from '../assets/ScrollLogos/Denticon Logo.svg';
import Eaglesoft from '../assets/ScrollLogos/Eaglesoft Logo.png';
import Dentrix from '../assets/ScrollLogos/Dentrix Logo.svg';
import Fuse from '../assets/ScrollLogos/Fuse Dental.svg';
import OpenDental from '../assets/ScrollLogos/Open Dental Logo.png';

const InfoGraphic = ({ isDarkMode }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const dentalLogos = [
    { src: Denticon, alt: 'Denticon', href: '' },
    { src: Dentrix, alt: 'Dentrix', href: '' },
    { src: CurveDental, alt: 'Curve Dental', href: '' },
    { src: OpenDental, alt: 'Open Dental', href: '' },
    { src: Fuse, alt: 'Fuse Dental', href: '' },
    { src: Eaglesoft, alt: 'Eaglesoft', href: '' },
    { src: Denticon, alt: 'Denticon', href: '' },
    { src: Dentrix, alt: 'Dentrix', href: '' },
    { src: CurveDental, alt: 'Curve Dental', href: '' },
    { src: OpenDental, alt: 'Open Dental', href: '' },
  ];

  return (
    <section className={`infographic ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="infographic-container">
        <div className="infographic-header">
          <h2 className="infographic-title">
            Seamless <span className="title-accent">Integration</span> with Your Existing PMS
          </h2>
          <p className="infographic-subtitle">
            Connect with 80+ practice management systems in under 30 minutes.<br />
            No technical expertise required.
          </p>
        </div>

        <div className="logo-loop-wrapper">
          <div className="logo-loop-container">
            <LogoLoop
              logos={dentalLogos}
              speed={80}
              direction="left"
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor={isDarkMode ? "#1a1a1a" : "#ffffff"}
              ariaLabel="Practice Management System Partners"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoGraphic;