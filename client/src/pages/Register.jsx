import React, { useState } from 'react'
import { registerMCP } from '../services/mcpService'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await registerMCP(form)
      alert('Registered successfully!')
      navigate(`/dashboard/${res.data._id}`)
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <div>
      <h2>Register MCP</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Name' onChange={handleChange} required />
        <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} required />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
