import React from 'react'
import Navbar from '@/Components/Navbar'
import Hero from '@/Components/Hero'
import Category from '@/Components/Category'
import MostSearchedCar from '@/Components/MostSearchedCar'
import Section from '@/Components/Section'
import Footer from '@/Components/Footer'
const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
        <Hero/>
        <Category/>
        <MostSearchedCar/>
        <Section/>
        <Footer/>
    </div>
  )
}

export default Home
