import { NextApiHandler } from 'next'

import { query } from '../../../lib/db'
import { viewTable } from '../../../config/globalvariables';


const handler: NextApiHandler = async (req, res) => {
  const { viewName } = req.body
  try {
    if (!viewName) {
      return res
        .status(400)
        .json({ message: 'viewname is required' })
    }

    const results = await query(`
    INSERT INTO ${viewTable}
      (view_name)
      VALUES (?)
      `, [viewName]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
