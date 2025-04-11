const PickupPartner = require('../models/PickupPartner');
const Order = require('../models/Order');

exports.registerPartner = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const partner = await PickupPartner.create({ name, email, password });
    res.status(201).json(partner);
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

//  LOGIN
exports.loginPartner = async (req, res) => {
  try {
    const { email, password } = req.body
    const partner = await PickupPartner.findOne({ email, password })

    if (!partner) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    res.json({ _id: partner._id, name: partner.name })
  } catch (err) {
    res.status(500).json({ error: 'Login failed' })
  }
}

//  DASHBOARD
exports.getPartnerDashboard = async (req, res) => {
  try {
    const partner = await PickupPartner.findById(req.params.partnerId)

    const orders = await Order.find({ assignedTo: req.params.partnerId })

    res.json({
      name: partner.name,
      email: partner.email,
      walletBalance: partner.walletBalance,
      orders
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dashboard' })
  }
};

exports.loginPartner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const partner = await PickupPartner.findOne({ email, password });
    if (!partner) return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getPartnerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ assignedTo: req.params.partnerId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

exports.viewWallet = async (req, res) => {
  try {
    const partner = await PickupPartner.findById(req.params.partnerId);
    res.json({ walletBalance: partner.walletBalance });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch wallet balance' });
  }
};
