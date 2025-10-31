import React, { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Results from './components/Results';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import EliteServices from './components/EliteServices';
import InfoGraphic from './components/InfoGraphic';
import Discovery from './components/Discovery';
import Calendar from './components/Calendar';
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div id="hero" className="snap-section">
        <Hero isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      </div>
      <div id="stats" className="snap-section">
        <Stats isDarkMode={isDarkMode} />
      </div>
      <div id="discovery" className="snap-section">
        <Discovery isDarkMode={isDarkMode} />
      </div>
      <div id="features" className="snap-section">
        <Features isDarkMode={isDarkMode} />
      </div>
      <div id="pricing" className="snap-section">
        <Pricing isDarkMode={isDarkMode} />
      </div>
      <div id="results" className="snap-section">
        <Results isDarkMode={isDarkMode} />
      </div>
      <div id="infographic" className="snap-section">
        <InfoGraphic isDarkMode={isDarkMode} />
      </div>
      <div id="calendar" className="snap-section">
        <Calendar isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default App;