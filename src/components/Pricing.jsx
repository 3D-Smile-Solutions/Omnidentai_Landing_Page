import React from 'react';

const PricingGrowthStack = () => {
  // Set this to 'light' or 'dark' to switch themes
  const theme = 'light'; // Change this to 'dark' for dark theme
  
  // Theme configurations
  const themes = {
    light: {
      containerBg: '#f8f9fa',
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
      growthStackColor: '#00b4d8',
      coreCardBg: 'linear-gradient(145deg, #a8d8ea 0%, #8fc4e0 100%)',
      builtInCardBg: 'linear-gradient(145deg, #b8f4e6 0%, #9fe8d1 100%)',
      optionalCardBg: 'linear-gradient(145deg, #f5d9b7 0%, #ecc5a0 100%)',
      coreTextColor: '#1a4a6a',
      builtInTextColor: '#0a4a3a',
      optionalTextColor: '#3a2a1a',
      corePriceColor: '#2a7a9a',
      coreButtonBg: '#1a4a6a',
      builtInButtonBg: '#0a3a2a',
      optionalButtonBg: '#2a1a0a',
      buttonTextColor: 'white',
      arrowBg: '#00b4d8',
      dotColor: '#ff4444',
    },
    dark: {
      containerBg: 'linear-gradient(135deg, #2a2a2a 0%, #1a3a4a 50%, #0a4a5a 100%)',
      textPrimary: 'white',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      growthStackColor: '#4fd1c5',
      coreCardBg: 'linear-gradient(145deg, #4a90e2 0%, #3a7bc8 100%)',
      builtInCardBg: 'linear-gradient(145deg, #b8f4e6 0%, #9fe8d1 100%)',
      optionalCardBg: 'linear-gradient(145deg, #f5d9b7 0%, #ecc5a0 100%)',
      coreTextColor: 'white',
      builtInTextColor: '#0a4a3a',
      optionalTextColor: '#3a2a1a',
      corePriceColor: '#a0e5a0',
      coreButtonBg: '#1a2a3a',
      builtInButtonBg: '#0a3a2a',
      optionalButtonBg: '#2a1a0a',
      buttonTextColor: 'white',
      arrowBg: '#4fd1c5',
      dotColor: '#ff4444',
    }
  };
  
  const currentTheme = themes[theme];
  
  const containerStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: currentTheme.containerBg,
    padding: '60px 40px',
    fontFamily: '"Geist", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 400,
    fontStyle: 'normal',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'auto',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    maxWidth: '800px',
    margin: '0 auto 40px',
  };

  const pricingBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    color: currentTheme.textPrimary,
    fontSize: '11px',
    fontFamily: '"Alexandria", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 500,
    fontStyle: 'normal',
    marginBottom: '15px',
    letterSpacing: '0.5px',
  };

  const dotStyle = {
    width: '5px',
    height: '5px',
    backgroundColor: currentTheme.dotColor,
    borderRadius: '50%',
    marginRight: '8px',
  };

  const titleStyle = {
    fontSize: '56px',
    fontFamily: '"Alexandria", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 300,
    fontStyle: 'normal',
    color: currentTheme.textPrimary,
    margin: '0 0 20px 0',
    letterSpacing: '-0.5px',
  };

  const growthStackStyle = {
    color: currentTheme.growthStackColor,
    fontWeight: 400,
  };

  const subtitleStyle = {
    color: currentTheme.textSecondary,
    fontSize: '14px',
    fontFamily: '"Geist", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: '1.6',
    maxWidth: '650px',
    margin: '0 auto',
  };

  const cardsContainerStyle = {
    display: 'flex',
    gap: '30px',
    maxWidth: '1480px',
    margin: '60px auto 0',
    padding: '0',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const cardStyle = {
    flex: '1',
    minWidth: '340px',
    maxWidth: '400px',
    borderRadius: '8px',
    padding: '35px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme === 'light' ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
  };

  const coreCardStyle = {
    ...cardStyle,
    background: currentTheme.coreCardBg,
  };

  const builtInCardStyle = {
    ...cardStyle,
    background: currentTheme.builtInCardBg,
  };

  const optionalCardStyle = {
    ...cardStyle,
    background: currentTheme.optionalCardBg,
  };

  const cardHeaderStyle = {
    fontSize: '16px',
    fontFamily: '"Alexandria", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '1px',
    marginBottom: '20px',
    textTransform: 'uppercase',
  };

  const coreHeaderStyle = {
    ...cardHeaderStyle,
    color: currentTheme.coreTextColor,
  };

  const builtInHeaderStyle = {
    ...cardHeaderStyle,
    color: currentTheme.builtInTextColor,
  };

  const optionalHeaderStyle = {
    ...cardHeaderStyle,
    color: currentTheme.optionalTextColor,
  };

  const cardTitleStyle = {
    fontSize: '28px',
    fontFamily: '"Alexandria", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 600,
    fontStyle: 'normal',
    lineHeight: '1.4',
    marginBottom: '30px',
    minHeight: '75px',
  };

  const coreTitleStyle = {
    ...cardTitleStyle,
    color: currentTheme.coreTextColor,
  };

  const builtInTitleStyle = {
    ...cardTitleStyle,
    color: currentTheme.builtInTextColor,
  };

  const optionalTitleStyle = {
    ...cardTitleStyle,
    color: currentTheme.optionalTextColor,
  };

  const priceStyle = {
    fontSize: '52px',
    fontFamily: '"Alexandria", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 600,
    fontStyle: 'normal',
    marginBottom: '-8px',
    letterSpacing: '-0.5px',
  };

  const corePriceStyle = {
    ...priceStyle,
    color: currentTheme.corePriceColor,
  };

  const priceSubtextStyle = {
    fontSize: '16px',
    fontFamily: '"Geist", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 700,
    fontStyle: 'normal',
    marginBottom: '30px',
  };

  const corePriceSubtextStyle = {
    ...priceSubtextStyle,
    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : currentTheme.coreTextColor,
  };

  const featuresListStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0 0 auto 0',
    flexGrow: '1',
  };

  const featureItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px',
    fontSize: '18px',
    fontFamily: '"Geist", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: '1.5',
  };

  const coreFeatureStyle = {
    ...featureItemStyle,
    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : currentTheme.coreTextColor,
  };

  const builtInFeatureStyle = {
    ...featureItemStyle,
    color: currentTheme.builtInTextColor,
  };

  const optionalFeatureStyle = {
    ...featureItemStyle,
    color: currentTheme.optionalTextColor,
  };

  const checkmarkStyle = {
    marginRight: '10px',
    flexShrink: '0',
    marginTop: '2px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px 24px',
    borderRadius: '26px',
    border: 'none',
    fontSize: '14px',
    fontFamily: '"Geist", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 600,
    fontStyle: 'normal',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '30px',
    transition: 'all 0.3s ease',
  };

  const coreButtonStyle = {
    ...buttonStyle,
    backgroundColor: currentTheme.coreButtonBg,
    color: currentTheme.buttonTextColor,
  };

  const builtInButtonStyle = {
    ...buttonStyle,
    backgroundColor: currentTheme.builtInButtonBg,
    color: currentTheme.buttonTextColor,
  };

  const optionalButtonStyle = {
    ...buttonStyle,
    backgroundColor: currentTheme.optionalButtonBg,
    color: currentTheme.buttonTextColor,
  };

  const arrowStyle = {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    backgroundColor: currentTheme.arrowBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme === 'dark' ? '#0a2a3a' : 'white',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const footerTextStyle = {
    fontSize: '11px',
    fontFamily: '"Geist", sans-serif',
    fontOpticalSizing: 'auto',
    fontWeight: 800,
    fontStyle: 'normal',
    marginTop: '12px',
    textAlign: 'center',
  };

  const coreFooterStyle = {
    ...footerTextStyle,
    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(26, 74, 106, 0.7)',
  };

  const builtInFooterStyle = {
    ...footerTextStyle,
    color: 'rgba(10, 74, 58, 0.7)',
  };

  const optionalFooterStyle = {
    ...footerTextStyle,
    color: 'rgba(58, 42, 26, 0.7)',
  };

  const indicatorDotsStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    gap: '4px',
  };

  const indicatorDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={pricingBadgeStyle}>
          <span style={dotStyle}></span>
          Pricing
        </div>
        <h1 style={titleStyle}>
          Pricing and <span style={growthStackStyle}>Growth Stack</span>
        </h1>
        <p style={subtitleStyle}>
          Convert more leads with AI that instantly responds across SMS, web chat, and voice calls. Natural
          conversations that understand context and book appointments seamlessly.
        </p>
      </div>

      <div style={cardsContainerStyle}>
        {/* Core Platform Card */}
        <div style={coreCardStyle}>
          <div style={coreHeaderStyle}>CORE PLATFORM</div>
          <div style={coreTitleStyle}>
            Automated intake, two-way messaging, scheduling, and live practice analytics.
          </div>
          <div style={corePriceStyle}>$995/mo</div>
          <div style={corePriceSubtextStyle}>+$5,000 implementation</div>
          
          <ul style={featuresListStyle}>
            <li style={coreFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              Patient engagement and booking automation
            </li>
            <li style={coreFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              Analytics dashboard, CPL, CPA, show rates, ROI
            </li>
            <li style={coreFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              HIPAA-ready architecture and integrations
            </li>
          </ul>
          
          <button style={coreButtonStyle}>
            Book A Demo
            <span style={arrowStyle}>→</span>
          </button>
          <p style={coreFooterStyle}>
            Includes $1,000 marketing activation credit managed by Concierge.work
          </p>
        </div>

        {/* Built In Card */}
        <div style={builtInCardStyle}>
          <div style={builtInHeaderStyle}>BUILT IN</div>
          <div style={builtInTitleStyle}>
            Marketing partner inside OmniDent.AI. Uses platform metrics to optimize spend
          </div>
          
          <ul style={featuresListStyle}>
            <li style={builtInFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              $1,000 activation credit included
            </li>
            <li style={builtInFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              SEO, landing pages, and paid campaign builds
            </li>
            <li style={builtInFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              Continuous tuning from OmniDent.ai analytics
            </li>
          </ul>
          
          <button style={builtInButtonStyle}>
            Book A Strategy Call
            <span style={arrowStyle}>→</span>
          </button>
          <p style={builtInFooterStyle}>
            Runs as part of your OmniDent.ai subscription.
          </p>
        </div>

        {/* Optional Card */}
        <div style={optionalCardStyle}>
          <div style={optionalHeaderStyle}>OPTIONAL</div>
          <div style={optionalTitleStyle}>
            Social media partner for practices that want growth in reach and content.
          </div>
          
          <ul style={featuresListStyle}>
            <li style={optionalFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              Content planning and production
            </li>
            <li style={optionalFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              Platform growth and engagement tactics
            </li>
            <li style={optionalFeatureStyle}>
              <span style={checkmarkStyle}>●</span>
              Aligns with campaigns from Concepcion.work
            </li>
          </ul>
          
          <button style={optionalButtonStyle}>
            Grow Social Media
            <span style={arrowStyle}>→</span>
          </button>
          <p style={optionalFooterStyle}>
            Runs as part of your OmniDent.ai subscription.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingGrowthStack;