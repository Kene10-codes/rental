module.exports = function (permissions) {
    return (req, res, next) => {
        const userRole = req.body.role
        if (permissions.includes(userRole)) {
            next()
        } else {
            return res.status(401).send('Unauthorized to view this page')
        }
    }
}
