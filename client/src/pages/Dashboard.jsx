import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getDashboard,
  addPartner,
  createOrder,
  assignOrder,
  getAllOrders,
  transferFunds
} from '../services/mcpService'

const Dashboard = () => {
  const { mcpId } = useParams()
  const [dashboard, setDashboard] = useState(null)
  const [partnerForm, setPartnerForm] = useState({ name: '', email: '', password: '' })
  const [orderForm, setOrderForm] = useState({ customerName: '', location: '' })
  const [orders, setOrders] = useState([])
  const [transfer, setTransfer] = useState({ to: '', amount: '' })



  const fetchDashboard = React.useCallback(async () => {
    const res = await getDashboard(mcpId)
    setDashboard(res.data)
  }, [mcpId])



  const fetchOrders = React.useCallback(async () => {
    const res = await getAllOrders(mcpId)
    setOrders(res.data)
  }, [mcpId])

  useEffect(() => {
    fetchDashboard()
    fetchOrders()
  }, [mcpId, fetchDashboard, fetchOrders])

  const handlePartnerChange = (e) => {
    setPartnerForm({ ...partnerForm, [e.target.name]: e.target.value })
  }

  const handleAddPartner = async (e) => {
    e.preventDefault()
    await addPartner(mcpId, partnerForm)
    alert('Partner added!')
    setPartnerForm({ name: '', email: '', password: '' })
    fetchDashboard()
  }

  const handleOrderChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value })
  }

  const handleCreateOrder = async (e) => {
    e.preventDefault()
    await createOrder(mcpId, orderForm)
    alert('Order created!')
    setOrderForm({ customerName: '', location: '' })
    fetchOrders()
  }

  const handleAssign = async (orderId, partnerId) => {
    await assignOrder(orderId, { partnerId })
    alert('Order assigned!')
    fetchOrders()
  }

  
  const handleTransfer = async () => {
    try {
      await transferFunds(mcpId, {
        partnerId: transfer.to,
        amount: Number(transfer.amount)
      })
      alert('Funds transferred!')
      setTransfer({ to: '', amount: '' })
      fetchDashboard()
    } catch (err) {
      console.error(err)
      alert('Failed to transfer funds')
    }
  }
  
  

  if (!dashboard) return <p>Loading...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {dashboard.name}</h2>
      <p><strong>Wallet:</strong> ₹{dashboard.walletBalance}</p>

      <hr />

      <h3>➕ Add Pickup Partner</h3>
      <form onSubmit={handleAddPartner}>
        <input type='text' name='name' placeholder='Name' value={partnerForm.name} onChange={handlePartnerChange} required />
        <input type='email' name='email' placeholder='Email' value={partnerForm.email} onChange={handlePartnerChange} required />
        <input type='password' name='password' placeholder='Password' value={partnerForm.password} onChange={handlePartnerChange} required />
        <button type='submit'>Add Partner</button>
      </form>

      <h4>Existing Partners</h4>
      <ul>
        {dashboard.pickupPartners.map(p => (
          <li key={p._id}>{p.name} – {p.email}</li>
        ))}
      </ul>

      <h3>💸 Transfer Funds to Partner</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleTransfer()
      }}>
        <select
          value={transfer.to}
          onChange={(e) => setTransfer({ ...transfer, to: e.target.value })}
          required
        >
          <option value="">Select Partner</option>
          {dashboard.pickupPartners.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={transfer.amount}
          onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })}
          required
        />
        <button type="submit">Transfer</button>
      </form>


      <hr />

      <h3>📋 Create Order</h3>
      <form onSubmit={handleCreateOrder}>
        <input type='text' name='customerName' placeholder='Customer Name' value={orderForm.customerName} onChange={handleOrderChange} required />
        <input type='text' name='location' placeholder='Location' value={orderForm.location} onChange={handleOrderChange} required />
        <button type='submit'>Create Order</button>
      </form>

      <h4>🗂 All Orders</h4>
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Location:</strong> {order.location}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Assigned To:</strong> {order.assignedTo ? order.assignedTo.name || order.assignedTo : 'Not Assigned'}</p>

          {!order.assignedTo && (
            <div>
              <label>Assign to:</label>
              <select onChange={(e) => handleAssign(order._id, e.target.value)}>
                <option value="">Select partner</option>
                {dashboard.pickupPartners.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Dashboard
