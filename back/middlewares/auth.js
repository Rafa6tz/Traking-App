const jwt = require('jsonwebtoken')
const SECRET = '1234'

const authenticate = (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth) return res.status(401).json({ error: 'No token'})

        const token = auth.split(' ')[1];

        try {
            const decoded = jwt.verify(token, SECRET)
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
}

module.exports = authenticate;