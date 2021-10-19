
const Profile = require('../models/Profile')
const User = require('../models/user')


exports.getProfile = async(req,res) => {

    const profile = await Profile.findOne({user: req.user.id})
    if(!profile){
        return res.status(400).json({
            message: "No Profile for this user"
        })
    }
    res.json(profile)

}

exports.addProfile = async(req,res) => {
   try{

    const profile = new Profile({...req.body, owner: req.user._id})

   
    await profile.save()
    res.json(profile)

   }catch(err){
       res.status(400).send(err)

   }

}

exports.getUserProfile = async(req,res) => {
    const profile =  await Profile.findOne({owner: req.params.user_id}).populate('User')
    res.json(profile)
}


exports.addExperience = async(req,res) => {
    try{

       const profile = await Profile.findOne({owner: req.user._id})
        if(!profile){
            return res.status(400).send('All ready Added')
        }
        const newExp = {
            title: req.body.title,
            companay: req.body.companay,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
   
       
       
 
   
    }catch(err){
        res.status(400).send(err)
 
    }
 
 }