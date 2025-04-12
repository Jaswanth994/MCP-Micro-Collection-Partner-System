import React, { useEffect, useState } from 'react'
import { getPartnerDashboard, updateOrderStatus, acceptOrder } from '../services/partnerService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
    try{
      await updateOrderStatus(orderId, newStatus)
    const updated = await getPartnerDashboard(partnerId)
    setData(updated.data)
    toast.success("Order Updated Successfully !!")
    }
    catch{
      toast.error("Order Update Failed")
    }
    
  }

  const handleLogout = () => {
    localStorage.removeItem('partnerId')
    navigate('/partner-login')
    toast.success("Logged Out Successfully")
  }

  

  if (!data) return <p>Loading dashboard...</p>
  console.log(data)
  const availableOrders = data.orders.filter(o => o.status === 'Available' && !o.assignedTo)
  const myOrders = data.orders.filter(o => o.assignedTo === partnerId)

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {data.name}</h2>
      <p><strong>Wallet:</strong> ₹{data.walletBalance}</p>
      <button onClick={handleLogout}>Logout</button>

      <h3 className="text-xl font-semibold mt-8 mb-2">🆕 Available Orders</h3>
      {availableOrders.length === 0 ? (
        <p>No unassigned orders right now.</p>
      ) : (
        availableOrders.map(order => (
          <div key={order._id} className="border p-4 mb-4 rounded-md">
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Location:</strong> {order.location}</p>
            <div className="mt-2 flex gap-3">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={async () => {
                  await acceptOrder(order._id, partnerId)
                  toast.success('Order accepted!')
                  const updated = await getPartnerDashboard(partnerId)
                  setData(updated.data)
                }}
              >
                Accept
              </button>
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                onClick={() => toast.info('Order skipped')}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}

      <h3>Assigned Orders</h3>
      {myOrders.map(order => (
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
