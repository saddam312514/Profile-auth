
const Profile = require('../models/Profile')
const User = require('../models/user')


exports.getProfile = async(req,res) => {

    const profile = await Profile.findOne({owner: req.user._id})
    if(!profile){
        return res.status(400).json({
            message: "No Profile for this user"
        })
    }
    res.json(profile)

}



exports.singleProfile = async(req,res) => {

    const profile = await Profile.findOne({owner: req.user.id})
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
            company: req.body.company,
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


 exports.education = async(req,res) => {
    try{

       const profile = await Profile.findOne({owner: req.user._id})
        if(!profile){
            return res.status(400).send('All ready Added')
        }
        const newExp = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        profile.education.unshift(newExp)
        await profile.save()
        res.json(profile)
   
       
       
 
   
    }catch(err){
        res.status(400).send(err)
 
    }
 
 }

 exports.deleteExperience = (req,res) => {
     
    try{

    const expId = req.params.exp_id

    if(!expId) return res.status(400).json('not found id')


    Profile.findOne({ owner: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));

    }catch(err){
        res.status(403).json(err)
    }
    

 }