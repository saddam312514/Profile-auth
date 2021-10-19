const express = require('express')

const router = express()

const {getProfile,addProfile,getUserProfile,addExperience} = require('../controllers/profileController')



const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')
router.get('/profile', getProfile)
router.post('/profile', auth, addProfile)
router.post('/experience', auth, addExperience)

router.get('/user/:user_id', auth, getUserProfile)




module.exports = router