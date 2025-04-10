const mongoose = require('mongoose');

const mcpSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  walletBalance: { type: Number, default: 0 },
  pickupPartners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PickupPartner' }]
});

module.exports = mongoose.model('MCP', mcpSchema);
