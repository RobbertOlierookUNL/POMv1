const denim_blue = {color: "#005eef", text: "white"};
const sky_blue = {color: "#00b2ff", text: "white"};
const bottle_green = {color: "#00b190", text: "white"};
const jade_green = {color: "#00d7c4", text: "white"};
const orchid_purple = {color: "#9c44c0", text: "white"};
const mauve_purple = {color: "#cf98d9", text: "white"};
const candy_pink = {color: "#ff79c6", text: "white"};
const ballet_pink = {color: "#fca6de", text: "white"};
const sunset_red = {color: "#ff544f", text: "white"};
const coral_red = {color: "#ff7c7d", text: "white"};
const turmeric_yellow = {color: "#ffc000", text: "white"};
const canary_yellow = {color: "#ffe300", text: "#1F36C7"};


const schematics = [
	{	secondary: canary_yellow,
		tertiary: denim_blue,
		quadiary: bottle_green,
	},
	{	secondary: ballet_pink,
		tertiary: denim_blue,
		quadiary: bottle_green,
	},
	{	secondary: candy_pink,
		tertiary: jade_green,
		quadiary: denim_blue,
		//theoldswitcheroo
	},
	{	secondary: orchid_purple,
		tertiary: jade_green,
		quadiary: sky_blue,
	},
	{	secondary: canary_yellow,
		tertiary: orchid_purple,
		quadiary: sky_blue,
	},
	{	secondary: coral_red,
		tertiary: orchid_purple,
		quadiary: jade_green,
	},
	{	secondary: turmeric_yellow,
		tertiary: candy_pink,
		quadiary: denim_blue,
		//theoldswitcheroo
	},
	{	secondary: orchid_purple,
		tertiary: candy_pink,
		quadiary: bottle_green,
	},
	{	secondary: ballet_pink,
		tertiary: sunset_red,
		quadiary: sky_blue,
	},
	{	secondary: turmeric_yellow,
		tertiary: sunset_red,
		quadiary: denim_blue,
	},
	{	secondary: jade_green,
		tertiary: canary_yellow,
		quadiary: mauve_purple,
	},
	{	secondary: ballet_pink,
		tertiary: canary_yellow,
		quadiary: denim_blue,
	},

];
export const colorSchematic = (schema) => ({
	...schematics[schema],
});

export const staticColors =
{
	primary: {color: "#1F36C7",text: "white"},
	primary_overlay: {color: "rgba(31, 54, 199, 0.05)",text: "black"},
	primary_very_light: {color: "rgb(209,213,236)", text: "black"},
	primary_light: {color: "#005eef", text: "white"},
	primary_dark: {color: "#001f82", text: "white"},
	gray: {color: "#9e9e9e", text: "black"},
	gray_light: {color: "#cfcfcf", text: "black"},
	gray_lighter: {color:" #ececec", text: "black"},
	gray_very_light: {color: "#f2f2f2", text: "black"},
	gray_dark: {color: "#707070", text: "white"},
};
