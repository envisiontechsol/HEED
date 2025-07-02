const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify 
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next(); //Pass control
  } catch (err) {
    console.error('Access token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired access token' });
  }
};

module.exports = verifyAccessToken;
