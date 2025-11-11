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
      bgColor: "#6bffcbff",
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
      bgColor: "#FFC9D7",
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
      bgColor: "#D0D7F5",
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
      bgColor: "#2aceb3ff",
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
      bgColor: "#F2EAC8",
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
      bgColor: "#9FD7FA",
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
      
      // Desktop: Faster animation
      mm.add("(min-width: 768px)", () => {
        // Calculate total scroll distance with FASTER transitions
        const stepsPerFeature = 1.8; // Reduced from 2.5 for faster speed
        const totalSteps = 1 + (featureData.length * stepsPerFeature);
        const scrollDistance = totalSteps * 100; // Reduced from 150 for faster scroll

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

        // Animate each feature
        featureData.forEach((feature, index) => {
          const featureStartStep = 1 + (index * stepsPerFeature);
          const featureStartTime = featureStartStep * stepDuration;

          // Phase 1: Background circle grows faster
          tl.fromTo(bgRefs.current[index],
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1.5, duration: stepDuration * 2.5, ease: "power2.out" },
            featureStartTime
          );

          // Phase 2: Text content slides in from left (faster)
          tl.fromTo(textRefs.current[index],
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: stepDuration * 0.3, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.2)
          );

          // Phase 3: Image slides in from right (slightly after text)
          tl.fromTo(imageRefs.current[index],
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: stepDuration * 0.3, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.35)
          );

          // Fade out content faster before next feature
          if (index < featureData.length - 1) {
            const fadeOutTime = featureStartTime + (stepDuration * 1.4);
            
            tl.to([textRefs.current[index], imageRefs.current[index]],
              { opacity: 0, duration: stepDuration * 0.15, ease: "power2.in" },
              fadeOutTime
            );
          }
        });
      });

      // Mobile: FASTER animation with QUICKER header fade
      mm.add("(max-width: 767px)", () => {
        // Calculate total scroll distance with EVEN FASTER transitions for mobile
        const stepsPerFeature = 1.5; // Reduced more for mobile (was 2.5)
        const totalSteps = 1 + (featureData.length * stepsPerFeature);
        const scrollDistance = totalSteps * 80; // Reduced more for mobile (was 150)

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

        // Step 0: Show header - FASTER
        tl.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: stepDuration * 0.6, ease: "power2.out" },
          0
        );

        // Fade out header - MUCH FASTER and EARLIER
        tl.to(headerRef.current,
          { opacity: 0, y: -30, duration: stepDuration * 0.4, ease: "power2.in" },
          stepDuration * 0.5
        );

        // Animate each feature
        featureData.forEach((feature, index) => {
          const featureStartStep = 1 + (index * stepsPerFeature);
          const featureStartTime = featureStartStep * stepDuration;

          // Phase 1: Background circle grows faster on mobile
          tl.fromTo(bgRefs.current[index],
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1.5, duration: stepDuration * 1.5, ease: "power2.out" },
            featureStartTime
          );

          // Phase 2: Text content slides in from bottom (faster on mobile)
          tl.fromTo(textRefs.current[index],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: stepDuration * 0.35, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.2)
          );

          // Phase 3: Image slides in from bottom (faster on mobile)
          tl.fromTo(imageRefs.current[index],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: stepDuration * 0.35, ease: "power2.out" },
            featureStartTime + (stepDuration * 0.3)
          );

          // Fade out content even faster on mobile
          if (index < featureData.length - 1) {
            const fadeOutTime = featureStartTime + (stepDuration * 1.2);
            
            tl.to([textRefs.current[index], imageRefs.current[index]],
              { opacity: 0, duration: stepDuration * 0.1, ease: "power2.in" },
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
                zIndex: index + 1
              }}
            />

            {/* Text Content */}
            <div
              ref={el => textRefs.current[index] = el}
              className="feature-text-layer"
              style={{ zIndex: 100 + index }}
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
              style={{ zIndex: 200 + index }}
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