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

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


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
		if (process.env.ANALYZE) {
			config.plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: "server",
					analyzerPort: options.isServer ? 8888 : 8889,
					openAnalyzer: true,
				})
			);
	 }
		return config;
	}
};
