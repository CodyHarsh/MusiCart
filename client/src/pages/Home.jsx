import React from 'react'
import Banner from '../components/Home/Banner'
import FilterBar from '../components/Home/FilterBar'
import Products from '../components/Home/Products'
import Search from '../components/Home/Search'

const Home = () => {
  return (
    <div>
        <Banner />
        <Search />
        <FilterBar />
        <Products />
    </div>
  )
}

export default Home