const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

// Register New User
const register = async (req, res) => {
  try {
    const { userName, email, phoneNo, password, role, userImage } = req.body;

    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdOn = new Date();

    const newUser = await pool.query(
      `INSERT INTO users 
        (user_id, user_name, email, phone_no, password, created_on, role, user_image)
       VALUES
        (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)
       RETURNING user_id, user_name, email, phone_no, created_on, role, user_image`,
      [userName, email, phoneNo, hashedPassword, createdOn, role, userImage]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await pool.query('UPDATE users SET refresh_token = $1 WHERE user_id = $2', [refreshToken, user.user_id]);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: 'Login successful',
        accessToken,
        user: {
          userId: user.user_id,
          userName: user.user_name,
          email: user.email,
          phoneNo: user.phone_no,
          role: user.role,
          createdOn: user.created_on,
          userImage: user.user_image,
        },
      });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Refresh Access Token
const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token found' });

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const userId = decoded.userId;

    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    const user = result.rows[0];

    if (!user || user.refresh_token !== token) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(403).json({ message: 'Token expired or invalid' });
  }
};

//Logout
const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204); 

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
      userId = decoded.userId;
    } catch {
      return res.sendStatus(204); 
    }

    await pool.query('UPDATE users SET refresh_token = NULL WHERE user_id = $1', [userId]);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
