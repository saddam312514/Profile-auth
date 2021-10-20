const express = require('express')
const router = express()


const {addPost,getPosts, deletePost} = require('../controllers/postController')

const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')
router.post('/post',auth,addPost)
router.get('/posts', getPosts)
router.delete('/post/:id', auth, deletePost)


module.exports = router