import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Results.css';
import Person from '../assets/Person.png';

gsap.registerPlugin(ScrollTrigger);

const Results = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      text: "In just 3 months, our bookings grew 60%. Patients get answers instantly, and my staff finally has breathing room instead of being stuck on the phone.",
      author: "Dr. Sarah Martinez",
      title: "Martinez Family Dentistry",
      company: "",
      image: Person,
    },
    {
      text: "This has been our best investment. Patient satisfaction is higher, staff stress is lower, and we're booking 3x more consultations than before.",
      author: "Dr. James Wilson",
      title: "Wilson Orthodontics",
      company: "",
      image: Person,
    },
    {
      text: "The SMS and chat integration feels natural. Patients now book while browsing our site, and our no-shows dropped by 40% since reminders go out automatically.",
      author: "Dr. Michael Chen",
      title: "Smile Bright Dental",
      company: "",
      image: Person,
    },
    {
      text: "OmniDent.ai saves us 15 hours a week on scheduling. The AI even understands dental terms, so patients feel heard and my front desk can focus on care instead of logistics.",
      author: "Dr. Emily Rodriguez",
      title: "Downtown Dental Care",
      company: "",
      image: Person,
    }
  ];

  // Auto-rotate slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(sliderRef.current, {
        scrollTrigger: {
          trigger: sliderRef.current,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section 
      className={`results ${isDarkMode ? 'dark' : 'light'}`}
      ref={sectionRef}
    >
      <div className="results-container">
        <h2 className="results-title" ref={titleRef}>
          Hear <span className="title-accent">from</span> our partners
        </h2>

        <div className="testimonial-slider" ref={sliderRef}>
          {/* Navigation Arrow - Previous */}
          <button 
            className="slider-arrow prev" 
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="arrow-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>

          {/* Slider Track */}
          <div className="slider-track">
            <div 
              className="slider-inner"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="card-background"></div>
                  
                  <div className="card-content">
                    <div className="card-photo">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/320x320/1a1a1a/5EBEC4?text=Client';
                        }}
                      />
                    </div>

                    <div className="card-text">
                      <p className="testimonial-quote">
                        "{testimonial.text}"
                      </p>

                      <div className="testimonial-author-section">
                        <div className="author-info">
                          <h4 className="author-name">{testimonial.author}</h4>
                          <p className="author-title">{testimonial.title}</p>
                        </div>
                        
                        <div className="company-logo">
                          <span className="company-name">{testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrow - Next */}
          <button 
            className="slider-arrow next" 
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="arrow-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;