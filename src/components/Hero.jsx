import React from 'react';

const OmniDentHero = () => {
  // Navigation styles
  const navContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 60px',
    maxWidth: '100%',
    margin: '0',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const logoIconStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const logoTextStyle = {
    fontSize: '20px',
    fontFamily: '"Alexandria", sans-serif',
    fontWeight: 600,
    color: 'white',
    letterSpacing: '-0.5px',
  };

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    flex: 1,
    marginLeft: '100px',
  };

  const navLinkStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '13px',
    fontFamily: '"Geist", sans-serif',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    transition: 'color 0.3s ease',
    position: 'relative',
  };

  const requestDemoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '10px 18px 10px 22px',
    borderRadius: '25px',
    fontSize: '13px',
    fontFamily: '"Geist", sans-serif',
    fontWeight: 500,
    color: '#2a4f5f',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
  };

  const demoArrowStyle = {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#4fd1c5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  // Hero section styles
  const heroContainerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #5ba8b8 0%, #4a95a5 25%, #3d8292 50%, #2f6f7f 75%, #225c6c 100%)',
  };

  const backgroundOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 70% 50%, rgba(79, 209, 197, 0.3) 0%, transparent 50%)',
    pointerEvents: 'none',
  };

  const heroContentStyle = {
    position: 'relative',
    zIndex: 10,
    paddingTop: '180px',
    paddingLeft: '60px',
    paddingRight: '60px',
    maxWidth: '100%',
    margin: '0',
  };

  const pioneerTextStyle = {
    fontSize: '72px',
    fontFamily: '"Alexandria", sans-serif',
    fontWeight: 600,
    color: '#4fd1c5',
    marginBottom: '0px',
    letterSpacing: '-1.5px',
  };

  const mainHeadingStyle = {
    fontSize: '72px',
    fontFamily: '"Alexandria", sans-serif',
    fontWeight: 600,
    color: 'white',
    lineHeight: '1.15',
    marginBottom: '60px',
    marginTop: '-5px',
    letterSpacing: '-1.5px',
  };

  const featuresContainerStyle = {
    display: 'flex',
    gap: '100px',
    marginTop: '40px',
    maxWidth: '900px',
  };

  const featureColumnStyle = {
    flex: 1,
    maxWidth: '340px',
  };

  const featureTextStyle = {
    fontSize: '14px',
    fontFamily: '"Geist", sans-serif',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: '1.7',
    marginBottom: '30px',
  };

  const bulletListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const bulletItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '14px',
    fontSize: '14px',
    fontFamily: '"Geist", sans-serif',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.85)',
  };

  const checkIconStyle = {
    color: '#4fd1c5',
    marginRight: '10px',
    fontSize: '14px',
    marginTop: '1px',
  };

  const seeRoiButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '12px 20px 12px 24px',
    borderRadius: '28px',
    fontSize: '13px',
    fontFamily: '"Geist", sans-serif',
    fontWeight: 600,
    color: '#2a4f5f',
    cursor: 'pointer',
    border: 'none',
    marginTop: '30px',
    transition: 'all 0.3s ease',
  };

  const roiArrowStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#4fd1c5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  const decorativeDotsStyle = {
    position: 'relative',
    display: 'flex',
    gap: '6px',
    marginTop: '20px',
  };

  const dotStyle = {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: 'rgba(79, 209, 197, 0.4)',
  };

  // Logo SVG component
  const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24" 
            stroke="#4fd1c5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 8V16L20 12" 
            stroke="#4fd1c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      {/* Navigation Bar */}
      <nav style={navContainerStyle}>
        <div style={navStyle}>
          <div style={logoContainerStyle}>
            <div style={logoIconStyle}>
              <LogoIcon />
            </div>
            <span style={logoTextStyle}>OmniDent</span>
          </div>
          
          <div style={navLinksStyle}>
            <a style={navLinkStyle} href="#features">FEATURES</a>
            <a style={navLinkStyle} href="#journey">PATIENT JOURNEY</a>
            <a style={navLinkStyle} href="#platform">PLATFORM</a>
            <a style={navLinkStyle} href="#results">RESULTS</a>
            <a style={navLinkStyle} href="#pricing">PRICING</a>
            <a style={navLinkStyle} href="#smilenexus">SMILENEXUS</a>
          </div>

          <button style={requestDemoStyle}>
            Request a Demo
            <span style={demoArrowStyle}>→</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={heroContainerStyle}>
        <div style={backgroundOverlayStyle}></div>
        
        <div style={heroContentStyle}>
          <h1 style={pioneerTextStyle}>Pioneer</h1>
          <h2 style={mainHeadingStyle}>
            the future<br />
            of patient engagement
          </h2>

          <div style={featuresContainerStyle}>
            {/* Left Column */}
            <div style={featureColumnStyle}>
              <p style={featureTextStyle}>
                Unlock the power of precision dentistry with OmniDent, a unified platform that brings together AI charting, imaging insights and advanced analytics for smarter clinical decisions.
              </p>
              
              <div style={decorativeDotsStyle}>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
              </div>
            </div>

            {/* Right Column */}
            <div style={featureColumnStyle}>
              <ul style={bulletListStyle}>
                <li style={bulletItemStyle}>
                  <span style={checkIconStyle}>✓</span>
                  HIPAA Compliant
                </li>
                <li style={bulletItemStyle}>
                  <span style={checkIconStyle}>✓</span>
                  OmniChannel
                </li>
                <li style={bulletItemStyle}>
                  <span style={checkIconStyle}>✓</span>
                  30-day money back guarantee
                </li>
              </ul>

              <button style={seeRoiButtonStyle}>
                See a ROI
                <span style={roiArrowStyle}>→</span>
              </button>

              <div style={{...decorativeDotsStyle, marginTop: '40px'}}>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
                <span style={dotStyle}></span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements and image overlay */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '-10%',
          width: '65%',
          height: '100%',
          background: 'linear-gradient(to left, rgba(79, 209, 197, 0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '50%',
          height: '80%',
          opacity: '0.15',
          background: 'radial-gradient(circle at center, rgba(79, 209, 197, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}></div>
      </div>
    </>
  );
};

export default OmniDentHero;