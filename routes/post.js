const express = require('express')
const router = express()


const {addPost,getPosts, deletePost,postLike,postUnLike,addComment,commentDelete} = require('../controllers/postController')

const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')
router.post('/post',auth,addPost)
router.get('/posts', getPosts)
router.delete('/post/:id', auth, deletePost)
router.post('/post/like/:id', auth, postLike)
router.post('/post/unlike/:id', auth, postUnLike)
router.post('/post/comment/:id', auth, addComment)
router.delete('/post/comment/:id/:comment_id', auth, commentDelete)




module.exports = router