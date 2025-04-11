const mongoose = require('mongoose');

const pickupPartnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: { type: String, default: 'inactive' }, // active/inactive
  role: { type: String, default: 'Collector' },  // NEW
  commission: { type: Number, default: 100 },    // NEW
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  walletBalance: { type: Number, default: 0 }
});

module.exports = mongoose.model('PickupPartner', pickupPartnerSchema);
