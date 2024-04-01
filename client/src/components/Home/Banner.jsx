import React from 'react'
import "../../css/Home/Banner.css"
import BannerImage from "../../assets/banner-girl.png"

const Banner = () => {
  return (
    <>
    <div className='banner'>
        <div className='bannerleft'>
            <span className='text'>Grab upto 50% off on selected headphones</span>
            <button>Buy Now</button>
        </div>
        <div className='bannerright'>
            <img src={BannerImage} alt="banner" className='bannerimage' />
        </div>
    </div>
    </>
  )
}

export default Banner