import { useState } from 'react'
import Pricing from './components/Pricing.jsx';
import Hero from './components/Hero.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
      {/*<Pricing />*/}
    </>
  )
}

export default App
