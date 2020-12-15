export const allOptionsWithData = {
	title: {
		default: null,
		input: "text",
	},
	display: {
		default: null,
		input: [null, "compact", "expanded", "hidden"],
	},
	widthweight: {
		default: 12,
		input: "number",
	},
	indexweight: {
		default: 10,
		input: "number",
	},
	hovername: {
		default: null,
		input: "text",

	}


};

export const allOptions = [...Object.keys(allOptionsWithData)];
