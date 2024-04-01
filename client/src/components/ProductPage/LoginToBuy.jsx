import React from 'react'
import {Link} from "react-router-dom"

const LoginToBuy = () => {
  return (
    <div className='logintobuy'>
      <Link to="/login" className='login'>Login</Link>
      To Buy This Item
    </div>
  )
}

export default LoginToBuy