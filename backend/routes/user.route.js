const express = require('express');
const { test } = require('../controllers/user.controllers.js');

const route = express.Router();
route.get('/test',test)
module.exports = route;