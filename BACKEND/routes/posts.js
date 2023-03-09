/*https://youtu.be/1cjdlfB11Ss 
Express is required for the entire program, because it is used
to build APIs for web apps, giving access to many features
(see What Is Express JS? | Express JS Tutorial for Beginners 2022 | Express JS API | Simplilearn, 2022).
*/
const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const checkauth = require('../check-auth')

router.get('', (req, res) => {
    Post.find().then((post) => {
        res.json({
            message: 'Post found',
            post: post
        })
    })
})

router.post('', checkauth, (req, res) => {
    const post = new Post({
        id: req.body.id,
        postDetails: req.body.postDetails
    })
    post.save().then(() => {
        res.status(201).json({
            message: 'Post created',
            post: post
        })
    })
})

router.delete('/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id})
    .then((result) => {
        res.status(200).json({message: 'Post deleted'})
    })
})

module.exports = router