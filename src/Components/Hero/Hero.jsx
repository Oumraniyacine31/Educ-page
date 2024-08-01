import React from 'react'
import'./Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'
function Hero() {
  return (
    <div className='Hero container'>
      <div className="hero-text">
        <h1>We ensure better education for a better world</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab illo quis, labore dolorum minus porro eos? Minus ratione qui tempora necessitatibus error accusantium. Eius deleniti, pariatur nihil eligendi omnis aliquid.</p>
        <button className='btn'>Explore more <img src={dark_arrow} alt="" /></button>
      </div>
      
    </div>
  )
}

export default Hero
