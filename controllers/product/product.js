const { Vendor } = require('../../models/vendor/vendor')
const { Product } = require('../../models/product/product')
const { vendorValidate } = require('../../validators/vendor')

async function createProduct(req, res) {
    const vendor = await Vendor.findOne({ _id: req.body.vendorId })
    if (!vendor) return res.status(400).send('Vendor ID does not exist')

    const product = new Product({
        vendor: {
            _id: vendor._id,
        },
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price,
        tag: req.body.tag,
    })

    await product.save()
    res.status(201).send(product)
}

async function getAllProducts(req, res) {
    const products = await Product.find().select('location price')
    if (!products) return res.status(400).send('No product found!')

    res.status(200).send(products)
}

module.exports = {
    createProduct,
    getAllProducts,
}
