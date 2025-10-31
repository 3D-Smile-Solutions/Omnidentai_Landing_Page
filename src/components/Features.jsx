import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';
// Import all images at the top
import f1 from '../assets/f1.png';
import f2 from '../assets/f2.png';
import f3 from '../assets/f3.png';
import f4 from '../assets/f4.png';
import f5 from '../assets/f5.png';
import f6 from '../assets/f6.png';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  
  // Refs for animation targets
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const featureItemsRef = useRef([]);
  const imageBoxRef = useRef(null);
  const featuresRightRef = useRef(null);

  const featureData = [
    {
      id: 1,
      title: "AI-Powered Scheduling",
      count: "(1)",
      description: "Intelligent appointment booking that understands patient preferences, provider availability, and treatment requirements.",
      image: f1
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section Label Animation
      gsap.from(labelRef.current, {
        scrollTrigger: {
          trigger: labelRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.1,
        ease: 'power3.out'
      });

      // Pin the right side (image box) while scrolling through features
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: featuresRightRef.current,
        pinSpacing: false,
      });

      // Create scroll trigger for each feature item
      featureItemsRef.current.forEach((item, index) => {
        if (item) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveFeature(index + 1),
            onEnterBack: () => setActiveFeature(index + 1),
            // markers: true, // Uncomment for debugging
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section className="features" ref={sectionRef}>
      <div className="features-container">
        <div className="features-content">
          <div className="features-left">
            <div className="features-header">
              <span className="section-label" ref={labelRef}>See The Difference</span>
              <h2 className="features-title" ref={titleRef}>
                Core features<br />
                that drive results
              </h2>
            </div>

            <div className="features-list">
              {featureData.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-item ${activeFeature === feature.id ? 'active' : ''}`}
                  ref={el => featureItemsRef.current[index] = el}
                  onMouseEnter={() => setActiveFeature(feature.id)}
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

          <div className="features-right" ref={featuresRightRef}>
            <div className="feature-image-box" ref={imageBoxRef}>
              {featureData.map((feature) => (
                <img 
                  key={feature.id}
                  src={feature.image} 
                  alt={feature.title}
                  className={`feature-image ${activeFeature === feature.id ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;