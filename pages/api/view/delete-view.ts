import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
import { viewTable } from '../../../config/globalvariables';


const handler: NextApiHandler = async (req, res) => {
  const { view_name } = req.query
  try {
    if (!view_name) {
      return res.status(400).json({ message: '`viewname` required' })
    }
    const results = await query(
      `
      DELETE FROM ${viewTable}
      WHERE view_name = ?
  `,
      view_name
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
