const express = require('express')
const { createProduct } = require('../../controllers/product/product')
const router = express.Router()

router.post('/create-product', createProduct)

module.exports = router
