import { NextApiHandler } from 'next'

import { query } from '../../../lib/db'
import { userTable } from '../../../config/globalvariables';


const handler: NextApiHandler = async (req, res) => {
  const { userId, roll, category, sf } = req.body
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ message: 'email is required' })
    }



    const results = await query(`
    UPDATE ${userTable}
      SET
        roll = ?,
        category = ?,
        silentFilters = ?
      WHERE userId = ?
      `, [roll, category, sf, userId]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message, sql: `
    UPDATE ${userTable}
      SET
        roll = ?
        category = ?
        silentFilters = ?
      WHERE userId = ?
      `})
  }
}

export default handler
