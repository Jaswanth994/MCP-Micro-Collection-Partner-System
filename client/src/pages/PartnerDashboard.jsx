import React, { useEffect, useState } from 'react'
import { getPartnerDashboard, updateOrderStatus } from '../services/partnerService'
import { useNavigate } from 'react-router-dom'

const PartnerDashboard = () => {
  const [data, setData] = useState(null)
  const partnerId = localStorage.getItem('partnerId')
  const navigate = useNavigate()

  useEffect(() => {
    if (!partnerId) {
      navigate('/partner-login')
      return
    }

    const fetchData = async () => {
      const res = await getPartnerDashboard(partnerId)
      setData(res.data)
    }

    fetchData()
  }, [partnerId, navigate])

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus)
    const updated = await getPartnerDashboard(partnerId)
    setData(updated.data)
  }

  const handleLogout = () => {
    localStorage.removeItem('partnerId')
    navigate('/partner-login')
  }

  if (!data) return <p>Loading dashboard...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {data.name}</h2>
      <p><strong>Wallet:</strong> ₹{data.walletBalance}</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>Assigned Orders</h3>
      {data.orders.map(order => (
        <div key={order._id} style={{ border: '1px solid gray', margin: '10px 0', padding: '1rem' }}>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Location:</strong> {order.location}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
  )
}

export default PartnerDashboard
