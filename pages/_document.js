import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
					<style jsx>{`
            height: 100vh;
          `}
					</style>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
