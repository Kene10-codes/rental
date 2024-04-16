const express = require('express')
const authUser = require('../../middlewares/auth/auth')
const { registerUser, getusers } = require('../../controllers/user/user')
const { updateUserProfile } = require('../../controllers/user/profile')
const router = express.Router()

router.get('/', getusers)
router.post('/create-account', registerUser)
router.put('/:id', updateUserProfile)

module.exports = router
