const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser')
dotenv.config();

// mongoose.connect(process.env.MONGO_URL).then(() => {
//     console.log('Connected to MongoDB');

// }).catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
// });
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
    
})
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal server error';
    res.status(statuscode).json({
        success:false,
        statuscode,
        message
    });
})