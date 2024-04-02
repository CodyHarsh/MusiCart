import { createContext } from "react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

let url = import.meta.env.VITE_URL;

const CartState = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const toastMessage = (message, type) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  const getCart = async (id, postName, quantity=0) => {
    try {
      const response = await fetch(`${url}/user/getCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ 
          id,
          postName,
          quantity
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log(data);
        setCart(data.data.products);
        setTotal(data.data.totalPrice);
        setTotalQuantity(data.data.totalQuantity);
        return true;
      } else {
        toastMessage(data.error, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  
  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${url}/user/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();

      if (data.success) {
        getCart();
        toastMessage("Item Added", "success");
        return true;
      } else {
        toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateQuantity = async (productId, quantity=1) => {
    try {
      const response = await fetch(`${url}/user/updateQuantity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ quantity, productId }),
      });
      const data = await response.json();

      if (data.success) {
        toastMessage("Item Added", "success");
        getCart();
        return true;
      } else {
        toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const buyNow = async (id) => {
    try {
      const response = await fetch(`${url}/api/view/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
      });
      let data = await response.json();
      if (data.success) {
        data.quantity = 1;
        setCart([data.product]);
        setTotal(data.product.price);
      } else {
        toastMessage(data.error, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const checkout = async (name, purchaseDate,address ,selectedPaymentMethod,total, orderDelivery, productIds) => {
    //userId, name, purchaseDate, address, paymentMethod, orderItems, orderDelivery, products
    console.log(name, purchaseDate,address ,selectedPaymentMethod,total, orderDelivery, productIds)
    try {
      const response = await fetch(`${url}/user/addInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ 
          name,
          purchaseDate,
          address,
          paymentMethod: selectedPaymentMethod,
          orderItems: total,
          orderDelivery,
          products: productIds
         }),
      });
      const data = await response.json();
      if (data.success) {
        toastMessage("Order Success", "success");
        return true;
      } else {
        toastMessage(data.error, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        checkout,
        getCart,
        total,
        updateQuantity,
        buyNow,
        totalQuantity
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartState };

export default CartContext;
