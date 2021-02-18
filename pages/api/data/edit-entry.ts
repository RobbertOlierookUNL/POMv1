import { NextApiHandler } from 'next'

import { dataTable } from '../../../config/globalvariables';
import { query } from '../../../lib/db'



const handler: NextApiHandler = async (req, res) => {
  const { id, col, val } = req.body
  try {
    if (!id || !col) {
      return res
        .status(400)
        .json({ message: '`id`,`col`, and `val` are all required' })
    }

    const results = await query(
      `
      UPDATE ${dataTable}
      SET ${col} = ?
      WHERE tkey = ?
      `,
      [val, id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
