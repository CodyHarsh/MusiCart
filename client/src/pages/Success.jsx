import React from 'react'
import '../css/Success.css'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='success'>
    <div className='innerdiv'>
        <img src="https://res.cloudinary.com/dp7faudgz/image/upload/v1712187664/Music%20cart/Logo%2C%20banner%2C%20success%20page%20logo%2C%20page%20not%20found/sucess_v7mvev.png" alt='confetti' />
        <h1>Order is placed successfully!</h1>
        <p>You  will be receiving a confirmation email with order details</p>
        <Link to="/" className='goback'>Go back to Home page</Link>
    </div>
    </div>
  )
}

export default Success