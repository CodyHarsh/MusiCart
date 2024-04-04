import React, { useState } from "react";

const CheckoutDeliveryAddress = ({name, setName, address, setAddress }) => {

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    console.log(address)
    setAddress(event.target.value);
  };
  return (
    <div className="leftitem">
      <div className="ll">1. Delivery address</div>
      <div className="lr">
        <input
          type="text"
          placeholder="John Doe"
          className="checkoutName"
          value={name}
          onChange={handleNameChange}
        />
        <textarea
          className="textarea"
          value={address}
          onChange={handleAddressChange}
          cols="30"
          rows="10"
          placeholder={`104 \nkk hh nagar,\nLucknow Uttar Pradesh 226025`}
        ></textarea>
      </div>
    </div>
  );
};

export default CheckoutDeliveryAddress;
