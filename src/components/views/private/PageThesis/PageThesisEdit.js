import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row, Typography, notification } from "antd";

import ThesisFormAuthor from "./PageThesisFormComponents/ThesisFormAuthor";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import FloatSelect from "../../../providers/FloatSelect";
import { GET, POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";
import optionType from "../../../providers/optionType";

import ModalAttachment from "./components/ModalAttachment";

export default function PageThesisAdd() {
	const location = useLocation();
	const params = useParams();
	const [form] = Form.useForm();

	const [toggleModalAttachment, SetToggleModalAttachment] = useState({
		open: false,
		data: null,
	});
	console.log("toggleModalAttachment:", toggleModalAttachment);

	const { data: dataBooks } = GET(`api/books`, "books_list");
	console.log("dataBooks", dataBooks);

	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	const { data: department } = GET(`api/ref_departments`, "ref_departments");
	console.log("department: ", department);

	const { mutate: mutatethesis, loading: loadingthesis } = POST(
		`api/books`,
		"books"
	);

	const onFinish = async (values) => {
		let pathname = location.pathname.split("/");
		let data = new FormData();

		// data.append("id", params.id ? params.id : "");

		// Add Account Information
		data.append("department_id", values.department_id);
		data.append("bookname", values.bookname);
		data.append("datepublish", values.datepublish);
		data.append("type", values.type);
		data.append("university", values.university);
		data.append("attachment_id", values.attachment_id);

		// Notification
		mutatethesis(data, {
			onSuccess: (res) => {
				if (res.success) {
					notification.success({
						message: "Thesis Book Information",
						description: res.message,
					});
				}
			},
			onError: (err) => {
				notificationErrors(err);
			},
		});
	};

	return (
		<>
			<div
				style={{
					background: "gray",
					padding: "5px 10px",
					borderTopLeftRadius: "20px",
					borderTopRightRadius: "20px",
				}}
			>
				<Typography.Title level={5}>Thesis Book Information</Typography.Title>
			</div>
			<Card>
				<Form onFinish={onFinish} form={form}>
					<Row gutter={(12, 12)}>
						<Col xs={24} sm={24} md={24} lg={18}>
							<Form.Item name="department_id">
								<FloatSelect
									label="Department"
									placeholder="Department"
									options={
										department
											? department.data.map((item) => ({
													value: item.id,
													label: item.department_name,
											  }))
											: []
									}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={(12, 12)}>
						<Col xs={24} sm={24} md={24} lg={18}>
							<Form.Item name="bookname">
								<FloatInput
									label="Thesis Title"
									placeholder="Thesis Title"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>

				<Col xs={24} sm={24} md={24} lg={24}>
					<ThesisFormAuthor />
				</Col>

				<Form onFinish={onFinish} form={form}>
					<Row gutter={(12, 12)}>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="datepublish">
								<FloatDatePicker
									label="Year Published"
									placeholder="Year Published"
									onChange={onChange}
									format="YYYY-MM"
									picker="month"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="type">
								<FloatSelect
									label="Type of Text"
									placeholder="Type of Text"
									options={optionType}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12}>
							<Form.Item name="university">
								<FloatInput
									label="University"
									placeholder="University"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={(12, 12)}>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="attachment_id">
								<Button
									onClick={() => {
										SetToggleModalAttachment({ open: true });
									}}
								>
									Click to Upload Publishable Paper
								</Button>
							</Form.Item>
						</Col>
					</Row>

					<Button htmlType="submit" className="btn-main-primary w-10 w-xs-100">
						Submit
					</Button>

					<ModalAttachment
						toggleModalAttachment={toggleModalAttachment}
						SetToggleModalAttachment={SetToggleModalAttachment}
					/>
				</Form>
			</Card>
		</>
	);
}
