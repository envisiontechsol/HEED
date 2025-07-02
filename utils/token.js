const jwt = require('jsonwebtoken');

//Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    process.env.ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

//Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.user_id },
    process.env.REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
