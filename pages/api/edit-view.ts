import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { attr, view_name, value } = req.body
  try {
    if (!attr || !view_name || !value) {
      return res
        .status(400)
        .json({ message: '`id`,`title`, and `content` are all required' })
    }

    const results = await query(
      `
      UPDATE view_metadata_table_v3test
      SET ${attr} = ?
      WHERE view_name = ?
      `,
      [value, view_name]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
