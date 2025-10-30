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
      <div id="hero">
        <Hero isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      </div>
      <div id="stats">
        <Stats isDarkMode={isDarkMode} />
      </div>
      <div id="features">
        <Features isDarkMode={isDarkMode} />
      </div>
      <div id="discovery">
        <Discovery isDarkMode={isDarkMode} />
      </div>
      <div id="pricing">
        <Pricing isDarkMode={isDarkMode} />
      </div>
      <div id="results">
        <Results isDarkMode={isDarkMode} />
      </div>
      <div id="infographic">
        <InfoGraphic isDarkMode={isDarkMode} />
      </div>
      <div id="calendar">
        <Calendar isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default App;