import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Testi from '../assets/Testi.jpg';
import './Results.css';

gsap.registerPlugin(ScrollTrigger);

const Results = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      text: "In just 3 months, our bookings grew 60%. Patients get answers instantly, and my staff finally has breathing room instead of being stuck on the phone.",
      author: "Dr. Sarah Martinez"
    },
    {
      text: "This has been our best investment. Patient satisfaction is higher, staff stress is lower, and were booking 3x more consultations than before.",
      author: "Dr. James Wilson"
    },
    {
      text: "The SMS and chat integration feels natural. Patients now book while browsing our site, and our no-shows dropped by 40% since reminders go out automatically.",
      author: "Dr. Michael Chen"
    },
    {
      text: "OmniDent.ai saves us 15 hours a week on scheduling. The AI even understands dental terms, so patients feel heard and my front desk can focus on care instead of logistics.",
      author: "Dr. Emily Rodriguez"
    }
  ];

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Title Accent Animation
      const accent = titleRef.current.querySelector('.title-accent');
      if (accent) {
        gsap.from(accent, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            once: true
          },
          opacity: 0,
          x: -30,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out'
        });
      }

      // Carousel Animation
      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate testimonial change
  useEffect(() => {
    const testimonialText = carouselRef.current?.querySelector('.testimonial-text');
    const testimonialAuthor = carouselRef.current?.querySelector('.testimonial-author');

    if (testimonialText && testimonialAuthor) {
      gsap.fromTo(
        [testimonialText, testimonialAuthor],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.inOut' }
      );
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <section 
      className={`results ${isDarkMode ? 'dark' : 'light'}`} 
      style={{ backgroundImage: `url(${Testi})` }}
      ref={sectionRef}
    >
      {/* Background overlay for better text readability */}
      <div className="results-bg-overlay"></div>
      
      <div className="results-container">
        <div className="results-content">
          <div className="results-text">
            <h2 className="results-title" ref={titleRef}>
              <span className="title-accent">Elite practices</span>
              <br />
              are already winning
            </h2>
          </div>

          <div className="testimonial-carousel" ref={carouselRef}>
            <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous testimonial">
              <IoIosArrowBack size={24} />
            </button>

            <div className="testimonial-content">
              <p className="testimonial-text">
                {testimonials[currentIndex].text}
              </p>
              <div className="testimonial-author">
                — {testimonials[currentIndex].author}
              </div>
            </div>

            <button className="carousel-btn next" onClick={handleNext} aria-label="Next testimonial">
              <IoIosArrowForward size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;