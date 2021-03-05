import { NextApiHandler } from 'next'

import { dataTable } from '../../../config/globalvariables';
import { query } from '../../../lib/db'


const handler: NextApiHandler = async (req, res) => {

  try {

    if (req.method === "GET") {
      const results = await query(/* sql */`
        SELECT * FROM ${dataTable};
    `,
     )

      return res.json(results)
    } else {
      res.status(400).json({ message: `Does not support a ${req.method} request` })
    }
  } catch (e) {

    res.status(500).json({ message: e.message})
  }
}

export default handler
