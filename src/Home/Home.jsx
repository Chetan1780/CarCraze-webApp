import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Category from '@/components/Category'
import MostSearchedCar from '@/components/MostSearchedCar'
import Section from '@/components/Section'
import Footer from '@/components/Footer'
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
