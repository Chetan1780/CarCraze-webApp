import React from 'react'
import { SignInButton } from '@clerk/clerk-react'
import Header from "./Components/Header"
import Hero from './Components/Hero'
import Category from './Components/Category'
import MostSearchedCar from './Components/MostSearchedCar'
import Section from './Components/Section'
import Footer from './Components/Footer'
const Home = () => {
  return (
    <div>
        {/* Header */}
        <Header />
        {/* Hero  */}
        <Hero/>
        {/* Category  */}
        <Category/>
        <MostSearchedCar/>
        <Section/>
        <Footer/>
    </div>
  )
}

export default Home
