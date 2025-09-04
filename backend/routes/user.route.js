const express = require('express');
const { test, updateUser, deleteUser } = require('../controllers/user.controllers.js');
const { verifyToken } = require('../utils/verifyUser.js');

const route = express.Router();
route.get('/test',test)
route.put('/update/:userId',verifyToken,updateUser)
route.delete('/delete/:userId',verifyToken,deleteUser)
module.exports = route;