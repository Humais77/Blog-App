const express = require('express')
const {verifyToken} = require('../utils/verifyUser.js');
const { create, getposts } = require('../controllers/post.controllers.js');
const router = express.Router();
router.post('/create',verifyToken,create)
router.get('/getposts',getposts)
module.exports = router