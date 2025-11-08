import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import './Navbar.css';

const Navbar = ({ 
  logo, 
  logoAlt = 'Logo', 
  onThemeToggle, 
  isDarkMode = false 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Platform', href: '#platform' },
    { label: 'Patient Journey', href: '#patient-journey' },
    { label: 'SmileNexus', href: '#smilenexus' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Results', href: '#results' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="#home">
              <img src={logo} alt={logoAlt} className="logo-image" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="nav-link"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            {onThemeToggle && (
              <button
                className="theme-toggle"
                onClick={onThemeToggle}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
              </button>
            )}

            {/* CTA Button */}
            <button className="navbar-cta-button">
              Book a Demo
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
          
          {/* Mobile CTA Button */}
          <button className="mobile-cta-button" onClick={handleLinkClick}>
            Book a Demo
          </button>

          {/* Mobile Theme Toggle */}
          {onThemeToggle && (
            <button
              className="mobile-theme-toggle"
              onClick={() => {
                onThemeToggle();
                handleLinkClick();
              }}
            >
              {isDarkMode ? (
                <>
                  <MdLightMode size={20} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <MdDarkMode size={20} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-backdrop" 
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navbar;