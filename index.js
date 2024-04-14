require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

require('./services/db/db.js')()
require('./services/routes/routes.js')(app)
const logger = require('./services/log/log.js')()

const PORT = process.env.PORT || 3300

let server
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () =>
        logger.info(`App is running on port ${PORT}`)
    )
}

module.exports = server
