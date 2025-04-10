const MCP = require('../models/MCP');
const PickupPartner = require('../models/PickupPartner');

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
    const mcp = await MCP.findById(req.params.mcpId);
    if (mcp.walletBalance < amount) return res.status(400).json({ error: 'Insufficient funds' });

    const partner = await PickupPartner.findById(partnerId);
    partner.walletBalance += amount;
    mcp.walletBalance -= amount;

    await partner.save();
    await mcp.save();

    res.json({ message: 'Funds transferred successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to transfer funds' });
  }
};
