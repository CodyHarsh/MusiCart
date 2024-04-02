import React, { useState } from "react";

const CheckoutPayment = ({selectedPaymentMethod, setSelectedPaymentMethod}) => {

  const handleChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="leftitem">
      <div className="ll">2. Payment method</div>
      <div className="lr">
        <select
          value={selectedPaymentMethod}
          onChange={handleChange}
          className="paymentmethods"
        >
          <option value="" disabled>
            Mode of Payment
          </option>
          <option value="cash">Pay on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>
      </div>
    </div>
  );
};

export default CheckoutPayment;
