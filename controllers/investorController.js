const investorModel = require('../models/investorModel');

const getAllInvestors = async (req, res) => {
  try {
    const investors = await investorModel.getAllInvestors();
    res.json(investors);
  } catch (err) {
    console.error('getAllInvestors Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createInvestor = async (req, res) => {
  try {
    const { userId, companyName, whatULookFor, investorAmount } = req.body;
    const investor = await investorModel.createInvestor(userId, companyName, whatULookFor, investorAmount);
    res.json(investor);
  } catch (err) {
    console.error('createInvestor Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateInvestor = async (req, res) => {
  try {
    const investorId = req.params.investorId;
    const { companyName, whatULookFor, investorAmount } = req.body;

    const updatedInvestor = await investorModel.updateInvestor(
      investorId,
      companyName,
      whatULookFor,
      investorAmount
    );

    res.json(updatedInvestor);
  } catch (err) {
    console.error('updateInvestor Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteInvestor = async (req, res) => {
  try {
    const investorId = req.params.investorId;
    await investorModel.deleteInvestor(investorId);
    res.json({ message: 'Investor deleted' });
  } catch (err) {
    console.error('deleteInvestor Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllInvestors,
  createInvestor,
  updateInvestor,
  deleteInvestor
};
