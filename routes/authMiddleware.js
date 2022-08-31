const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({message: 'Немає авторизації'})
        }
        jwt.verify(token, config.get('jwtKey'))
        next()

    } catch (e) {
        res.status(401).json({message: 'Немає авторизації'})
    }
}