// module.exports = {
// 	future: {
// 		webpack5: true
// 	}
// };
// const WorkerPlugin = require("worker-plugin");
//
// module.exports = {
// 	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
// 		console.log({config});
// 		if (!isServer) {
// 			config.plugins.push(
// 				new WorkerPlugin({
// 					// use "self" as the global object when receiving hot updates.
// 					globalObject: "self",
// 				})
// 			);
// 		}
// 		return config;
// 	},
// };

// const withWorkers = require("@zeit/next-workers");
// module.exports = withWorkers();


// next.config.js
module.exports = {
	webpack(config, options) {
		config.module.rules.push({
			test: /\.worker\.js$/,
			use: [
				{ loader: "worker-loader",
					options: {
						filename: "static/[hash].worker.js",
						publicPath: "/_next/",
					}
				}]
		});
		return config;
	}
};
