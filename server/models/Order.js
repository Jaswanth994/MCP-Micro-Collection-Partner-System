const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  location: String,
  status: { type: String, default: 'Pending' }, // Pending, In Progress, Completed
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'PickupPartner' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'MCP' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
