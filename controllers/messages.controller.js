// used for handling various OS paths
const path = require('path');

const {generateHalLinks} = require('../utils/hateoas');

const messages = [
    {
        id: 1,
        message: 'First message!'
    }
]
// best to write using function() instead of arrow function
function getMessages(req, res) {
    const firstMessage = Object.assign({_links:generateHalLinks(req)}, messages[0])
    messages.splice(0, 1, firstMessage)
    res.json(messages)
}

function getMessageById(req, res) {
    const messageId = Number(req.params.id);
    const messageIndex = messages.findIndex(item => item.id === messageId)
    const message = messages[messageId - 1]
    if(!message) {
        return res.status(404).json({error: "Message not found"})
    }
    const halMessage = Object.assign({_links: generateHalLinks(req)}, message)
    messages.splice(messageIndex, 1, halMessage)
    res.json(halMessage)
}

function postMessage(req, res){
    const newMessage = {
        _links: generateHalLinks(req),
        id: messages.length + 1,
        message: req.body.message
    }
    
    messages.push(newMessage);
    res.status(201).json({newMessage})
}

function updateMessage(req, res) {
    const messageId = Number(req.params.id)
    console.log(`Updating message at messageId:${messageId}...`)
    const messageIndex = messages.findIndex(item => item.id === messageId)
    const updatedMessage = {
        _links: {
            self: {
                href: req.originalUrl
            },
            messages: {
                href: req.baseUrl
            }
        },
        id: messageId,
        message: req.body.message
    }
    console.log(generateHalLinks(req))
    // updatedMessage = Object.assign(generateHalLinks(req), updatedMessage)
    if(messageIndex === -1) {
        messages.push(updatedMessage)
    } else {
        messages.splice(messageIndex, 1, updatedMessage)
    }
    res.status(200).json(updatedMessage)
}

function deleteMessage(req, res) {
    const messageId = Number(req.params.id);
    console.log(`Looking for at messageId:${messageId}...`)
    const messageIndex = messages.findIndex(item => item.id === messageId)
    messages.splice(messageIndex, 1)
    res.json(messages)
}

module.exports = {
    getMessages,
    getMessageById,
    postMessage,
    updateMessage,
    deleteMessage
}