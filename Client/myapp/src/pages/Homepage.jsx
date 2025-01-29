import React from 'react'
import Body from '../components/Body'
import Course from '../components/Course'
import About from '../components/About'
import Navbar from '../components/Navbar'
import FeedBack from '../components/Feedback'

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Body />
      <Course />
      <FeedBack />
      <About />
    </>
  )
}

export default Homepage