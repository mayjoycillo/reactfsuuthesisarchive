import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import TableProfiling from "./TableProfiling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

export default function PageProfiling() {
	const navigate = useNavigate();
	const location = useLocation();

	const [sortInfo, setSortInfo] = useState({
		order: "descend",
		columnKey: "created_at",
		// status: location.pathname === "/thesis" ? "Active" : "Deactivated",
	});

	const [tableFilter, setTableFilter] = useState({
		page: 1,
		page_size: 50,
		search: "",
		sort_field: "created_at",
		sort_order: "desc",
		status: "Active",
		from: location.pathname,
	});

	useEffect(() => {
		setTableFilter({
			page: 1,
			page_size: 50,
			search: "",
			sort_field: "created_at",
			sort_order: "desc",
			status: location.pathname === "/users" ? "Active" : "Deactivated",
			from: location.pathname,
		});

		setSortInfo({
			order: "descend",
			columnKey: "created_at",
		});

		return () => {};
	}, [location]);

	return (
		<Row gutter={[12, 12]}>
			{location.pathname === "/users/current" ? (
				<Col xs={24} sm={24} md={24}>
					<Button
						clasName="btn-main-primary btn-main-invert-outline b-r-none"
						icon={<FontAwesomeIcon icon={faPlus} />}
						onClick={() => navigate(`${location.pathname}/add`)}
						size="large"
						name="btn_add"
					>
						Add Users
					</Button>
				</Col>
			) : null}

			<Col xs={24} sm={24} md={24}>
				<TableProfiling
					// dataSource={dataSource}
					tableFilter={tableFilter}
					setTableFilter={setTableFilter}
					sortInfo={sortInfo}
					setSortInfo={setSortInfo}
					location={location}
					// refetchSource={refetchSource}
				/>
			</Col>
		</Row>
	);
}
