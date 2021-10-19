const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    handle: {
        type: String,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
       
    },
    skills: {
        type: [String],
       
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
              
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
               
            },
            to: {
                type: Date
            },
            current: {
                tepe: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                
            },
            fieldofstudy: {
                type: String,
            },
            from: {
                type: Date,
                
            },
            to: {
                type: Date
            },
            current: {
                tepe: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)