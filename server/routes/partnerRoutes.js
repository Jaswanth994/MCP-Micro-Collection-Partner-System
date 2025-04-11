const express = require('express');
const router = express.Router();
const {
  registerPartner,
  loginPartner,
  getPartnerOrders,
  updateOrderStatus,
  viewWallet,
  getPartnerDashboard,
} = require('../controllers/partnerController');

router.post('/register', registerPartner);
router.post('/login', loginPartner);
router.get('/:partnerId/orders', getPartnerOrders);
router.post('/:partnerId/order/:orderId/status', updateOrderStatus);
router.get('/:partnerId/wallet', viewWallet);
router.get('/dashboard/:partnerId', getPartnerDashboard)
router.post('/update-status/:orderId', updateOrderStatus)

module.exports = router;
