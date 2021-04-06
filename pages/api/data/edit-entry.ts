import { NextApiHandler } from 'next'

import { dataTable } from '../../../config/globalvariables';
import { query } from '../../../lib/db'



const handler: NextApiHandler = async (req, res) => {
  const { id, col, val, usr, now } = req.body
  const vars = [val];
  if (usr) vars.push(usr);
  if (now) vars.push(now);
  vars.push(id);
  try {
    if (!id || !col) {
      return res
        .status(400)
        .json({ message: '`id`,`col`, and `val` are all required' })
    }

    const results = await query(
      `
      UPDATE ${dataTable}
      SET ${col} = ?${usr ? ", usr = ?" : ""}${now ? ", timestamp_last_change = ?" : ""}
      WHERE tkey = ?
      `,
      vars
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: `
    UPDATE ${dataTable}
    SET ${col} = ?${usr ? ", usr = ?" : ""}${now ? ", timestamp_last_change = ?" : ""}
    WHERE tkey = ?
    `, })
  }
}

export default handler
