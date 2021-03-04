import { NextApiHandler } from 'next'

import { query } from '../../../lib/db'
import { rollTable } from '../../../config/globalvariables';


const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const results = await query(/* sql */`
        SELECT * FROM ${rollTable}
    `)

      return res.json(results)
    } else {
      res.status(400).json({ message: `Does not support a ${req.method} request` })
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
