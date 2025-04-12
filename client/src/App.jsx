import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PartnerLogin from './pages/PartnerLogin'
import PartnerDashboard from './pages/PartnerDashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Routes> 
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard/:mcpId' element={<Dashboard />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        {/* <Route path="/orders" element={<Orders />} /> */}
        {/* <Route path="/analytics" element={<Analytics />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
    
  )
}

export default App
