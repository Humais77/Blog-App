const User = require("../models/user.model");
const bcrypt = require('bcryptjs');


const signup = async (req, res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message:'Please fill all the fields'});

    }
    const hashedPassword =  bcrypt.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });
    try {
        
        await newUser.save();
        res.json({message:"Signup successful"});
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"});    
    }
}
module.exports = { signup };