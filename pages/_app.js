import "../styles/globals.css";
import React, {createContext} from "react";

export const SchemaContext = createContext(10);

function MyApp({ Component, pageProps }) {
	return (
		<SchemaContext.Provider value={10}>
			<Component {...pageProps} />
		</SchemaContext.Provider>
	);
}

export default MyApp;
