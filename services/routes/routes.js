const express = require('express')
const userRoutes = require('../../routes/user/user')
const userProfileRoutes = require('../../routes/user/profile')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))

    app.use('/api/user', userRoutes)
    app.use('/api/user/profile', userProfileRoutes)
}
