const express = require('express')

const router = express()

const {getProfile,addProfile,getUserProfile,addExperience,education,singleProfile,deleteExperience} = require('../controllers/profileController')



const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')
router.get('/profile', auth, getProfile)
router.get('/profile/:id', auth, singleProfile)
router.post('/profile', auth, addProfile)
router.post('/experience', auth, addExperience)

router.post('/education', auth, education)

router.delete('/experience/:exp_id', auth, deleteExperience)

router.get('/user/:user_id', auth, getUserProfile)




module.exports = router