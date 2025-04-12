import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getDashboard,
  addPartner,
  createOrder,
  assignOrder,
  getAllOrders,
  transferFunds,
  deletePartner,
  addFunds,
  getTransactions,
} from '../services/mcpService'

const Dashboard = () => {
  const { mcpId } = useParams()
  const [dashboard, setDashboard] = useState(null)
  const [partnerForm, setPartnerForm] = useState({ name: '', email: '', password: '' })
  const [orderForm, setOrderForm] = useState({ customerName: '', location: '' })
  const [orders, setOrders] = useState([])
  const [transfer, setTransfer] = useState({ to: '', amount: '' })
  const [earnings, setEarnings] = useState(0)
  const [fundsAmount, setFundsAmount] = useState('')
  const [transactions, setTransactions] = useState([])


  const fetchDashboard = React.useCallback(async () => {
    const res = await getDashboard(mcpId)
    setDashboard(res.data)
    if (res.data.email) {
      const txnRes = await getTransactions(res.data.email)
      console.log("fetching transactions")
      setTransactions(txnRes.data)
    } else {
      console.warn('No email found for MCP — skipping transaction fetch')
    }
  }, [mcpId])
  

  const fetchOrders = React.useCallback(async () => {
    const res = await getAllOrders(mcpId)
    setOrders(res.data)

    // Optional: calculate earnings from completed orders
    const completed = res.data.filter(o => o.status === 'Completed')
    const earnings = completed.length * 100 // fixed ₹100 per order
    setEarnings(earnings)
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
    toast.success('Partner added!')
    setPartnerForm({ name: '', email: '', password: '', role: 'Collector', commission: 100 })
    fetchDashboard()
  }

  const handleOrderChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value })
  }

  const handleCreateOrder = async (e) => {
    e.preventDefault()
    await createOrder(mcpId, orderForm)
    toast.success('Order created!')
    setOrderForm({ customerName: '', location: '' })
    fetchOrders()
  }

  const handleAssign = async (orderId, partnerId) => {
    await assignOrder(orderId, { partnerId })
    toast.success('Order assigned!')
    fetchOrders()
  }

  
  const handleTransfer = async () => {
    try {
      await transferFunds(mcpId, {
        partnerId: transfer.to,
        amount: Number(transfer.amount)
      })
      toast.success('Funds transferred!')
      setTransfer({ to: '', amount: '' })
      fetchDashboard()
    } catch {
      toast.error('Failed to transfer funds')
    }
  }
  
  const handleDeletePartner = async (partnerId) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    await deletePartner(mcpId, partnerId);
    toast.success('Partner deleted');
    fetchDashboard();
  }


  const handleAddFunds = async () => {
    try {
      await addFunds(mcpId, { amount: fundsAmount });
      toast.success('Funds added successfully');
      setFundsAmount('');
      fetchDashboard(); // refresh wallet balance
    } catch {
      toast.error('Error adding funds');
    }
  }
  

  if (!dashboard) return <p>Loading...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {dashboard.name}</h2>
      <p><strong>Wallet:</strong> ₹{dashboard.walletBalance}</p>

      <h3>💰 Add Funds to MCP Wallet</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddFunds();
      }}>
        <input
          type="number"
          placeholder="Enter amount"
          value={fundsAmount}
          onChange={(e) => setFundsAmount(e.target.value)}
          required
        />
        <button type="submit">Add Funds</button>
      </form>

      <hr />

      <h2>📊 Dashboard Overview</h2>
      <ul>
        <li><strong>Wallet Balance:</strong> ₹{dashboard.walletBalance}</li>
        <li><strong>Total Partners:</strong> {dashboard.pickupPartners.length}</li>
        <li><strong>Total Orders:</strong> {orders.length}</li>
        <li><strong>Completed Orders:</strong> {orders.filter(o => o.status === 'Completed').length}</li>
        <li><strong>Pending Orders:</strong> {orders.filter(o => o.status !== 'Completed').length}</li>
        <li><strong>Total Earnings:</strong> ₹{earnings}</li>
      </ul>


      <h3>➕ Add Pickup Partner</h3>
      <form onSubmit={handleAddPartner}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={partnerForm.name}
          onChange={handlePartnerChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={partnerForm.email}
          onChange={handlePartnerChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={partnerForm.password}
          onChange={handlePartnerChange}
          required
        />
        
        <select name="role" value={partnerForm.role} onChange={handlePartnerChange}>
          <option value="Collector">Collector</option>
          <option value="Supervisor">Supervisor</option>
        </select>

        <input
          type="number"
          name="commission"
          placeholder="Commission per order (₹)"
          value={partnerForm.commission}
          onChange={handlePartnerChange}
          required
        />

        <button type='submit'>Add Partner</button>
      </form>


      <h4>Existing Partners</h4>
      <ul>
        {dashboard.pickupPartners.map(p => (
          <li key={p._id}>
          {p.name} – {p.email}
          <button onClick={() => handleDeletePartner(p._id)}>🗑️ Delete</button>
       </li>
        
        ))}
      </ul>

      <h3>📈 Partner Performance</h3>
      <ul>
        {dashboard.pickupPartners.map(partner => {
          const partnerOrders = orders.filter(o => o.assignedTo === partner._id)
          const completedOrders = partnerOrders.filter(o => o.status === 'Completed').length
          const partnerEarnings = completedOrders * 100

          return (
            <li key={partner._id}>
              <strong>{partner.name}</strong> – {partner.email} – {partner.status} <br />
              Orders Assigned: {partnerOrders.length}, Completed: {completedOrders}, Earnings: ₹{partnerEarnings}
              <button onClick={() => handleDeletePartner(partner._id)}>🗑️ Delete</button>
            </li>
          )
        })}
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

      <h3>🧾 Transaction History</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn._id}>
              <td>{new Date(txn.createdAt).toLocaleString()}</td>
              <td>{txn.type}</td>
              <td>{txn.from}</td>
              <td>{txn.to}</td>
              <td>{txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>



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
      <h3>📈 Reports & Analytics</h3>
    <ul>
      <li>🧾 Total Earnings from Completed Orders: ₹{earnings}</li>
      <li>📦 Orders Completed Today: {
        orders.filter(o =>
          o.status === 'Completed' &&
          new Date(o.updatedAt).toDateString() === new Date().toDateString()
        ).length
      }</li>
      <li>📊 Efficiency Rate (Completed / Total): {
        orders.length > 0
          ? `${Math.round(orders.filter(o => o.status === 'Completed').length / orders.length * 100)}%`
          : '0%'
      }</li>
    </ul>


    </div>
  )
}

export default Dashboard
