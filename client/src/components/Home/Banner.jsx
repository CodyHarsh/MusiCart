import React from 'react'
import "../../css/Home/Banner.css"

const Banner = () => {
  return (
    <>
    <div className='banner'>
        <div className='bannerleft'>
            <span className='text'>Grab upto 50% off on selected headphones</span>
            <button>Buy Now</button>
        </div>
        <div className='bannerright'>
            <img src="https://res.cloudinary.com/dp7faudgz/image/upload/v1712187691/Music%20cart/Logo%2C%20banner%2C%20success%20page%20logo%2C%20page%20not%20found/banner_t9hgm8.png" alt="banner" className='bannerimage' />
        </div>
    </div>
    </>
  )
}

export default Banner