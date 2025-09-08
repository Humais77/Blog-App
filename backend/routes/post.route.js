const express = require('express')
const {verifyToken} = require('../utils/verifyUser.js');
const { create } = require('../controllers/post.controllers.js');
const router = express.Router();
router.post('/create',verifyToken,create)
module.exports = router