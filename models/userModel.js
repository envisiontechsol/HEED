const { v4: uuidv4 } = require('uuid'); 
const pool = require('../config/db');

const getAllUsers = async () => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

const getUserById = async (userId) => {
  const res = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return res.rows[0];
};

const createUser = async (userName, email, phoneNo, password, createdOn, role, userImage) => {
  const userId = uuidv4(); 
  const res = await pool.query(
    'INSERT INTO users (user_id, user_name, email, phone_no, password, created_on, role, user_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [userId, userName, email, phoneNo, password, createdOn, role, userImage]
  );
  return res.rows[0];
};

const updateUser = async (userId, userName, email, phoneNo, password, role, userImage) => {
  const res = await pool.query(
    'UPDATE users SET user_name=$1, email=$2, phone_no=$3, password=$4, role=$5, user_image=$6 WHERE user_id=$7 RETURNING *',
    [userName, email, phoneNo, password, role, userImage, userId]
  );
  return res.rows[0];
};

const deleteUser = async (userId) => {
  await pool.query('DELETE FROM users WHERE user_id=$1', [userId]);
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
