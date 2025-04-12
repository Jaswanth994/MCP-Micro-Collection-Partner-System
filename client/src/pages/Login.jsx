import React, { useState } from 'react'
import { loginMCP } from '../services/mcpService'
import { useNavigate , Link} from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginMCP(form)
      toast.success('Login successful')
      navigate(`/dashboard/${res.data._id}`)
    } catch (err) {
      console.error(err)
      toast.error('Invalid credentials')
    }
  }

  return (
    <div>
      <h2>Login MCP</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} required />
        <button type='submit'>Login</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      
    </div>
  )
}

export default Login
