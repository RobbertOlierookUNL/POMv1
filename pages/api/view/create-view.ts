import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { viewName } = req.body
  try {
    if (!viewName) {
      return res
        .status(400)
        .json({ message: 'viewname is required' })
    }

    // const results = await query(`
    // INSERT INTO view_metadata_table_v3test
    //   (view_name,
    //    Type_Alert,
    //    advice,
    //    bbd,
    //    cap,
    //    category,
    //    costprice,
    //    cs_ean,
    //    cs_pal,
    //    cu_cs,
    //    cu_ean,
    //    customer1,
    //    customer1_deal,
    //    customer1_qty,
    //    customer1_status,
    //    customer1_timestamp,
    //    customer1_wk,
    //    customer2,
    //    customer2_deal,
    //    customer2_qty,
    //    customer2_status,
    //    customer2_timestamp,
    //    customer2_wk,
    //    customer3,
    //    customer3_deal,
    //    customer3_qty,
    //    customer3_status,
    //    customer3_timestamp,
    //    customer3_wk,
    //    customer4,
    //    customer4_deal,
    //    customer4_qty,
    //    customer4_status,
    //    customer4_timestamp,
    //    customer4_wk,
    //    floorpr,
    //    gm,
    //    gsv,
    //    hah_date,
    //    lagen_per_pal,
    //    litres_at_risk,
    //    litres_cu,
    //    m_bbd,
    //    m_niv_cu,
    //    maktx,
    //    mmsta,
    //    mrdr_id,
    //    mrpc,
    //    n_step,
    //    note,
    //    note_b,
    //    note_s,
    //    obsolete_qty,
    //    obsolete_qty_cu,
    //    pal_ean,
    //    pli_fee_at_risk,
    //    pli_fee_cu,
    //    price_at_risk,
    //    qty,
    //    qty_to_offer,
    //    rsp,
    //    sector,
    //    size_pack_form,
    //    status_id,
    //    timestamp,
    //    timestamp_p,
    //    timestamp_s,
    //    tkey,
    //    total_left,
    //    total_qty,
    //    units_per_laag,
    //    usr,
    //    usr_s,
    //    werks,
    //    y_bbd,
    //    config
    //   )
    //   VALUES (?, ${("'"+JSON.stringify({widthweight: 12, title: "", display: ""})+"', ").repeat(74)}'')
    //   `, [viewName]
    // )

    const results = await query(`
    INSERT INTO view_metadata_table_v3test
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
