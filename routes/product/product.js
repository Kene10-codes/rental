const express = require('express')
const {
    createProduct,
    getAllProducts,
} = require('../../controllers/product/product')
const router = express.Router()

router.get('/get-products', getAllProducts)
router.post('/create-product', createProduct)

module.exports = router
