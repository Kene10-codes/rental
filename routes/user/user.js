const express = require('express')

const { registerUser, getusers } = require('../../controllers/user/user')
const { updateUserProfile } = require('../../controllers/user/profile')
const { authUser } = require('../../controllers/auth/login')
const { auth } = require('../../middlewares/jwt/jwt')
const router = express.Router()

router.get('/', auth, getusers)
router.post('/create-account', registerUser)
router.post('/user-login', authUser)
router.put('/:id', auth, updateUserProfile)

module.exports = router
