const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { createComment, getPostComments, likeComment, EditComment, DeleteComment, getComments } = require('../controllers/comment.controllers');
const router = express.Router();
router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likeComment/:commentId',verifyToken,likeComment);
router.put('/EditComment/:commentId',verifyToken,EditComment);
router.delete('/deleteComment/:commentId',verifyToken,DeleteComment);
router.get('/getcomments',verifyToken,getComments)
module.exports = router;