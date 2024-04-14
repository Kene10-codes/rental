const express = require('express')
const userRoutes = require('../../routes/user/user')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))

    app.use('/api/user', userRoutes)
}
