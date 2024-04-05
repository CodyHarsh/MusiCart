import { createContext, useRef } from "react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

let url = import.meta.env.VITE_URL;

const CartState = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState([]);
  const singleInvoicesData  = useRef(null);
  
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
        setCart(data.data.products);
        setTotal(data.data.totalPrice);
        setTotalQuantity(data.data.totalQuantity);
        return true;
      } else {
       // toastMessage(data.error, "warning");
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
        //toastMessage("Item Added", "success");
        getCart();
        return true;
      } else {
        //toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const buyNow = async (id) => {
    try {
      const response = await fetch(`${url}/product/getproductbyid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id})
      });
      let data = await response.json();
      if (data.success) {
        data.data.quantity = 1;
        setCart(data.data);
        setTotal(data.data.price);
      } else {
        toastMessage(data.error, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const checkout = async (checkoutData) => {
    const {name,address ,selectedPaymentMethod, orderDelivery} = checkoutData;
    if(!name){
      toast.error("Name Should be filled");
      return;
    }
    if(!address){
      toast.error("Address should be filled");
      return;
    }
    if(!selectedPaymentMethod){
      toast.error("Select A Payment Method");
      return;
    }
    //const data = await getCart();
    const productIds = [];
    if(cart.length >= 1){
      cart.forEach((item) => {
        productIds.push({productId: item.product._id});
      })
    }else{
      productIds.push({productId: cart._id});
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const purchaseDate = mm + '/' + dd + '/' + yyyy;
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
        toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const findInvoices = async () => {
   
    try {
      const response = await fetch(`${url}/user/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        
      });
      const data = await response.json();
      if (data.success) {
        toastMessage(data.message, "success");
        setTotalInvoices(data.data);
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

  const getSingleInvoice = async (invoiceId) => {
   
    try {
      const response = await fetch(`${url}/user/getInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ 
          invoiceId
         }),
      });
      const data = await response.json();
      if (data.success) {
        toastMessage(data.message, "success");
        singleInvoicesData.current = (data.data);
        return true;
      } else {
        toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
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
        totalQuantity,
        findInvoices,
        totalInvoices,
        getSingleInvoice,
        singleInvoicesData,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartState };

export default CartContext;
