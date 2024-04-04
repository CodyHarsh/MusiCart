import React, { useContext, useEffect } from 'react'
import Banner from '../components/Home/Banner'
import FilterBar from '../components/Home/FilterBar'
import Products from '../components/Home/Products'
import Search from '../components/Home/Search'
import GlobalContext from '../context/GlobalContext'
import Feedback from './Feedback'

const Home = () => {
  const {isAuthenticated, getUserDetails} = useContext(GlobalContext);
  
  return (
    <div>
        <Banner />
        <Search />
        <FilterBar />
        <Products />
        {isAuthenticated ? (<Feedback />) : (null)}
    </div>
  )
}

export default Home