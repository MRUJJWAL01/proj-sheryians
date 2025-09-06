import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import RegisterForm from '../components/RegisterForm'
import { AuthPage } from '../pages/AuthPage'

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<AuthPage />}/>
    </Routes>
  )
}

export default Routing