const jwt = require('jsonwebtoken')

module.exports.auth = function (req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) return res.status(401).send('UNATUHORIZED, ACCESSS IS DENIED')

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.user = decodedToken
        next()
    } catch (ex) {
        res.status(400).send('Invalid token credientials')
    }
}
