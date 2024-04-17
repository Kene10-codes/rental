const express = require('express')
const userRoutes = require('../../routes/user/user')
const userProfileRoutes = require('../../routes/user/profile')
const vendorRoutes = require('../../routes/vendor/vendor')
const productRoutes = require('../../routes/product/product')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))

    app.use('/api/user', userRoutes)
    app.use('/api/user/profile', userProfileRoutes)
    app.use('/api/vendor', vendorRoutes)
    app.use('/api/product', productRoutes)
}
