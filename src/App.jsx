import { useState } from 'react'
import Pricing from './components/Pricing.jsx';
import Hero from './components/Hero.jsx';
import Footer from './components/Footer.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Footer/>
      {/*<Hero />
      <Pricing />*/}
    </>
  )
}

export default App
