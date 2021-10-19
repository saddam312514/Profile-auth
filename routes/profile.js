const express = require('express')

const router = express()

const {getProfile} = require('../controllers/profileController')

router.get('/profile', getProfile)




module.exports = router