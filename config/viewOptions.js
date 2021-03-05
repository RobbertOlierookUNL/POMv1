export const allOptionsWithData = {
	display: {
		default: null,
		input: [null, "compact", "expanded", "hidden"],
		extendable: false,
	},
	title: {
		default: null,
		input: "text",
		extendable: true,
	},
	hovername: {
		default: null,
		input: "text",
		extendable: true,
	},
	unit: {
		default: null,
		input: "text",
		extendable: true,

	},
	widthweight: {
		default: 12,
		input: "number",
		extendable: true,
	},
	widthkind: {
		default: "relative",
		input: ["relative", "absolute", "characters", /*"[px]min,[fr]max"*/],
		extendable: true,
	},
	indexweight: {
		default: 10,
		input: "number",
		extendable: false,
	},
	textdisplay: {
		default: "default",
		input: ["default", "mono-right"],
		extendable: true,
	},
	valuetype : {
		default: "text",
		input: ["text", "number", "date"],
		extendable: true,
	},
	specialnumberformat : {
		default: "",
		input: ["", "percentage", "money"],
		extendable: true,
	},
	convertable : {
		default: "",
		input: ["", "divide", "multiply"],
		extendable: true,
	},
	filtertype: {
		default: "inherit",
		input: ["inherit", "range", "datePicker", "searchField", "dropdown", false],
		extendable: true,
	},
	filterseperation: {
		default: "spaces",
		input: ["spaces", ";", ",", "none"],
		extendable: true,
	},
	merge : {
		default: "getOne",
		input: ["add", "mergeBy", "firstDate", "getOne", "displayMulti", "count"],
		extendable: true,
	},
	updateable : {
		default: "never",
		input: ["never", "withFreeInput", "withDropdown", "auto"],
		extendable: true,
	},
	dropdownupdateoptions: {
		default: "",
		input: "text",
		extendable: true,
	},
	inrangeof: {
		default: "",
		input: "text",
		extendable: true,
	},
	allowinputfrom: {
		default: "op1, sa1",
		input: [
			"op0, sa0", "op1, sa0", "op2, sa0",
			"op0, sa1", "op1, sa1", "op2, sa1",
			"op0, sa2", "op1, sa2", "op2, sa2"],
		extendable: true,
	},
	triggers: {
		default: null,
		input: "text",
		extendable: true,
	},
	dateerroronweeks: {
		default: null,
		input: "number",
		extendable: true,
	},
	datewarnonweeks: {
		default: null,
		input: "number",
		extendable: true,
	},
	hardcoded: {
		default: null,
		input: "text",
		extendable: true,
	},






};

// export const allOptions = [...Object.keys(allOptionsWithData)];
