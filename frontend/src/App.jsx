import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Homepage'
import PropertyDetails from './pages/PropertyDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import SellerDashboard from './pages/SellerDashboard'
import CreatePropertyForm from './components/CreatePropertyForm'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/add-property" element={<CreatePropertyForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App