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

const Features = ({ isDarkMode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);

  const featureData = [
    {
      id: 1,
      title: "AI-Powered Scheduling",
      description: "Intelligent appointment booking that understands patient preferences, provider availability, and treatment requirements.",
      bgColor: "#CCCCCC",
      image: f1,
      stats: [
        "95% Booking Efficiency",
        "5 min Average Time",
        "24/7 Availability"
      ]
    },
    {
      id: 2,
      title: "Smart Reminders & Confirmations",
      description: "Automated reminders via SMS, email, and voice calls that reduce no-shows and keep patients informed.",
      bgColor: "#949599",
      image: f2,
      stats: [
        "60% Fewer No-Shows",
        "Multi-Channel Delivery",
        "Real-Time Updates"
      ]
    },
    {
      id: 3,
      title: "Insurance Verification",
      description: "Instant insurance eligibility checks and coverage verification to streamline the billing process.",
      bgColor: "#6D6E72",
      image: f3,
      stats: [
        "2 sec Verification",
        "99% Accuracy Rate",
        "500+ Plans Supported"
      ]
    },
    {
      id: 4,
      title: "Treatment Plan Communication",
      description: "Clear, automated communication of treatment plans, costs, and next steps to improve case acceptance.",
      bgColor: "#209DE6",
      image: f4,
      stats: [
        "85% Acceptance Rate",
        "Clear Cost Breakdown",
        "Patient Portal Access"
      ]
    },
    {
      id: 5,
      title: "Post-Treatment Follow-up",
      description: "Automated follow-up messages to check on patient recovery and schedule necessary appointments.",
      bgColor: "#06b6d4",
      image: f5,
      stats: [
        "92% Satisfaction",
        "Automated Scheduling",
        "Recovery Tracking"
      ]
    },
    {
      id: 6,
      title: "Practice Analytics Dashboard",
      description: "Real-time insights into practice performance, patient flow, and revenue metrics for data-driven decisions.",
      bgColor: "#10b981",
      image: f6,
      stats: [
        "50+ Key Metrics",
        "Real-Time Insights",
        "Custom Reports"
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      // Apply same pinned animation to ALL screen sizes
      mm.add("(min-width: 768px)", () => {
        // Calculate total scroll distance: header + (features * 3 phases each)
        const totalSteps = 1 + (featureData.length * 3); // 1 header + 3 phases per feature
        const scrollDistance = totalSteps * 150; // Increased from 100 to 150 for slower scroll

        // Pin the container
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}%`,
          pin: containerRef.current,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentStep = Math.floor(progress * totalSteps);
            setActiveStep(currentStep);
          }
        });

        // Master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}%`,
            scrub: 1,
          }
        });

        const stepDuration = 1 / totalSteps;

        // Step 0: Show header
        tl.fromTo(headerRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: stepDuration, ease: "power2.out" },
          0
        );

        // Fade out header
        tl.to(headerRef.current,
          { opacity: 0, y: -50, duration: stepDuration, ease: "power2.in" },
          stepDuration
        );

        // Animate each feature (each gets its own circle that grows and stays)
        featureData.forEach((feature, index) => {
          const featureStartStep = 1 + (index * 3);
          const featureStartTime = featureStartStep * stepDuration;

          // Phase 1: Background circle grows and STAYS
          tl.fromTo(bgRefs.current[index],
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1.5, duration: stepDuration * 2.0, ease: "power2.out" },
            featureStartTime
          );

          // Phase 2: Text content slides in from left (during circle growth)
          tl.fromTo(textRefs.current[index],
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: stepDuration * 0.4, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.3)
          );

          // Phase 3: Image slides in from right (slightly after text)
          tl.fromTo(imageRefs.current[index],
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: stepDuration * 0.4, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.5)
          );

          // Fade out content before next feature (but keep circle visible)
          if (index < featureData.length - 1) {
            const fadeOutTime = featureStartTime + (stepDuration * 2.0);
            
            tl.to([textRefs.current[index], imageRefs.current[index]],
              { opacity: 0, duration: stepDuration * 0.3, ease: "power2.in" },
              fadeOutTime
            );
          }
          // Note: circles never shrink - they all stay visible and stack
        });
      });

      // Mobile: Apply same pinned animation for small screens
      mm.add("(max-width: 767px)", () => {
        // Calculate total scroll distance: header + (features * 3 phases each)
        const totalSteps = 1 + (featureData.length * 3);
        const scrollDistance = totalSteps * 150;

        // Pin the container
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}%`,
          pin: containerRef.current,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentStep = Math.floor(progress * totalSteps);
            setActiveStep(currentStep);
          }
        });

        // Master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}%`,
            scrub: 1,
          }
        });

        const stepDuration = 1 / totalSteps;

        // Step 0: Show header
        tl.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: stepDuration, ease: "power2.out" },
          0
        );

        // Fade out header
        tl.to(headerRef.current,
          { opacity: 0, y: -30, duration: stepDuration, ease: "power2.in" },
          stepDuration
        );

        // Animate each feature
        featureData.forEach((feature, index) => {
          const featureStartStep = 1 + (index * 3);
          const featureStartTime = featureStartStep * stepDuration;

          // Phase 1: Background circle grows and STAYS
          tl.fromTo(bgRefs.current[index],
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1.5, duration: stepDuration * 2.0, ease: "power2.out" },
            featureStartTime
          );

          // Phase 2: Text content slides in from bottom (mobile-friendly)
          tl.fromTo(textRefs.current[index],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: stepDuration * 0.5, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.3)
          );

          // Phase 3: Image slides in from bottom (slightly after text)
          tl.fromTo(imageRefs.current[index],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: stepDuration * 0.5, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.5)
          );

          // Fade out content before next feature (but keep circle visible)
          if (index < featureData.length - 1) {
            const fadeOutTime = featureStartTime + (stepDuration * 2.0);
            
            tl.to([textRefs.current[index], imageRefs.current[index]],
              { opacity: 0, duration: stepDuration * 0.3, ease: "power2.in" },
              fadeOutTime
            );
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [featureData.length]);

  return (
    <section className={`features-sequence ${isDarkMode ? 'dark-mode' : 'light-mode'}`} ref={sectionRef}>
      <div className="features-sequence-container" ref={containerRef}>
        {/* Header */}
        <div className="features-header-sequence" ref={headerRef}>
          <span className="features-label">See The Difference</span>
          <h2 className="features-heading">
            Core Features<br />
            That Drive Results
          </h2>
        </div>

        {/* Features */}
        {featureData.map((feature, index) => (
          <div key={feature.id} className="feature-layer">
            {/* Each feature has its own circle that grows and stays */}
            <div
              ref={el => bgRefs.current[index] = el}
              className="feature-background"
              style={{ 
                backgroundColor: feature.bgColor,
                zIndex: index + 1 // Stack circles: newer ones on top
              }}
            />

            {/* Text Content */}
            <div
              ref={el => textRefs.current[index] = el}
              className="feature-text-layer"
              style={{ zIndex: 100 + index }} // Above all circles
            >
              <div className="feature-text-content">
                <span className="feature-number">0{feature.id}</span>
                <h3 className="feature-layer-title">{feature.title}</h3>
                <p className="feature-layer-description">{feature.description}</p>
                <ul className="feature-stats-list">
                  {feature.stats.map((stat, idx) => (
                    <li key={idx} className="stat-bullet">
                      <span className="bullet-icon">✓</span>
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image */}
            <div
              ref={el => imageRefs.current[index] = el}
              className="feature-image-layer"
              style={{ zIndex: 200 + index }} // Above text and circles
            >
              <div className="image-frame">
                <img src={feature.image} alt={feature.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;