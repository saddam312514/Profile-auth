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