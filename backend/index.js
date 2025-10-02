const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');
const postRoute = require('./routes/post.route.js');
const commentRoute = require('./routes/comment.route.js');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// ✅ allow requests from frontend
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

// ✅ serve frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


// ✅ error handler
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || 'Internal server error';
  res.status(statuscode).json({
    success: false,
    statuscode,
    message
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
