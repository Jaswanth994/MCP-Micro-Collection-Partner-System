import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PartnerLogin from './pages/PartnerLogin'
import PartnerDashboard from './pages/PartnerDashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard/:mcpId' element={<Dashboard />} />
      <Route path="/partner-login" element={<PartnerLogin />} />
      <Route path="/partner-dashboard" element={<PartnerDashboard />} />

    </Routes>
  )
}

export default App
