const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local");

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
      view_name TEXT PRIMARY KEY,
      Type_Alert JSON NULL,
			advice JSON NULL,
			bbd JSON NULL,
			cap JSON NULL,
			category JSON NULL,
			costprice JSON NULL,
			cs_ean JSON NULL,
			cs_pal JSON NULL,
			cu_cs JSON NULL,
			cu_ean JSON NULL,
			customer1 JSON NULL,
			customer1_deal JSON NULL,
			customer1_qty JSON NULL,
			customer1_status JSON NULL,
			customer1_timestamp JSON NULL,
			customer1_wk JSON NULL,
			customer2 JSON NULL,
			customer2_deal JSON NULL,
			customer2_qty JSON NULL,
			customer2_status JSON NULL,
			customer2_timestamp JSON NULL,
			customer2_wk JSON NULL,
			customer3 JSON NULL,
			customer3_deal JSON NULL,
			customer3_qty JSON NULL,
			customer3_status JSON NULL,
			customer3_timestamp JSON NULL,
			customer3_wk JSON NULL,
			customer4 JSON NULL,
			customer4_deal JSON NULL,
			customer4_qty JSON NULL,
			customer4_status JSON NULL,
			customer4_timestamp JSON NULL,
			customer4_wk JSON NULL,
			floorpr JSON NULL,
			gm JSON NULL,
			gsv JSON NULL,
			hah_date JSON NULL,
			index JSON NULL,
			lagen_per_pal JSON NULL,
			litres_at_risk JSON NULL,
			litres_cu JSON NULL,
			m_bbd JSON NULL,
			m_niv_cu JSON NULL,
			maktx JSON NULL,
			mmsta JSON NULL,
			mrdr_id JSON NULL,
			mrpc JSON NULL,
			n_step JSON NULL,
			note JSON NULL,
			note_b JSON NULL,
			note_s JSON NULL,
			obsolete_qty JSON NULL,
			obsolete_qty_cu JSON NULL,
			pal_ean JSON NULL,
			pli_fee_at_risk JSON NULL,
			pli_fee_cu JSON NULL,
			price_at_risk JSON NULL,
			qty JSON NULL,
			qty_to_offer JSON NULL,
			rsp JSON NULL,
			sector JSON NULL,
			size_pack_form JSON NULL,
			status_id JSON NULL,
			timestamp JSON NULL,
			timestamp_p JSON NULL,
			timestamp_s JSON NULL,
			tkey JSON NULL,
			total_left JSON NULL,
			total_qty JSON NULL,
			units_per_laag JSON NULL,
			usr JSON NULL,
			usr_s JSON NULL,
			werks JSON NULL,
			y_bbd JSON NULL,
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
		console.error("could not run migration, double check your credentials.");
		process.exit(1);
	}
}

migrate().then(() => process.exit());
