import { NextApiHandler } from 'next'

import { query } from '../../../lib/db'
import { rollTable } from '../../../config/globalvariables';


const handler: NextApiHandler = async (req, res) => {
  const { roll } = req.query
  try {
    if (!roll ) {
      return res.status(400).json({ message: '`userId` required' })
    }

    const results = await query(
      `
      SELECT *
      FROM ${rollTable}
      WHERE rollName = ?
      `,
      roll
    )

    return res.json(results[0] || false)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
