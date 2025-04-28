const database = require('../services/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = '1234'

exports.registerUser = async (req, res) => {
    try {
        const { document_type, document_number, name, street_address, city, state, email, password } = req.body
        const password_hash = await bcrypt.hash(password, 10)
        const result = await database.pool.query({
            text: `INSERT INTO users(document_type, document_number, name, street_address, city, state, email, password_hash) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            values: [document_type, document_number, name, street_address, city, state, email, password_hash ]
        })
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await database.pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (result.rowCount === 0 ) return res.status(401).json({error: 'User not found'})

        const user = result.rows[0]
        const match = await bcrypt.compare(password, user.password_hash)
        if(!match) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' })
        res.json({token})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

exports.profileUser = async (req, res) => {
    try {
        const result = await database.pool.query({
            text: 'SELECT id, name, email FROM users WHERE id = $1',
            values: [req.user.id ]
        })
        return res.json(result.rows[0])
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}