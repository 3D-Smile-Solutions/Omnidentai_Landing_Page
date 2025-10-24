import React from 'react';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = React.useState(null);
  const [hoveredSocial, setHoveredSocial] = React.useState(null);

  // Font imports - add these to your index.html or App component
  // <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700&display=swap" rel="stylesheet">
  // For Geist font: npm install geist or use @import url('https://fonts.bunny.net/css?family=geist-sans:400,500,600,700');

  const footerStyle = {
    backgroundColor: '#0a0e27',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    color: '#ffffff',
    padding: '80px 0 40px',
    fontFamily: '"Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
  };

  const containerStyle = {
    width: '100%',
    padding: '0 5%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '60px',
    position: 'relative',
    zIndex: 1,
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '0 20px',
      gridTemplateColumns: '1fr',
      gap: '40px'
    }
  };

  const logoSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    textDecoration: 'none',
    fontFamily: '"Alexandria", Georgia, serif',
    letterSpacing: '-0.5px'
  };

  const logoIconStyle = {
    width: '45px',
    height: '45px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)'
  };

  const linksSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#ffffff',
    fontFamily: '"Alexandria", Georgia, serif',
    letterSpacing: '-0.3px'
  };

  const linkGroupStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: '"Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '400'
  };

  const linkHoverStyle = {
    color: '#ffffff',
    transform: 'translateX(5px)'
  };

  const contactSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const contactTextStyle = {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#94a3b8',
    marginBottom: '20px',
    fontFamily: '"Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '400'
  };

  const ctaButtonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: '14px 35px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    width: 'fit-content',
    fontFamily: '"Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    letterSpacing: '0.3px'
  };

  const emailStyle = {
    color: '#94a3b8',
    fontSize: '15px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'color 0.3s ease',
    fontFamily: '"Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '400'
  };

  const bottomBarStyle = {
    marginTop: '60px',
    paddingTop: '40px',
    borderTop: '1px solid rgba(148, 163, 184, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    padding: '40px 5% 0',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '40px 20px 0',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  };

  const copyrightStyle = {
    fontSize: '13px',
    color: '#64748b',
    fontFamily: '"Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '400',
    letterSpacing: '0.2px'
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '20px'
  };

  const socialIconStyle = {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '18px',
    fontFamily: '"Geist", "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    border: '1px solid rgba(148, 163, 184, 0.1)'
  };

  const decorativeCircleStyle = {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: '0.03',
    top: '-300px',
    right: '-100px',
    pointerEvents: 'none'
  };

  const decorativeCircleLeftStyle = {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    opacity: '0.03',
    bottom: '-200px',
    left: '-100px',
    pointerEvents: 'none'
  };

  const decorativeLineStyle = {
    position: 'absolute',
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent)',
    top: '0',
    left: '0'
  };

  const links = ['Home', 'Patient Journey', 'Platform', 'Results', 'Pricing', 'SmileNexus'];
  
  const socialMedia = [
    { icon: '𝕏', label: 'Twitter' },
    { icon: 'in', label: 'LinkedIn' },
    { icon: 'f', label: 'Facebook' },
    { icon: '@', label: 'Instagram' }
  ];

  // Add responsive styles using media queries
  const isMobile = window.innerWidth <= 768;

  return (
    <footer style={footerStyle}>
      <div style={decorativeLineStyle}></div>
      <div style={decorativeCircleStyle}></div>
      <div style={decorativeCircleLeftStyle}></div>
      
      <div style={{
        ...containerStyle,
        ...(isMobile ? {
          padding: '0 20px',
          gridTemplateColumns: '1fr',
          gap: '40px'
        } : {})
      }}>
        {/* Logo Section */}
        <div style={logoSectionStyle}>
          <a href="/" style={logoStyle}>
            <div style={logoIconStyle}>
              <span>⚡</span>
            </div>
            OmniDent
          </a>
          <p style={{...contactTextStyle, marginBottom: '0'}}>
            Innovative dental solutions for modern practices. 
            Streamlining patient care with cutting-edge technology.
          </p>
        </div>

        {/* Quick Links */}
        <div style={linksSectionStyle}>
          <h3 style={sectionTitleStyle}>Quick Links</h3>
          <div style={{
            ...linkGroupStyle,
            ...(window.innerWidth <= 480 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            {links.map((link, index) => (
              <a
                key={index}
                href="#"
                style={{
                  ...linkStyle,
                  ...(hoveredLink === index ? linkHoverStyle : {})
                }}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div style={contactSectionStyle}>
          <h3 style={sectionTitleStyle}>Get in Touch</h3>
          <p style={contactTextStyle}>
            Ready to explore partnerships, collaborations, or simply want to say hello?
          </p>
          <div>
            <a 
              href="#" 
              style={{
                ...ctaButtonStyle,
                ...(hoveredLink === 'cta' ? {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                } : {})
              }}
              onMouseEnter={() => setHoveredLink('cta')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Let's Chat →
            </a>
          </div>
          <a 
            href="mailto:hello@omnident.com" 
            style={{
              ...emailStyle,
              ...(hoveredLink === 'email' ? {color: '#ffffff'} : {})
            }}
            onMouseEnter={() => setHoveredLink('email')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <span>✉</span> hello@omnident.com
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        ...bottomBarStyle,
        ...(isMobile ? {
          padding: '40px 20px 0',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        } : {})
      }}>
        <div style={copyrightStyle}>
          <p style={{margin: 0}}>San Francisco 06:02:49</p>
          <p style={{margin: '5px 0 0'}}>©2025 OmniDent. All Rights Reserved.</p>
        </div>
        
        <div style={socialLinksStyle}>
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href="#"
              style={{
                ...socialIconStyle,
                ...(hoveredSocial === index ? {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#ffffff',
                  transform: 'translateY(-3px)',
                  border: '1px solid transparent'
                } : {})
              }}
              onMouseEnter={() => setHoveredSocial(index)}
              onMouseLeave={() => setHoveredSocial(null)}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;