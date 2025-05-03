const database = require('../services/database')

exports.createClient = async (req, res) => {
    const {
        document_type,
        document_number,
        name,
        street_address,
        city,
        state
      } = req.body;

      const userId = req.user.id;
      
      try {
        const result = await database.pool.query({
          text: `INSERT INTO clients (
            user_id, document_type, document_number, name, street_address, city, state
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *`,
          values: [
            userId,
            document_type,
            document_number,
            name,
            street_address,
            city,
            state
          ]
        })
        return res.status(200).json(result.rows[0])
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
}

exports.getClients = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await database.pool.query({
      text: 'SELECT * FROM clients WHERE user_id = $1',
      values: [userId]
    })
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

exports.updateClient = async (req, res) => {
  const userId = req.user.id;
  const {
    document_type,
    document_number,
    name,
    street_address,
    city,
    state
  } = req.body;

  try {
    const result = await database.pool.query({
      text: `UPDATE clients SET
        document_type = $1,
        document_number = $2,
        name = $3,
        street_address = $4,
        city = $5,
        state = $6,
        updated_at = NOW()
      WHERE id = $7 AND user_id = $8
      RETURNING *`,
      values: [document_type,
        document_number,
        name,
        street_address,
        city,
        state, req.params.id, userId]
    })
    return res.status(201).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

exports.deleteClient = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await database.pool.query({
      text: `
      DELETE FROM clients WHERE id = $1 AND user_id = $2`,
      values: [req.params.id, userId]
    })
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}