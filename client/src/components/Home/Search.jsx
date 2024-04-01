import React, { useState, useContext } from "react";
import "../../css/Home/Search.css";
import { GoSearch } from "react-icons/go";
import ProductContext from "../../context/ProductContext";
import {useNavigate} from 'react-router-dom'

const Search = () => {
  const [search, setSearch] = useState("");
  const { getProductsByNames, setIsSearch } = useContext(ProductContext);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const navigate = useNavigate()


  const handleChange = (e) => {
    setSearch(e.target.value);
    setIsSearch(e.target.value);
    // handling debounce
    timeoutIds.forEach((id) => clearTimeout(id));
    const newTimeoutId = setTimeout(() => {
      navigate('/');
      getProductsByNames(e.target.value);
    }, 2000);

    setTimeoutIds((prevTimeoutIds) => [...prevTimeoutIds, newTimeoutId]);
  };

  return (
    <div className="search">
      <GoSearch className="searchicon" />
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search Product"
        className="searchinput"
        value={search}
      />
    </div>
  );
};

export default Search;
