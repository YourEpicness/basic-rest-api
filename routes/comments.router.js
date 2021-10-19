const express = require('express');

// logic for controlling functions are located in controllers
const commentsController = require('../controllers/comments.controller')

const commentsRouter = express.Router({mergeParams: true});
commentsRouter.get('/', commentsController.getComments)
commentsRouter.get('/:id', commentsController.getCommentById)
commentsRouter.post('/', commentsController.postComment)
commentsRouter.put('/:id', commentsController.updateComment)
commentsRouter.delete('/:id', commentsController.deleteComment)

module.exports = commentsRouter;