import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { conditions, columns } = req.query

  try {
    const parsedColumns: Array<any> | boolean = columns && typeof columns === "string" && columns !== "undefined" && JSON.parse(columns);
    const parsedConditions: Object | boolean = conditions && typeof conditions === "string" && conditions !== "undefined" && JSON.parse(conditions);

    if (req.method === "GET") {
      const results = await query(/* sql */`
        SELECT ${parsedColumns && Array.isArray(parsedColumns)? parsedColumns.join(', ') : '*'} FROM website_output_table_v3test
        ${parsedConditions ?
          `WHERE ${Object.entries(parsedConditions).map(([key, value]) => {
            const connector = Array.isArray(value) ? 'IN' : '=';
            const processedValue = Array.isArray(value) ? `(${value.map(() => '?').toString()})` : '?';
            return `(${key} ${connector} ${processedValue})`;
          }).join(' AND ')}`
        : ""}
        ORDER BY maktx
    `,
      parsedConditions ?
       Object.values(parsedConditions).flat()
       : []
     )

      return res.json(results)
    } else {
      res.status(400).json({ message: `Does not support a ${req.method} request` })
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
