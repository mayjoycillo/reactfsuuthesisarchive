import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button, Col, Table, notification, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/pro-regular-svg-icons";

import { GET } from "../../../providers/useAxiosQuery";
import {
	TableGlobalSearch,
	TablePageSize,
	TablePagination,
	TableShowingEntries,
} from "../../../providers/CustomTableFilter";
import ModalAttachmentPreview from "./components/ModalAttachmentPreview";

export default function TableThesis(props) {
	const { dataSource, tableFilter, setTableFilter, location } = props;

	const [toggleModalPreviewPdf, setToggleModalPreviewPdf] = useState({
		open: false,
		data: null,
	});

	const navigate = useNavigate();

	const onChangeTable = (pagination, filters, sorter) => {
		setTableFilter((prevState) => ({
			...prevState,
			sort_field: sorter.columnKey,
			sort_order: sorter.order ? sorter.order.replace("end", "") : null,
			page: 1,
			page_size: "50",
		}));
	};

	return (
		<>
			<Row gutter={[12, 12]}>
				<Col xs={24} sm={24} md={24}>
					<div className="tbl-top-filter">
						<TablePageSize
							tableFilter={tableFilter}
							setTableFilter={setTableFilter}
						/>
						<TableGlobalSearch
							tableFilter={tableFilter}
							setTableFilter={setTableFilter}
						/>
					</div>
				</Col>

				<Col xs={24} sm={24} md={24}>
					<Table
						className="ant-table-default ant-table-striped"
						dataSource={dataSource && dataSource.data.data}
						rowKey={(record) => record.id}
						pagination={false}
						bordered={false}
						onChange={onChangeTable}
						scroll={{ x: "max-content" }}
					>
						<Table.Column
							title="Action"
							key="action"
							dataIndex="action"
							align="center"
							width={150}
							render={(text, record) => {
								console.log("record: ", record);

								return (
									<>
										<Button
											type="link"
											className="color-1"
											onClick={() =>
												navigate(`${location.pathname}/edit/${record.id}`)
											}
										>
											<FontAwesomeIcon icon={faPencil} />
										</Button>
										<Popconfirm
											title="Are you sure to deactivate this data?"
											onConfirm={() => {
												// handleDelete(record);
											}}
											onCancel={() => {
												notification.error({
													message: "Thesis Title Deactivate",
													description: "Thesis Title was not deactivated",
												});
											}}
											okText="Yes"
											cancelText="No"
										>
											<Button
												type="link"
												className="text-danger"
												// loading={loadingDeleteEntranceExam}
											>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
										</Popconfirm>
									</>
								);
							}}
						/>

						<Table.Column
							title="Department"
							key="department_id"
							dataIndex="department_id"
							render={(text, record) => {
								console.log("record: ", record);
								return <>{record.department_name}</>;
							}}
						/>
						<Table.Column
							title="Thesis Title"
							key="bookname"
							dataIndex="bookname"
						/>

						<Table.Column
							title="Authors"
							key="profile_id"
							dataIndex="profile_id"
							render={(text, record) => {
								console.log("record: ", record);
								return record.authors.map((item) => {
									return (
										<div>{`${item.profile.firstname} ${item.profile.lastname}`}</div>
									);
								});
							}}
						/>

						<Table.Column
							title="Year Published"
							key="datepublish"
							dataIndex="datepublish"
						/>
						<Table.Column title="Type of Text" key="type" dataIndex="type" />
						<Table.Column
							title="Publishable Paper"
							key="pdf_file"
							render={(_, record) => {
								let attachment = null;

								if (record.attachments && record.attachments.length > 0) {
									attachment = record.attachments[0];
								}

								return (
									<Button
										type="link"
										className="color-1"
										onClick={() =>
											setToggleModalPreviewPdf({
												open: true,
												data: attachment,
											})
										}
									>
										<FontAwesomeIcon icon={faEye} />
									</Button>
								);
							}}
						/>
					</Table>
				</Col>

				<Col xs={24} sm={24} md={24}>
					<div className="tbl-bottom-filter">
						<TableShowingEntries />
						<TablePagination
							tableFilter={tableFilter}
							setTableFilter={setTableFilter}
							// setPaginationTotal={dataSource?.data.total}
							showLessItems={true}
							showSizeChanger={false}
							tblIdWrapper="tbl_wrapper"
						/>
					</div>
				</Col>
			</Row>

			<ModalAttachmentPreview
				toggleModalPreviewPdf={toggleModalPreviewPdf}
				setToggleModalPreviewPdf={setToggleModalPreviewPdf}
			/>
		</>
	);
}
