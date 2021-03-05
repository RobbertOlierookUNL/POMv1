module.exports = {
	apps : [{
		name        : "POM4",
		script      : "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js",
		args        : "start",
		watch       : false,
		ignore_watch : ["node_modules", ".next"],
		watch_options : {
			persistent    : false,
			ignoreInitial : true
		}
	}]
};
