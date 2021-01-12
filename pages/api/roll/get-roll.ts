import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { roll } = req.query
  try {
    if (!roll) {
      return res.status(400).json({ message: '`roll` required' })
    }
    if (roll === "undefined") {
      return;
    }
    const results = await query(
      `
      SELECT *
      FROM roll_metadata_table_v3test
      WHERE rollName = ?
    `,
      roll
    )

    return res.json(results[0])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
