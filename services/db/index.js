const mongoose = require('mongoose')

const DB_CONNNCT = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@nodetut.n6pqp.mongodb.net/blogs-data?retryWrites=true&w=majority`

module.exports = async function () {
    try {
        await mongoose
            .connect(DB_CONNNCT)
            .then(() => {
                console.log('DB is connected')
            })
            .catch((e) => console.log(e))
    } catch (e) {
        console.log(e.message)
    }
}
