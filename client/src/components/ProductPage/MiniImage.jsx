import React from 'react'

const MiniImage = ({miniImage}) => {
  return (
    <div className='miniimage'>
        <img src={miniImage} alt="mini" className='miniimageimage' />
    </div>
  )
}

export default MiniImage