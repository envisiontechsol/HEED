const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');

router.get('/', investorController.getAllInvestors);
router.post('/', investorController.createInvestor);
router.put('/:investorId', investorController.updateInvestor); 
router.delete('/:investorId', investorController.deleteInvestor);

module.exports = router;
