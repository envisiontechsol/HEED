const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const investorRoutes = require('./routes/investorRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.use('/api/users', userRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  console.error(' Uncaught Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
