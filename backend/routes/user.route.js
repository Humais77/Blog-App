const express = require('express');
const { test, updateUser, deleteUser, signout } = require('../controllers/user.controllers.js');
const { verifyToken } = require('../utils/verifyUser.js');

const route = express.Router();
route.get('/test',test)
route.put('/update/:userId',verifyToken,updateUser)
route.delete('/delete/:userId',verifyToken,deleteUser)
route.post('/signout',signout)
module.exports = route;