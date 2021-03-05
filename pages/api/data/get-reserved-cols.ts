import { NextApiHandler } from 'next'

import { dataTable, dataTable_pk } from '../../../config/globalvariables';
import { query } from '../../../lib/db'


const handler: NextApiHandler = async (req, res) => {
  const { pk } = req.query

  try {
    if (req.method === "GET") {
      const results = await query(/* sql */`
        SELECT
          total_left,
          total_qty,
          qty_to_offer
        FROM ${dataTable}
        WHERE ${dataTable_pk} = ?
    `, pk
     )

      return res.json(results[0])
    } else {
      res.status(400).json({ message: `Does not support a ${req.method} request` })
    }
  } catch (e) {
    res.status(500).json({ message: e.message})
  }
}

export default handler
