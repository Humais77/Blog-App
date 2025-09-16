const express = require('express')
const {verifyToken} = require('../utils/verifyUser.js');
const { create, getposts, deletepost } = require('../controllers/post.controllers.js');
const router = express.Router();
router.post('/create',verifyToken,create)
router.get('/getposts',getposts)
router.delete('/deleteposts/:postId/:userId',verifyToken,deletepost);
module.exports = router