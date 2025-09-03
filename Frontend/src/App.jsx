import React from 'react'
import AppRouter from './router/AppRouter'
import Navbar from './component/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRouter />
    </div>
  )
}

export default App