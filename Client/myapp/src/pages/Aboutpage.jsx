import React, { useEffect } from 'react'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import AboutUS from '../components/AboutUS'


const Aboutpage = () => {
  return (
    <>
    <Navbar />
    <Background/>
    <AboutUS/>
    <About/>
    </>
  )
}

export default Aboutpage