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

	const [tableFilter, setTableFilter] = useState({
		page: 1,
		page_size: 50,
		search: "",
		sort_field: "created_at",
		sort_order: "desc",
		status: "Active",
		year_range: [],
		department_id: "",
	});

	const { data: dataDepartments } = GET(
		`api/ref_departments`,
		"ref_departments"
	);

	const { data: dataSource, refetch: refetchSource } = GET(
		`api/books?${new URLSearchParams(tableFilter)}`,
		"books_list"
	);

	useEffect(() => {
		refetchSource();

		return () => {};
	}, [tableFilter]);

	return (
		<Row gutter={[12, 12]}>
			{location.pathname === "/thesis/books" ? (
				<Col xs={24} sm={24} md={24}>
					<Button
						className="btn-main-primary btn-main-invert-outline b-r-none"
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
					location={location}
					dataDepartments={
						dataDepartments && dataDepartments.data
							? dataDepartments.data.map((item) => ({
									value: item.id,
									label: item.department_name,
							  }))
							: []
					}
				/>
			</Col>
		</Row>
	);
}
