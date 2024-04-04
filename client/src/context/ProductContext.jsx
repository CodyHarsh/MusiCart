import { createContext } from "react";

const ProductContext = createContext();
import React, { useState } from "react";
import { toast } from "react-toastify";

let url = import.meta.env.VITE_URL;

const ProductState = (props) => {
  const [isList, setIsList] = useState(false);
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [isSearch, setIsSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priceList, setPriceList] = useState([]);

  const toastMessage = (message, type) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  const getALLCategories = async () => {
    try{
      const fetchTheCategories = await fetch(`${url}/product/getCategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
      });
  
      const categoriesResponse = await fetchTheCategories.json();
      
      if(categoriesResponse.success){
        setTypes(categoriesResponse.data.headphoneTypes);
        setBrands(categoriesResponse.data.brandNames);
        setColors(categoriesResponse.data.colors); 
        setPriceList(categoriesResponse.data.priceRange)
        return true;
      } else {
        toastMessage(categoriesResponse.message, "warning");
        return false;
      }
    }
    catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
    
  }

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const fetchTheProducts = await fetch(`${url}/product/getproduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const productResponse = await fetchTheProducts.json();

      if (productResponse.success) {
        setProducts(productResponse.data);
        getALLCategories()
      } else {
        toastMessage(productResponse.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await fetch(`${url}/product/getproductbyid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ _id: id }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("IN product Context GetProdectbyId(): ", data.data);
        return data.data;
      } else {
        toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getProductsByNames = async (name) => {
    console.log("Here")
    setIsLoading(true);
    try {
      if(name.length <= 0){
        return getAllProducts();
      }
      const urlParams = new URLSearchParams({ name}).toString();
      const response = await fetch(`${url}/product/filter?${urlParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("GetPRoductByNames(): ", data);
      if (data.success) {
        setProducts(data.data);
        getALLCategories();
      } else {
        toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sortFilterProducts = async (
    sortType,
    company,
    type,
    color,
    priceRange,
    ) => {
      console.log(type);
    setIsLoading(true);
    try {
      const urlParams = new URLSearchParams({ 
        sortBy: sortType,
        brandName: company,
        headphoneType: type,
        color,
        priceRange: priceRange,
        name: isSearch,
      }).toString();
      const response = await fetch(`${url}/product/filter?${urlParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setProducts(data.data);
        // setTypes(data.types);
        // setBrands(data.brands);
        // setColors(data.colors);
      } else {
        toastMessage(data.message, "warning");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        isList,
        setIsList,
        products,
        types,
        brands,
        colors,
        priceList,
        getAllProducts,
        getProductById,
        getProductsByNames,
        sortFilterProducts,
        isSearch,
        setIsSearch,
        isLoading,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductState };

export default ProductContext;
