import React from 'react'

export const InvoiceImage = ({color, productName, handleUpdatedName, imageLink}) => {
  return (
    <div>
         <img
            onClick={() => handleUpdatedName(
                color,
                productName
            )}
            src={imageLink}
            alt="product"
            />
    </div>
  )
}
