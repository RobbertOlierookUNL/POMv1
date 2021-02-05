export const allOptionsWithData = {
	display: {
		default: null,
		input: [null, "compact", "expanded", "hidden"],
	},
	title: {
		default: null,
		input: "text",
	},
	hovername: {
		default: null,
		input: "text",
	},
	unit: {
		default: null,
		input: "text",
	},
	widthweight: {
		default: 12,
		input: "number",
	},
	widthkind: {
		default: "relative",
		input: ["relative", "absolute", "characters", /*"[px]min,[fr]max"*/],
	},
	indexweight: {
		default: 10,
		input: "number",
	},
	textdisplay: {
		default: "default",
		input: ["default", "mono-right"],
	},
	valuetype : {
		default: "text",
		input: ["text", "number", "date"],
	},
	filtertype: {
		default: "inherit",
		input: ["inherit", "range", "datePicker", "searchField", "dropdown", false]
	},
	filterseperation: {
		default: "spaces",
		input: ["spaces", ";", ",", "none"]
	},
	merge : {
		default: "getOne",
		input: ["add", "mergeBy", "firstDate", "getOne", "displayMulti", "count"],
	},
	updateable : {
		default: "never",
		input: ["never", "withFreeInput", "withDropdown", "auto"]
	},
	dropdownupdateoptions: {
		default: "",
		input: "text"
	},
	allowinputfrom: {
		default: "op1, sa1",
		input: ["op0, sa0", "op1, sa0", "op2, sa0", "op0, sa1", "op1, sa1", "op2, sa1", "op0, sa2", "op0, sa2", "op1, sa2", "op2, sa2"]
	}





};

export const allOptions = [...Object.keys(allOptionsWithData)];
