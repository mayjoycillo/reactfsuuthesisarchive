import { Routes, Route } from "react-router-dom";
import {
	faBook,
	faHome,
	faUser,
	faUsers,
} from "@fortawesome/pro-regular-svg-icons";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Page404 from "../views/errors/Page404";

import PageLogin from "../views/public/PageLogin/PageLogin";

import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageEditProfile from "../views/private/PageEditProfile/PageEditProfile";
import PageProfiling from "../views/private/PageProfiling/PageProfiling";
import PageProfilingAdd from "../views/private/PageProfiling/PageProfilingAdd";
import PageThesis from "../views/private/PageThesis/PageThesis";
import PageThesisAdd from "../views/private/PageThesis/PageThesisAdd";
import PageThesisEdit from "../views/private/PageThesis/PageThesisEdit";

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
								name: "Books",
								link: "/thesis/books",
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

			<Route
				path="/thesis/books"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Thesis"
						title="Thesis"
						subtitle="ADMIN"
						pageId="PageThesis"
						pageHeaderIcon={faUsers}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},

							{
								name: "Books",
							},
						]}
						component={PageThesis}
					/>
				}
			/>

			<Route
				path="/thesis/books/add"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Thesis"
						title="Thesis"
						subtitle="ADMIN"
						pageId="PageThesis"
						pageHeaderIcon={faBook}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},
							{
								name: "Books",
								link: "/thesis/books",
							},
							{
								name: "Add",
							},
						]}
						component={PageThesisAdd}
					/>
				}
			/>

			<Route
				path="/thesis/books/edit/:id"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Thesis"
						title="Thesis"
						subtitle="ADMIN"
						pageId="PageThesis"
						pageHeaderIcon={faBook}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},
							{
								name: "Books",
								link: "/thesis/books",
							},
							{
								name: "Edit",
							},
						]}
						component={PageThesisEdit}
					/>
				}
			/>

			<Route
				path="/thesis/archived"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Thesis"
						title="Thesis"
						subtitle="ADMIN"
						pageId="PageThesis"
						pageHeaderIcon={faBook}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},
							{
								name: "Books",
								link: "/thesis/books",
							},
							{
								name: "Archived",
							},
						]}
						component={PageThesis}
					/>
				}
			/>

			<Route
				path="/users/current"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Profiling"
						title="Profiling"
						subtitle="ADMIN"
						pageId="PageProfiling"
						pageHeaderIcon={faUsers}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},
							{
								name: "Books",
								link: "/thesis/books",
							},
							{
								name: "Archived",
								link: "/thesis/archived",
							},
							{
								name: "Users",
							},
						]}
						component={PageProfiling}
					/>
				}
			/>

			<Route
				path="/users/current/add"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Users"
						title="Users"
						subtitle="ADMIN"
						pageId="PageProfiling"
						pageHeaderIcon={faUsers}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},
							{
								name: "Books",
								link: "/thesis/books",
							},
							{
								name: "Archived",
								link: "/thesis/archived",
							},
							{
								name: "Current",
								link: "/users/current",
							},
							{
								name: "Add",
							},
						]}
						component={PageProfilingAdd}
					/>
				}
			/>

			<Route
				path="/users/current/edit-profile/:id"
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
								name: "Books",
								link: "/thesis/books",
							},
							{
								name: "Archived",
								link: "/thesis/archived",
							},
							{
								name: "Current",
								link: "/users/current",
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
				path="/users/archived"
				element={
					<PrivateRoute
						moduleCode="M-01"
						moduleName="Users"
						title="Users"
						subtitle="ADMIN"
						pageId="PageProfiling"
						pageHeaderIcon={faUsers}
						breadcrumb={[
							{
								name: "Dashboard",
								link: "/dashboard",
							},
							{
								name: "Books",
								link: "/thesis/books",
							},
							{
								name: "Archived",
								link: "/thesis/archived",
							},
							{
								name: "Current",
								link: "/users/current",
							},
							{
								name: "Archived",
							},
						]}
						component={PageProfiling}
					/>
				}
			/>

			<Route path="/404" element={<Page404 />} />
			<Route path="/*" element={<Page404 />} />
		</Routes>
	);
}
