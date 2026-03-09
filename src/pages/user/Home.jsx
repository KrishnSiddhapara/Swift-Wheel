import React from 'react'
import Hero from '../../components/Hero'
import PopularVehicles from '../../components/PopularVehicles'

import Features from '../../components/Features'
import Footer from '../../components/Footer'
import { useData } from '../../context/DataProvider'

const Home = () => {
  // const {count} = useData();
  return <>
  {/* Hello : {count} */}
    <Hero />
    <PopularVehicles />
    
    <Features />
  </>
}

export default Home