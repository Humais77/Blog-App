const express = require('express');
const { signup, signin } = require('../controllers/auth.controllers.js');
const route = express.Router();

route.post('/signup',signup);
route.post('/signin',signin);
module.exports = route;