import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginPartner } from '../services/partnerService'

const PartnerLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginPartner(form)
      localStorage.setItem('partnerId', res.data._id)
      navigate('/partner-dashboard')
    } catch {
      alert('Login failed')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pickup Partner Login</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} required />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default PartnerLogin
