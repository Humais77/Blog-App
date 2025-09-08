const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { errorHandler } = require("../utils/error");
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
        return;

    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {

        await newUser.save();
        res.json({ message: "Signup successful" });

    } catch (error) {
        next(error);
    }
}
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            next(errorHandler(404, "Invalid credentials"));
            return;
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            next(errorHandler(400, "Invalid credentials"));
            return;
        }
        const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: true,
        }).json(user);
    } catch (error) {
        next(error);
    }

}
const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: true,
            }).json(rest);
        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatePassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            })
            await newUser.save();
            const token = jwt.sign({ id: user._id,isAdmin:newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: true,
            }).json(rest);

        }
    } catch (error) {
        next(error)
    }
}
module.exports = { signup, signin, google };