const mongoose = require('mongoose')
const logger = require('../log/log.js')()

const DB_CONNNCT = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@nodetut.n6pqp.mongodb.net/blogs-data?retryWrites=true&w=majority`

module.exports = async function () {
    try {
        await mongoose
            .connect(DB_CONNNCT)
            .then(() => {
                logger.info('DB is connected')
            })
            .catch((e) => logger.error(e.message))
    } catch (e) {
        logger.error(e.message)
    }
}
