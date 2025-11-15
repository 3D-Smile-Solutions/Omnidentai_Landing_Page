import React, { useState, useEffect } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import './Navbar.css';
import logo from '../assets/Logo.png';
import logoD from '../assets/LogoD.png';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navItems = [
        {
            id: 1,
            name: "Features",
            section: "features",
        },
        {
            id: 2,
            name: "Patient Journey",
            section: "stats",
        },
        {
            id: 3,
            name: "Platform",
            section: "discovery",
        },
        {
            id: 4,
            name: "Results",
            section: "results",
        },
        {
            id: 5,
            name: "Pricing",
            section: "pricing",
        },
        {
            id: 6,
            name: "Smile Nexus",
            section: null,
            isExternal: true,
            url: "https://smilenexus.vercel.app/",
        },
    ];

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const handleNavClick = (item) => {
        if (item.isExternal) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else {
            scrollToSection(item.section);
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`navbar-wrapper ${isDarkMode ? "navbar-dark-mode" : "navbar-light-mode"}`}>
            <div
                className={`navbar-container ${isScrolled ? "navbar-scrolled" : ""}`}
            >
                {/* Logo */}
                <div className="navbar-logo-section">
                    <button 
                        onClick={() => scrollToSection('home')} 
                        className="navbar-logo-button"
                    >
                        <img src={isDarkMode ? logo : logoD} alt="OmniDent AI Logo"/>
                    </button>
                </div>

                {/* Desktop Navigation */}
                <nav className="navbar-nav-desktop">
                    <ul className="navbar-nav-items">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => handleNavClick(item)}
                                    className="navbar-nav-link"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Desktop Buttons */}
                <div className="navbar-cta-section">
                    <button 
                        className="navbar-darkmode-toggle"
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>
                    <button 
                        className="navbar-cta-button"
                        onClick={() => scrollToSection('calendar')}
                    >
                        Get In Touch
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <div className="navbar-mobile-toggle">
                    <button
                        onClick={toggleNavbar}
                        className="navbar-hamburger-button"
                        aria-label="Toggle menu"
                    >
                        <FaBars size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`navbar-mobile-menu ${isOpen ? "navbar-mobile-menu-open" : ""}`}>
                <div className="navbar-mobile-header">
                    <button 
                        onClick={() => scrollToSection('home')} 
                        className="navbar-logo-button"
                    >
                        <img src={isDarkMode ? logo : logoD} alt="OmniDent AI Logo"/>
                    </button>
                    <button
                        onClick={toggleNavbar}
                        className="navbar-mobile-close"
                        aria-label="Close menu"
                    >
                        <IoMdClose size={28} />
                    </button>
                </div>

                <div className="navbar-mobile-divider"></div>

                <nav className="navbar-mobile-nav">
                    <ul className="navbar-mobile-items">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => handleNavClick(item)}
                                    className="navbar-mobile-link"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="navbar-mobile-buttons">
                        <button 
                            className="navbar-mobile-darkmode"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                        <button 
                            className="navbar-mobile-cta"
                            onClick={() => {
                                scrollToSection('calendar');
                                setIsOpen(false);
                            }}
                        >
                            Get In Touch
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Backdrop */}
            {isOpen && (
                <div 
                    className="navbar-mobile-backdrop"
                    onClick={toggleNavbar}
                ></div>
            )}
        </div>
    );
};

export default Navbar;