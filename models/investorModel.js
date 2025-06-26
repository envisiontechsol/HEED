const pool = require('../config/db');

const getAllInvestors = async () => {
  const res = await pool.query('SELECT * FROM investors');
  return res.rows;
};

const createInvestor = async (userId, companyName, whatULookFor, investorAmount) => {
  const res = await pool.query(
    'INSERT INTO investors (user_id, company_name, what_u_look_for, investor_amount) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, companyName, whatULookFor, investorAmount]
  );
  return res.rows[0];
};

const updateInvestor = async (investorId, companyName, whatULookFor, investorAmount) => {
  const res = await pool.query(
    'UPDATE investors SET company_name = $1, what_u_look_for = $2, investor_amount = $3 WHERE investor_id = $4 RETURNING *',
    [companyName, whatULookFor, investorAmount, investorId]
  );
  return res.rows[0];
};

const deleteInvestor = async (investorId) => {
  await pool.query('DELETE FROM investors WHERE investor_id = $1', [investorId]);
};

module.exports = {
  getAllInvestors,
  createInvestor,
  updateInvestor,
  deleteInvestor,
};
