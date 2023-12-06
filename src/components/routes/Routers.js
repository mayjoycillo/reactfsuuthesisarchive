import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RouteList from "./RouteList";

import "../assets/scss/app.scss";

const queryClient = new QueryClient();

export default function Routers() {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.ready.then((registration) => {
				registration.update();
			});
		} else {
			console.warn("serviceWorker is unavailable");
		}

		return () => {};
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<RouteList />
			</Router>
		</QueryClientProvider>
	);
}
