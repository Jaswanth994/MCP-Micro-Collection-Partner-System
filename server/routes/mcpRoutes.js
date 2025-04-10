const express = require('express');
const router = express.Router();
const {
  registerMCP,
  loginMCP,
  getDashboard,
  addPickupPartner,
  transferFunds
} = require('../controllers/mcpController');

router.post('/register', registerMCP);
router.post('/login', loginMCP);
router.get('/dashboard/:mcpId', getDashboard);
router.post('/add-partner/:mcpId', addPickupPartner);
router.post('/transfer-funds/:mcpId', transferFunds);

module.exports = router;
