const express = require('express');
const router = express.Router();
const {
  registerMCP,
  loginMCP,
  getDashboard,
  addPickupPartner,
  transferFunds,
  deletePickupPartner,
  addFundsToWallet,
  getTransactionHistory
} = require('../controllers/mcpController');

router.post('/register', registerMCP);
router.post('/login', loginMCP);
router.get('/dashboard/:mcpId', getDashboard);
router.post('/add-partner/:mcpId', addPickupPartner);
router.post('/transfer-funds/:mcpId', transferFunds);
router.delete('/delete-partner/:mcpId/:partnerId', deletePickupPartner);
router.post('/add-funds/:mcpId', addFundsToWallet);
router.get('/transactions/:mcpEmail', getTransactionHistory)


module.exports = router;
