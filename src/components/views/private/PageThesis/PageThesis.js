import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import TableThesis from "./TableThesis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { GET } from "../../../providers/useAxiosQuery";

export default function PageThesis() {
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

	const { data: dataSource, refetch: refetchSource } = GET(
		`api/books`,
		"books_list",
		(res) => {},
		false
	);

	useEffect(() => {
		setTableFilter({
			page: 1,
			page_size: 50,
			search: "",
			sort_field: "created_at",
			sort_order: "desc",
			status: location.pathname === "/thesis" ? "Active" : "Deactivated",
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
			{location.pathname === "/thesis/books" ? (
				<Col xs={24} sm={24} md={24}>
					<Button
						clasName="btn-main-primary btn-main-invert-outline b-r-none"
						icon={<FontAwesomeIcon icon={faPlus} />}
						onClick={() => navigate(`${location.pathname}/add`)}
						size="large"
						name="btn_add"
					>
						Add Thesis Book
					</Button>
				</Col>
			) : null}

			<Col xs={24} sm={24} md={24}>
				<TableThesis
					dataSource={dataSource}
					tableFilter={tableFilter}
					setTableFilter={setTableFilter}
					sortInfo={sortInfo}
					setSortInfo={setSortInfo}
					location={location}
					refetchSource={refetchSource}
				/>
			</Col>
		</Row>
	);
}
