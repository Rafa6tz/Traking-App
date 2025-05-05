const { text } = require('express');
const database = require('../services/database')

exports.createBarCode = async (req, res) => {
    const {name, code} = req.body
    const userId = req.user.id;

    try {
        const result = await database.pool.query({
            text: 'INSERT INTO barcodes (user_id, name, code) VALUES ($1, $2, $3) RETURNING *',
            values: [userId, name, code]
        })
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

exports.getBarCodes = async (req, res) => {
    const userId = req.user.id
  
    try {
      const result = await database.pool.query({
        text: 'SELECT * FROM barcodes WHERE user_id = $1',
        values: [userId]
    })
      return res.status(200).json(result.rows)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
  

  exports.deleteBarCode = async (req, res) => {
    const userId = req.user.id

    try {
        const result = await database.pool.query({
            text: `DELETE FROM barcodes WHERE id = $1 AND user_id = $2`,
            values: [req.params.id, userId]
        })
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
  }