const { Vendor } = require('../../models/vendor/vendor')
const { Product } = require('../../models/product/product')
const { vendorValidate } = require('../../validators/vendor')

async function createProduct(req, res) {
    const { error } = vendorValidate.validate(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }
    const vendor = await Vendor.findOne({ _id: req.body.vendorId })
    if (!vendor) return res.status(400).send('user already exists')

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price,
        tag: req.body.tag,
    })

    await product.save()
    res.status(201).send(product)
}

module.exports = {
    createProduct,
}
