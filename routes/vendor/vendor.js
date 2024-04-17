const express = require('express')
const { registerVendor } = require('../../controllers/vendor/vendor')
const router = express.Router()

router.post('/create-account', registerVendor)

module.exports = router
