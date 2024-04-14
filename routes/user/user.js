const express = require('express')
const { registerUser, getusers } = require('../../controllers/user/user')
const router = express.Router()

router.get('/', getusers)
router.post('/create-account', registerUser)

module.exports = router
