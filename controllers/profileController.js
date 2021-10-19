
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