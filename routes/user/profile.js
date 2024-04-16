const express = require('express')
const {
    updateUserProfile,
    registerUserProfile,
} = require('../../controllers/user/profile')
const router = express.Router()

router.post('/create-profile', registerUserProfile)
router.put('/:id', updateUserProfile)

module.exports = router
