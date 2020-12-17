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
	widthweight: {
		default: 12,
		input: "number",
	},
	widthkind: {
		default: "relative",
		input: ["relative", "absolute", "characters", "[px]min,[fr]max"],
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
		input: ["text", "number"],
	},



};

export const allOptions = [...Object.keys(allOptionsWithData)];
