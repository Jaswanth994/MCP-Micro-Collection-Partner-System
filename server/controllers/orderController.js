const Order = require('../models/Order');
const PickupPartner = require('../models/PickupPartner');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, location } = req.body;
    const order = await Order.create({
      customerName,
      location,
      createdBy: req.params.mcpId
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.assignOrder = async (req, res) => {
  try {
    const { partnerId } = req.body;
    const order = await Order.findById(req.params.orderId);
    const partner = await PickupPartner.findById(partnerId);

    order.assignedTo = partnerId;
    await order.save();

    partner.assignedOrders.push(order._id);
    await partner.save();

    res.json({ message: 'Order assigned successfully', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign order' });
  }
};

exports.getAllOrdersByMCP = async (req, res) => {
  try {
    const orders = await Order.find({ createdBy: req.params.mcpId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch orders' });
  }
};
