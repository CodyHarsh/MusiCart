import React, { useEffect } from "react";
import "../../css/Home/FilterBar.css";
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { TiThList, TiThListOutline } from "react-icons/ti";
import { useContext, useState } from "react";
import ProductContext from "../../context/ProductContext";

const FilterBar = () => {
  const { isList, setIsList, types, brands, colors, sortFilterProducts,priceList, isSearch } =
    useContext(ProductContext);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "type_filter") setSelectedType(e.target.value);
    else if (e.target.name === "brand_filter") setSelectedBrand(e.target.value);
    else if (e.target.name === "color_filter") setSelectedColor(e.target.value);
    else if (e.target.name === "price_filter") setSelectedPrice(e.target.value);
    else if (e.target.name === "sort") {
      // Map frontend sort values to backend sort strings
      if (e.target.value === "Price: Lowest") setSelectedSort("priceLowest");
      else if (e.target.value === "Price: Highest") setSelectedSort("priceHighest");
      else if (e.target.value === "Name: (A-Z)") setSelectedSort("nameAZ");
      else if (e.target.value === "Name: (Z-A)") setSelectedSort("nameZA");
      else if (e.target.value === "Featured") setSelectedSort("");
    }
  
    let selectedTypeD = selectedType ? selectedType : "";
    let selectedBrandD = selectedBrand ? selectedBrand : "";
    let selectedColorD = selectedColor ? selectedColor : "";
    let selectedPriceD = selectedPrice ? selectedPrice : "";
    let selectedSortD = selectedSort ? selectedSort : "";
  
    if (e.target.name === "type_filter") selectedTypeD = e.target.value;
    else if (e.target.name === "brand_filter") selectedBrandD = e.target.value;
    else if (e.target.name === "color_filter") selectedColorD = e.target.value;
    else if (e.target.name === "price_filter") selectedPriceD = e.target.value;
    else if (e.target.name === "sort") selectedSortD = e.target.value;
  
    let minPrice = selectedPriceD.split(",")[0];
    let maxPrice = selectedPriceD.split(",")[1];
    minPrice = parseInt(minPrice);
    maxPrice = parseInt(maxPrice);
  

  
    sortFilterProducts(
      selectedSortD,
      selectedBrandD,
      selectedTypeD,
      selectedColorD,
      selectedPriceD,
      isSearch
    );
  };
  useEffect(() => {
      setSelectedType("");
      setSelectedBrand("");
      setSelectedColor("");
      setSelectedPrice("");
      setSelectedSort("");
  }, [isSearch]);

  return (
    <div className="filterbar">
      <div className="view">
        {isList ? (
          <>
            <IoGridOutline
              onClick={() => setIsList(false)}
              className="icon"
              size={19}
            />
            <TiThList
              onClick={() => setIsList(true)}
              className="icon"
              size={19}
            />
          </>
        ) : (
          <>
            <IoGrid
              onClick={() => setIsList(false)}
              className="icon"
              size={19}
            />
            <TiThListOutline
              onClick={() => setIsList(true)}
              className="icon"
              size={19}
            />
          </>
        )}
      </div>
      <div className="filter">
        <select
          onChange={handleChange}
          name="type_filter"
          id="type_filter"
          defaultValue=""
        >
          <option value="" disabled>
            Headphone Type
          </option>
          <option value="">Featured</option>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))} 
        </select>

        <select
          onChange={handleChange}
          name="brand_filter"
          id="brand_filter"
          defaultValue=""
        >
          <option value="" disabled>
            Brand
          </option>
          <option value="">Featured</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          onChange={handleChange}
          name="color_filter"
          id="color_filter"
          defaultValue=""
        >
          <option value="" disabled>
            Color
          </option>
          <option value="">Featured</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>

        <select
          onChange={handleChange}
          name="price_filter"
          id="price_filter"
          defaultValue=""
        >
          <option value="" disabled>
            Price
          </option>
          <option value="">Featured</option>
          {priceList.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))} 
          
        </select>
      </div>
      <div className="sort">
        <select name="sort" id="sort" onChange={handleChange}>

          <option value="">Featured</option>
          <option value="priceLowest">Price: Lowest</option>
          <option value="priceHighest">Price: Highest</option>
          <option value="nameAZ">Name: (A-Z)</option>
          <option value="nameZA">Name: (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
