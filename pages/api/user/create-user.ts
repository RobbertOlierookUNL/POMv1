import { NextApiHandler } from 'next'

import { query } from '../../../lib/db'
import { userTable } from '../../../config/globalvariables';


const handler: NextApiHandler = async (req, res) => {
  const { email, roll, category, chain=null, firstName, lastName, sf } = req.body
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: 'email is required' })
    }

    const results = await query(`
    INSERT INTO ${userTable}
      (email, roll, category, chain, firstName, lastName, silentFilters)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [email, roll, category, chain, firstName, lastName, sf]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
