import React from 'react'
import { SignInButton } from '@clerk/clerk-react'
import Header from "./components/Header"
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import Section from './components/Section'
import Footer from './components/Footer'
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
