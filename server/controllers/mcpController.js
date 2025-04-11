const MCP = require('../models/MCP');
const PickupPartner = require('../models/PickupPartner');
const Transaction = require('../models/Transaction')

exports.registerMCP = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const mcp = await MCP.create({ name, email, password });
    res.status(201).json(mcp);
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.loginMCP = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mcp = await MCP.findOne({ email, password });
    if (!mcp) return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json(mcp);
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const mcp = await MCP.findById(req.params.mcpId)
      .populate('pickupPartners')
      .lean();

    const allOrders = await require('../models/Order').find({ createdBy: req.params.mcpId });

    res.json({
      name: mcp.name,
      walletBalance: mcp.walletBalance,
      pickupPartners: mcp.pickupPartners,
      email: mcp.email,
      totalOrders: allOrders.length,
      completedOrders: allOrders.filter(o => o.status === 'Completed').length,
      pendingOrders: allOrders.filter(o => o.status !== 'Completed').length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
};

exports.addPickupPartner = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const partner = await PickupPartner.create({ name, email, password });
    await MCP.findByIdAndUpdate(req.params.mcpId, {
      $push: { pickupPartners: partner._id }
    });
    res.status(201).json(partner);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add partner' });
  }
};
exports.transferFunds = async (req, res) => {
  try {
    const { partnerId, amount } = req.body;

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const mcp = await MCP.findById(req.params.mcpId);
    if (!mcp) return res.status(404).json({ error: 'MCP not found' });

    if (mcp.walletBalance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    const partner = await PickupPartner.findById(partnerId);
    if (!partner) return res.status(404).json({ error: 'Partner not found' });

    // Perform transfer
    mcp.walletBalance -= amount;
    partner.walletBalance += amount;

    await mcp.save();
    await partner.save();

    const Transaction = require('../models/Transaction');
    await Transaction.create({
      type: 'transfer_funds',
      amount,
      from: mcp.email,
      to: partner.email
    });

    res.json({ message: 'Funds transferred successfully' });

  } catch (err) {
    console.error('Transfer Error:', err);
    res.status(500).json({ error: 'Failed to transfer funds' });
  }
};

exports.deletePickupPartner = async (req, res) => {
  try {
    const { mcpId, partnerId } = req.params;

    // Remove reference from MCP
    await MCP.findByIdAndUpdate(mcpId, {
      $pull: { pickupPartners: partnerId }
    });

    // Delete partner from DB
    await PickupPartner.findByIdAndDelete(partnerId);

    res.json({ message: 'Partner deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete partner' });
  }
};

exports.addFundsToWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    const mcp = await MCP.findById(req.params.mcpId);
    if (!mcp) return res.status(404).json({ error: 'MCP not found' });

    mcp.walletBalance += Number(amount);
    await mcp.save();

    // ✅ optional: log transaction
    const Transaction = require('../models/Transaction');
    await Transaction.create({
      type: 'add_funds',
      amount,
      from: 'External (UPI)',
      to: mcp.email
    });

    res.json({ message: 'Funds added', walletBalance: mcp.walletBalance });
  } catch (err) {
    console.error('Add Funds Error:', err); // <== THIS will help you catch the exact issue
    res.status(500).json({ error: 'Failed to add funds' });
  }
};
 

exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { from: req.params.mcpEmail },
        { to: req.params.mcpEmail }
      ]
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error('Transaction fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
