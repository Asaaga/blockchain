const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services');
const upload = require('../middleware/upload');

router.get('/', servicesController.getIndex);
router.get('/dashboard', servicesController.getDashboard);
router.get('/admin-dashboard', servicesController.getAdminDashboard);

router.get('/transactions', servicesController.getTransactions);

// add transaction manually
router.post('/add-trans', servicesController.postAddTransaction);

//paystack webhook
router.post('/payment-verification', servicesController.postPayStackWebHook);
//get verify payment page
router.get(
  '/payment-verification/:reference',
  servicesController.getVerifyPayment
);
router.post('/delete', servicesController.postAdminDeleteMember);
module.exports = router;
