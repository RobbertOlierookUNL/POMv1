import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { view } = req.query
  try {
    if (view === null) {
      return null;
    }
    if (!view) {
      return res.status(400).json({ message: '`view` required' })
    }
    if (view === "undefined") {
      return;
    }
    const results = await query(
      `
      SELECT *
      FROM view_metadata_table_v3test
      WHERE view_name = ?
    `,
      view
    )

    return res.json(results[0])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
