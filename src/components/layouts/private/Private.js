import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClearCacheProvider, useClearCache } from "react-clear-cache";
import { Breadcrumb, Layout, Card, Button } from "antd";
import { SpinnerDotted } from "spinners-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGifts, faHome, faRefresh } from "@fortawesome/pro-regular-svg-icons";

import { GET } from "../../providers/useAxiosQuery";
import { bgColor, name, userData } from "../../providers/companyInfo";
import useCheckUserPermission from "../../providers/useCheckUserPermission";
import Sidemenu from "./Sidemenu";
import Header from "./Header";
import Footer from "./Footer";

export default function Private(props) {
	const {
		children,
		moduleName,
		moduleCode,
		title,
		subtitle,
		breadcrumb,
		pageHeaderIcon,
		pageHeaderClass,
		pageId,
		className,
	} = props;

	const { isLatestVersion, emptyCacheStorage } = useClearCache();
	// console.log("Private props", props);

	const location = useLocation();
	const navigate = useNavigate();

	const [width, setWidth] = useState(window.innerWidth);

	const [sideMenuCollapse, setSideMenuCollapse] = useState(
		window.innerWidth <= 768 ? true : false
	);

	useCheckUserPermission(moduleCode, moduleName, location);

	useEffect(() => {
		const section = document.querySelector(".private-layout");
		section.scrollIntoView({ behavior: "smooth", block: "start" });

		document.title = (moduleName ?? title).toUpperCase() + " | " + name;

		function handleResize() {
			setWidth(window.innerWidth);

			if (window.innerWidth === 768) {
				setSideMenuCollapse(true);
			}
			if (window.innerWidth > 768) {
				setSideMenuCollapse(false);
			}
		}
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [title, moduleName]);

	const { data: dataUserProfileInfo } = GET(
		`api/user_profile_info`,
		"user_profile_info",
		(res) => {},
		false
	);

	const { data: dataPermissions, refetch: refetchPermissions } = GET(
		`api/user_permission/${userData().id}`,
		"check_user_permission_sidemenu",
		(res) => {},
		false
	);

	useEffect(() => {
		refetchPermissions();

		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ClearCacheProvider>
			{!isLatestVersion && (
				<div className="notification-notice">
					<div className="notification-notice-content">
						<div className="notification-notice-icon">
							<FontAwesomeIcon icon={faGifts} />
						</div>
						<div className="notification-notice-message">
							<div className="title">Updates Now Available</div>
							<div className="description">
								A new version of this Web App is ready
							</div>
							<div className="action">
								<Button
									onClick={(e) => {
										e.preventDefault();
										emptyCacheStorage();
									}}
									icon={<FontAwesomeIcon icon={faRefresh} />}
								>
									Refresh
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="globalLoading hide">
				<SpinnerDotted thickness="100" color={bgColor} enabled={true} />
			</div>

			<Layout
				hasSider
				className={`private-layout ${className ?? ""}`}
				id={pageId ?? ""}
			>
				<Sidemenu
					location={location}
					sideMenuCollapse={sideMenuCollapse}
					setSideMenuCollapse={setSideMenuCollapse}
					width={width}
					dataPermissions={
						dataPermissions && dataPermissions.data ? dataPermissions.data : []
					}
				/>

				<Layout className={sideMenuCollapse ? "ant-layout-has-collapse" : ""}>
					<Header
						sideMenuCollapse={sideMenuCollapse}
						setSideMenuCollapse={setSideMenuCollapse}
						width={width}
						pageHeaderClass={pageHeaderClass}
						pageHeaderIcon={pageHeaderIcon}
						title={title}
						subtitle={subtitle}
						dataUserProfileInfo={
							dataUserProfileInfo && dataUserProfileInfo.data
						}
					/>

					<Layout.Content
						onClick={() => {
							if (width <= 767) {
								setSideMenuCollapse(true);
							}
						}}
					>
						<Breadcrumb
							separator={<span className="arrow" />}
							items={[
								{
									title: (
										<Link to="/">
											<FontAwesomeIcon icon={faHome} />
										</Link>
									),
								},
								...(breadcrumb && breadcrumb.length > 0
									? breadcrumb.map((item, index) => {
											let colorRed = "";
											if (breadcrumb.length > 1) {
												if (breadcrumb.length === index + 1) {
													colorRed = "breadcrumb-item-last";
												}
											}
											return {
												title: item.name,
												className: `cursor-pointer font-14px breadcrumb-item-text ${colorRed} ${
													item.className ? ` ${item.className}` : ""
												}`,
												id: item.id ?? "",
												onClick: () => {
													if (item.link) {
														navigate(item.link);
													}
												},
											};
									  })
									: []),
							]}
						/>

						<Card>{children}</Card>
					</Layout.Content>

					<Footer />
				</Layout>
			</Layout>
		</ClearCacheProvider>
	);
}
