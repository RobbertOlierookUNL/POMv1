const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local").replace(/\\\\/g, "\\");

console.log({ envPath });

require("dotenv").config({ path: envPath });

const mysql = require("serverless-mysql");

const db = mysql({
	config: {
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
	},
});

async function query(q) {
	try {
		const results = await db.query(q);
		await db.end();
		return results;
	} catch (e) {
		throw Error(e.message);
	}
}

// Create "entries" table if doesn't exist
async function migrate() {
	try {
		await query(/* sql */`
    CREATE TABLE IF NOT EXISTS view_metadata_table_v3test (
      view_name VARCHAR(100) PRIMARY KEY,
      Type_Alert JSON,
			advice JSON,
			bbd JSON,
			cap JSON,
			category JSON,
			costprice JSON,
			cs_ean JSON,
			cs_pal JSON,
			cu_cs JSON,
			cu_ean JSON,
			customer1 JSON,
			customer1_deal JSON,
			customer1_qty JSON,
			customer1_status JSON,
			customer1_timestamp JSON,
			customer1_wk JSON,
			customer2 JSON,
			customer2_deal JSON,
			customer2_qty JSON,
			customer2_status JSON,
			customer2_timestamp JSON,
			customer2_wk JSON,
			customer3 JSON,
			customer3_deal JSON,
			customer3_qty JSON,
			customer3_status JSON,
			customer3_timestamp JSON,
			customer3_wk JSON,
			customer4 JSON,
			customer4_deal JSON,
			customer4_qty JSON,
			customer4_status JSON,
			customer4_timestamp JSON,
			customer4_wk JSON,
			floorpr JSON,
			gm JSON,
			gsv JSON,
			hah_date JSON,
			lagen_per_pal JSON,
			litres_at_risk JSON,
			litres_cu JSON,
			m_bbd JSON,
			m_niv_cu JSON,
			maktx JSON,
			mmsta JSON,
			mrdr_id JSON,
			mrpc JSON,
			n_step JSON,
			note JSON,
			note_b JSON,
			note_s JSON,
			obsolete_qty JSON,
			obsolete_qty_cu JSON,
			pal_ean JSON,
			pli_fee_at_risk JSON,
			pli_fee_cu JSON,
			price_at_risk JSON,
			qty JSON,
			qty_to_offer JSON,
			rsp JSON,
			sector JSON,
			size_pack_form JSON,
			status_id JSON,
			timestamp JSON,
			timestamp_p JSON,
			timestamp_s JSON,
			tkey JSON,
			total_left JSON,
			total_qty JSON,
			units_per_laag JSON,
			usr JSON,
			usr_s JSON,
			werks JSON,
			y_bbd JSON,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at
        TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);
		console.log("migration ran successfully");
	} catch (e) {
		console.log(e);
		console.error("could not run migration, double check your credentials.");
		process.exit(1);
	}
}

migrate().then(() => process.exit());
