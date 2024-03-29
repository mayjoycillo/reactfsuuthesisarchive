/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
	// Return false to exempt requests from being fulfilled by index.html.
	({ request, url }) => {
		// If this isn't a navigation, skip.
		if (request.mode !== "navigate") {
			return false;
		} // If this is a URL that starts with /_, skip.

		if (url.pathname.startsWith("/_")) {
			return false;
		} // If this looks like a URL for a resource, because it contains // a file extension, skip.

		if (url.pathname.match(fileExtensionRegexp)) {
			return false;
		} // Return true to signal that we want to use the handler.

		return true;
	},
	createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
	// Add in any other file extensions or routing criteria as needed.
	({ url }) =>
		url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
	new StaleWhileRevalidate({
		cacheName: "images",
		plugins: [
			// Ensure that once this runtime cache reaches a maximum size the
			// least-recently used images are removed.
			new ExpirationPlugin({ maxEntries: 50 }),
		],
	})
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("push", (event) => {
	console.log("push_notif", event.data.text());
	let json = event.data.text();
	let push_data = JSON.parse(json);

	var options = {
		body: push_data.description,
		icon: push_data.notif_image,
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: "2",
			url: push_data.site_url,
		},
		// actions: [
		//     {
		//         action: "explore",
		//         title: "Explore this new world",
		//         icon: "images/checkmark.png",
		//     },
		//     { action: "close", title: "Close" },
		// ],
	};
	// console.log(options);
	event.waitUntil(self.registration.showNotification(push_data.title, options));
});
self.addEventListener("notificationclick", (e) => {
	// Close the notification popout
	e.notification.close();
	// Get all the Window clients
	e.waitUntil(
		self.clients.matchAll({ type: "window" }).then((clientsArr) => {
			// If a Window tab matching the targeted URL already exists, focus that;
			const hadWindowToFocus = clientsArr.some((windowClient) =>
				windowClient.url === e.notification.data.url
					? (windowClient.focus(), true)
					: false
			);
			// Otherwise, open a new tab to the applicable URL and focus it.
			if (!hadWindowToFocus)
				self.clients
					.openWindow(e.notification.data.url)
					.then((windowClient) => (windowClient ? windowClient.focus() : null));
		})
	);
});
// Any other custom service worker logic can go here.
