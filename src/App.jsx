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
      <Hero isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <Stats isDarkMode={isDarkMode} />
      <Features isDarkMode={isDarkMode} />
      <Discovery isDarkMode={isDarkMode} />
      <Pricing isDarkMode={isDarkMode} />
      <Results isDarkMode={isDarkMode} />
      <InfoGraphic isDarkMode={isDarkMode} />
      <Calendar isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;