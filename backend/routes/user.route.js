const express = require('express');
const { test, updateUser } = require('../controllers/user.controllers.js');
const { verifyToken } = require('../utils/verifyUser.js');

const route = express.Router();
route.get('/test',test)
route.put('/update/:userId',verifyToken,updateUser)
module.exports = route;