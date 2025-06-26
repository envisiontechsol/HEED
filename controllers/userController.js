const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('getAllUsers Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error at getAllUsers' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('getUserById Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error at getUserById' });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, phoneNo, password, createdOn, role, userImage } = req.body;
    const newUser = await userModel.createUser(userName, email, phoneNo, password, createdOn, role, userImage);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('createUser Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error at createUser' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userName, email, phoneNo, password, role, userImage } = req.body;
    const updatedUser = await userModel.updateUser(
      req.params.userId,
      userName,
      email,
      phoneNo,
      password,
      role,
      userImage
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found for update' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error('updateUser Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error at updateUser' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('deleteUser Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error at deleteUser' });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
