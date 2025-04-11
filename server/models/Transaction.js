const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  type: String, // e.g., 'add_funds', 'transfer_funds'
  amount: Number,
  from: String, // e.g., 'MCP', partner email
  to: String,   // e.g., 'Partner Name', 'MCP'
  
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Transaction', transactionSchema)
