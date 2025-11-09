import React, { useState, useEffect } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiBookOpen } from "react-icons/fi";
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const navItems = [
        {
            id: 1,
            name: "Features",
            section: "features",
        },
        {
            id: 2,
            name: "Patient Journey",
            section: "patient-journey",
        },
        {
            id: 3,
            name: "Platform",
            section: "platform",
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

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // You can add logic here to actually change your app's theme
        // For example: document.body.classList.toggle('dark-mode');
    };

    // Function to handle scroll event
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    // Function to scroll to section or open external link
    const handleNavClick = (item) => {
        if (item.isExternal) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else {
            scrollToSection(item.section);
        }
    };

    // Function to scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false); // Close mobile menu after clicking
        }
    };

    // Adding event listener on mount and removing on unmount
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            id="navbar"
            className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
        >
            {/* Logo */}
            <div className="navbar-logo-container">
                <button 
                    onClick={() => scrollToSection('home')} 
                    className="navbar-logo-button"
                >
                    <FiBookOpen size={24} />
                    LearnHub
                </button>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="navbar-hamburger">
                <button
                    onClick={toggleNavbar}
                    className="navbar-hamburger-button"
                >
                    <FaBars size={24} />
                </button>
            </div>

            {/* Navbar items and buttons */}
            <div className={`navbar-menu ${isOpen ? "navbar-menu-open" : ""}`}>
                {/* Logo and close icon Inside Toggle Menu */}
                <div className="navbar-mobile-header">
                    {/* Logo */}
                    <button 
                        onClick={() => scrollToSection('home')} 
                        className="navbar-logo-button"
                    >
                        <FiBookOpen size={24} />
                        LearnHub
                    </button>
                    {/* Close Icon */}
                    <div className="navbar-close-container">
                        <button
                            onClick={toggleNavbar}
                            className="navbar-close-button"
                        >
                            <IoMdClose size={28} />
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="navbar-divider"></div>

                <div className="navbar-content">
                    {/* Navbar items */}
                    <ul className="navbar-items">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => handleNavClick(item)}
                                    className="navbar-link"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="navbar-buttons">
                        <button 
                            className="navbar-button navbar-button-darkmode"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                        <button 
                            className="navbar-button navbar-button-demo"
                            onClick={() => scrollToSection('calendar')}
                        >
                            Request a Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;