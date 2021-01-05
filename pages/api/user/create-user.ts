import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { email, roll, category, chain=null, firstName, lastName } = req.body
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: 'email is required' })
    }

    const results = await query(`
    INSERT INTO user_table_v3test
      (email, roll, category, chain, firstName, lastName)
      VALUES (?, ?, ?, ?, ?, ?)
      `, [email, roll, category, chain, firstName, lastName]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
