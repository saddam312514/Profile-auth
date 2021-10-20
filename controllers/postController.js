const Post = require('../models/Post')
const User = require('../models/user')
const Profile = require('../models/Profile')


exports.addPost = async(req,res)=> {
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
    })

  

   await newPost.save()
   res.status(400).json({
       success: true,
       msg: "Successfully Post",
       newPost
   })
}

exports.getPosts = async(req,res) => {
   const posts = await Post.find()
    .sort({date: -1})

    res.status(400).json({
        success: true,
        posts
    })
}


exports.deletePost = (req,res)  => {


    Profile.findOne({owner: req.user.id})
    .then(profile => {
         Post.findById(req.params.id)
        .then(post => {
            if(post.user.toString() !== req.user.id){
                return res.status(400).json({notAuthrieze: 'User not authorized'})
            }
             post.remove().then(() => res.json({success: true}))
        }).catch((err => res.status(404).json({postnotfound: 'No post found'})))
    })
}

exports.postLike = (req,res) => {
    Profile.findOne({owner: req.user.id})
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length> 0){
                return res.status(400).json({alreadyLiked: 'User already liked this post'})
            }
            post.likes.unshift({user: req.user.id})
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({Err: 'No post found'}))
    })
}


exports.postUnLike = (req,res) => {
    Profile.findOne({owner: req.user.id})
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json({notliked: 'You have not yet liked this post'})
            }
           const removeIndex = post.likes.map(item => item.user.toString())
           .indexOf(req.user.id)
           post.likes.splice(removeIndex, 1)

           //save
           post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({Err: 'No post found'}))
    })
}


exports.addComment = (req,res) => {
    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            user: req.user.id
        }
        post.comments.unshift(newComment)
        post.save().then(post => res.json(post))
    }).catch(err => res.status(404).json({Err: 'No post found'}))
}

exports.commentDelete = (req,res) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
            return res.status(404).json({commentExit: 'Comment does not'})
        }
      
        const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id)
        post.comments.splice(removeIndex, 1)
        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
}