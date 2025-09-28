const express = require('express');
const { test, updateUser, deleteUser, signout, getUsers, getUser } = require('../controllers/user.controllers.js');
const { verifyToken } = require('../utils/verifyUser.js');

const route = express.Router();
route.get('/test',test)
route.put('/update/:userId',verifyToken,updateUser)
route.delete('/delete/:userId',verifyToken,deleteUser)
route.post('/signout',signout)
route.get('/getusers',verifyToken,getUsers)
route.get('/:userId',getUser)
module.exports = route;