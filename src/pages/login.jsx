import React from 'react'
import EfectoLluvia from '../components/efectoLLuvia'
import { useNavigate } from 'react-router-dom'
import LoginComponente from '../components/LoginComponente'

const Login = () => {
  return (
    <div>
      <EfectoLluvia />
      <LoginComponente />
    </div>
  )
}

export default Login
