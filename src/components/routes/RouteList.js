import { Routes, Route } from "react-router-dom";
import { faHome, faUsers } from "@fortawesome/pro-regular-svg-icons";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Page404 from "../views/errors/Page404";

import PageLogin from "../views/public/PageLogin/PageLogin";

import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageEditProfile from "../views/private/PageEditProfile/PageEditProfile";

export default function RouteList() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute title="LOGIN" pageId="PageLogin" component={PageLogin} />
				}
			/>

			<Route
				path="/edit-profile"
				element={
					<PrivateRoute
						moduleName="Edit Profile"
						title="User"
						subtitle="VIEW / EDIT"
						pageId="PageUserProfile"
						pageHeaderIcon={faUsers}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},
							{
								name: "Edit Profile",
							},
						]}
						component={PageEditProfile}
					/>
				}
			/>

			<Route
				path="/dashboard"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Dashboard"
						title="Dashboard"
						subtitle="ADMIN"
						pageId="PageDashboard"
						pageHeaderIcon={faHome}
						breadcrumb={[
							{
								name: "Dashboard",
							},
						]}
						component={PageDashboard}
					/>
				}
			/>

			<Route path="/404" element={<Page404 />} />
			<Route path="/*" element={<Page404 />} />
		</Routes>
	);
}
