const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const verifyAccessToken = require('../middleware/authMiddleware'); 


// All are Protected routes
router.get('/', verifyAccessToken, investorController.getAllInvestors);
router.post('/', verifyAccessToken, investorController.createInvestor);
router.put('/:investorId', verifyAccessToken, investorController.updateInvestor);
router.delete('/:investorId', verifyAccessToken, investorController.deleteInvestor);

module.exports = router;
