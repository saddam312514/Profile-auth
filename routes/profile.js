const express = require('express')

const router = express()

const {getProfile,addProfile,getUserProfile} = require('../controllers/profileController')



const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')
router.get('/profile', getProfile)
router.post('/profile', auth, addProfile)

router.get('/user/:user_id', auth, getUserProfile)




module.exports = router