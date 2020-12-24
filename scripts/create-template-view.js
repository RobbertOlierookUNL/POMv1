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
async function seed() {
	// const cols = new Array(74).fill(JSON.stringify({widthweight: 12, title: ".", display: "compact"}));
	try {
		await query(/* sql */`
			INSERT INTO view_metadata_table_v3test
			 (view_name,
	      Type_Alert,
				advice,
				bbd,
				cap,
				category,
				costprice,
				cs_ean,
				cs_pal,
				cu_cs,
				cu_ean,
				customer1,
				customer1_deal,
				customer1_qty,
				customer1_status,
				customer1_timestamp,
				customer1_wk,
				customer2,
				customer2_deal,
				customer2_qty,
				customer2_status,
				customer2_timestamp,
				customer2_wk,
				customer3,
				customer3_deal,
				customer3_qty,
				customer3_status,
				customer3_timestamp,
				customer3_wk,
				customer4,
				customer4_deal,
				customer4_qty,
				customer4_status,
				customer4_timestamp,
				customer4_wk,
				floorpr,
				gm,
				gsv,
				hah_date,
				lagen_per_pal,
				litres_at_risk,
				litres_cu,
				m_bbd,
				m_niv_cu,
				maktx,
				mmsta,
				mrdr_id,
				mrpc,
				n_step,
				note,
				note_b,
				note_s,
				obsolete_qty,
				obsolete_qty_cu,
				pal_ean,
				pli_fee_at_risk,
				pli_fee_cu,
				price_at_risk,
				qty,
				qty_to_offer,
				rsp,
				sector,
				size_pack_form,
				status_id,
				timestamp,
				timestamp_p,
				timestamp_s,
				tkey,
				total_left,
				total_qty,
				units_per_laag,
				usr,
				usr_s,
				werks,
				y_bbd,
				config

			)
			VALUES ('template', ${("'"+JSON.stringify({widthweight: 12, title: "", display: ""})+"', ").repeat(74)}'')
    `);
		console.log("seed was successfull");
	} catch (e) {
		console.log(e);
		console.error("could not run seed, double check your credentials.");
		process.exit(1);
	}
}

seed().then(() => process.exit());
