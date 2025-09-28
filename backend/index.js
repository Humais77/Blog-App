const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js');
const postRoute = require('./routes/post.route.js')
const commentRoute = require('./routes/comment.route.js')
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const cors = require('cors');   // ✅ add this
dotenv.config();

connectDB();
const app = express();

// ✅ allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

app.use("/uploads", express.static("uploads"));

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

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
