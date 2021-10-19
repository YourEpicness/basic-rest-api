const express = require('express');

// logic for controlling functions are located in controllers
const messagesController = require('../controllers/messages.controller')

const messagesRouter = express.Router();
messagesRouter.get('/', messagesController.getMessages)
messagesRouter.get('/:id', messagesController.getMessageById)
messagesRouter.post('/', messagesController.postMessage)
messagesRouter.put('/:id', messagesController.updateMessage)
messagesRouter.delete('/:id', messagesController.deleteMessage)

module.exports = messagesRouter;