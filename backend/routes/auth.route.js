const express = require('express');
const { signup } = require('../controllers/auth.controllers.js');
const route = express.Router();

route.post('/signup',signup);
module.exports = route;