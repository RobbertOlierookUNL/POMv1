
// max number of tablerows in DOM (for lazyloading)
export const numberInView = 180;

//number of additionalColKeys in expand block
export const numberOfColumnsInExpandBlock = 3;

//table padding
export const horPadding = 6;
export const verPadding = 6;

// sticky bars
export const headerHeight = "37px";
export const filterDisplayBarHeight = "27px";
export const toolBarHeight = "22.5px";
export const tableHeadersBarHeight = "18px";
export const filterAndUnitBarHeight = "18px";

//table names
export const dataTable = "website_output_table_v4";
export const categoryTable = "category_metadata_table_v4";
export const chainTable = "chain_metadata_table_v4";
export const rollTable = "roll_metadata_table_v4";
export const viewTable = "view_metadata_table_v4";
export const userTable = "user_table_v4";

//primary keys
export const dataTable_pk = "tkey";

//error
export const errorRGB = "187, 33, 29";
export const warningRGB = "255, 96, 79";
export const background = "#7070a0";

//categories
export const categories = ["FOOD", "BPC", "HC", "ICE", "TEA"];
export const accounts = [ { Name: "", Id: "" },
	{ Name: "Action", Id: "Action"},
	{ Name: "Advion", Id: "Advion"},
	{ Name: "AH", Id: "AH"},
	{ Name: "Aldi", Id: "Aldi"},
	{ Name: "Brandmasters", Id: "Brandmasters"},
	{ Name: "Coop", Id: "Coop" },
	{ Name: "Deen", Id: "Deen" },
	{ Name: "Dirk", Id: "Dirk" },
	{ Name: "Ecommerce", Id: "Ecommerce"},
	{ Name: "GT_Retail", Id: "GT_Retail"},
	{ Name: "Hoogvliet", Id: "Hoogvliet" },
	{ Name: "Jan_Linders", Id: "Jan_Linders" },
	{ Name: "Jumbo", Id: "Jumbo"},
	{ Name: "Kruidvat", Id: "Kruidvat" },
	{ Name: "na", Id: "na" },
	{ Name: "Nettorama", Id: "Nettorama" },
	{ Name: "Overig", Id: "Overig" },
	{ Name: "PenTrade", Id: "PenTrade"},
	{ Name: "Plus", Id: "Plus" },
	{ Name: "Poiesz", Id: "Poiesz" },
	{ Name: "Ten_Zweege", Id: "Ten_Zweege"},
	{ Name: "Top_Brands", Id: "Top_Brands"},
	{ Name: "Van Dijk", Id: "Van Dijk"},
	{ Name: "Vomar", Id: "Vomar" }];

export const stati = ["Plan", "Confirmed", "Sold", "Canceled"];

//staat ook in de prepareData webworker
export const cePerHe = "cu_cs";

export const ZAN = [
	{
		label: "EAN CE",
		col: "cu_ean",
	},
	{
		label: "Description",
		col: "maktx",
	},
	{
		label: "HE/Pallet",
		col: "cs_pal",
	},
	{
		label: "MRDR",
		col: "mrdr_id",
	},
	{
	  label: "800(EURO)/1000(BLOK)",
	  col: "type_pal",
	  factor: "",
	},
	{
		label: "CE/CS",
		col: "cu_cs",
	},
	{
		label: "Amount in CS",
		col: "qty_to_offer",
	},
	{
		label: "Amount in CE",
		col: "qty_to_offer",
		multiply: "cu_cs",
	},
	{
		label: "THT",
		col: "bbd",
		date: true,
	},
	{
		label: "Discount",
		col: "gsv",
	},
	{
	  label: "Price/CE",
	  col: "m_niv_cs",
	  divide: "cu_cs",
	},
	{
	  label: "Price/CS",
	  col: "m_niv_cs",
	},
	{
		label: "Aantal PAL",
		col: "qty_to_offer",
		divide: "cs_pal",
		round: 2,
	},
];

//Hard coded columns:
//category
//mprc
//n_step
//tkey
//cu_cs
