import React from 'react'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/WelcomeSection'
import EfectoLluvia from '../components/efectoLLuvia'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <EfectoLluvia />
      <WelcomeSection  />
    </div>
  )
}

export default Home
