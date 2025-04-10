const mongoose = require('mongoose');

const pickupPartnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: { type: String, default: 'inactive' }, // active/inactive
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  walletBalance: { type: Number, default: 0 }
});

module.exports = mongoose.model('PickupPartner', pickupPartnerSchema);
