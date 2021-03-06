import { NextApiHandler } from 'next'

import { query } from '../../../lib/db'
import { userTable } from '../../../config/globalvariables';


const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query
  try {
    if (!userId ) {
      return res.status(400).json({ message: '`userId` required' })
    }

    const results = await query(
      `
      SELECT *
      FROM ${userTable}
      WHERE userId = ?
      `,
      userId
    )

    return res.json(results[0] || false)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
