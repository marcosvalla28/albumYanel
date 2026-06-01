import React from 'react'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/WelcomeSection'
import EfectoLluvia from '../components/efectoLLuvia'

const Home = () => {
  return (
    <div>
      <EfectoLluvia />
      <Navbar />
      <WelcomeSection className="mt-96" />
    </div>
  )
}

export default Home
