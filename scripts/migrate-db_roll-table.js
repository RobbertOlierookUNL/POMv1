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
//
// async function drop() {
// 	try {
// 		await query(/* sql */`
// 		DROP TABLE IF EXISTS roll_metadata_table_v3test
// 		`);
// 		console.log("migration ran successfully");
// 	} catch (e) {
// 		console.log(e);
// 		console.error("could not run migration, double check your credentials.");
// 		process.exit(1);
// 	}
// }

// Create "entries" table if doesn't exist
async function migrate() {
	try {
		await query(/* sql */`
    CREATE TABLE IF NOT EXISTS roll_metadata_table_v3test (
      rollName VARCHAR(100) PRIMARY KEY,
			defaultView TEXT NOT NULL DEFAULT "defaultview",
			hasChain BOOLEAN NOT NULL DEFAULT 0,
			adminRights TEXT NOT NULL DEFAULT "none",
			preferences JSON,
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

// drop().then(() =>
migrate().then(() => process.exit());
// );
