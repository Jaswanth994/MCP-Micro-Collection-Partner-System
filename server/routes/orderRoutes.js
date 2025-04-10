const express = require('express');
const router = express.Router();
const {
  createOrder,
  assignOrder,
  getAllOrdersByMCP
} = require('../controllers/orderController');

router.post('/create/:mcpId', createOrder);
router.post('/assign/:orderId', assignOrder);
router.get('/mcp/:mcpId', getAllOrdersByMCP);

module.exports = router;
