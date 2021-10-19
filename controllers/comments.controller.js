// used for handling various OS paths
const path = require('path');

const {generateHalLinks} = require('../utils/hateoas');
let messageUrl = 1;

const comments = [
    {
        _links: {
            self: {
                href: `/messages/${messageUrl}/comments/1`
            },
            messages: {
                href: "/messages"
            }
        },
        id: 1,
        messageId: 1,
        comment: 'First comment!'
    }
]


// best to write using function() instead of arrow function
function getComments(req, res) {
    if(!comments) {
        return res.status(404).json({error: "No comments found"})
    }
    res.json(comments)
}

function getCommentById(req, res) {
    const commentId = Number(req.params.id);
    const commentIndex = comments.findIndex(item => item.id === commentId)
    const comment = comments[commentId - 1]
    if(!comment) {
        return res.status(404).json({error: "comment not found"})
    }
    const halComment = Object.assign({_links: generateHalLinks(req)}, comment)
    comments.splice(commentIndex, 1, halComment)
    res.json(halComment)
}

function postComment(req, res){
    const commentId = comments.length + 1;
    messageUrl = req.params.id;
    const newComment = {
        _links: {
            self: {
                href: `/messages/${messageUrl}/comments/${commentId}`
            },
            messages: {
                href: "/messages"
            }
        },
        id: commentId,
        comment: req.body.comment
    }

    comments.push(newComment);
    res.status(201).json({newComment})
}

function updateComment(req, res) {
    const commentId = Number(req.params.id)
    console.log(`Updating comment at commentId:${commentId}...`)
    const commentIndex = comments.findIndex(item => item.id === commentId)
    updatedComment = {
        _links: generateHalLinks(req),
        id: commentId,
        comment: req.body.comment
    }
    if(commentIndex === -1) {
        comments.push(updatedComment)
    } else {
        comments.splice(commentIndex, 1, updatedComment)
    }
    res.status(200).json(updatedComment)
}

function deleteComment(req, res) {
    const commentId = Number(req.params.id);
    console.log(`Looking for at commentId:${commentId}...`)
    const commentIndex = comments.findIndex(item => item.id === commentId)
    comments.splice(commentIndex, 1)
    res.json(comments)
}

module.exports = {
    getComments,
    getCommentById,
    postComment,
    updateComment,
    deleteComment
}