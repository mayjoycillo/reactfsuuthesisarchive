import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row, Upload, message, notification } from "antd";

import ThesisFormAuthor from "./PageThesisFormComponents/ThesisFormAuthor";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import FloatSelect from "../../../providers/FloatSelect";
import { GET, POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";
import optionType from "../../../providers/optionType";

import ModalAttachment from "./components/ModalAttachment";

import { InboxOutlined } from "@ant-design/icons";

export default function PageThesisAdd() {
	const location = useLocation();
	const params = useParams();
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const { Dragger } = Upload;

	const [toggleModalAttachment, SetToggleModalAttachment] = useState({
		open: false,
		data: null,
	});

	const { data: dataBooks } = GET(`api/books`, "books_list");

	const { data: department } = GET(`api/ref_departments`, "ref_departments");

	const { mutate: mutatethesis, loading: loadingthesis } = POST(
		`api/books`,
		"books"
	);

	const props = {
		name: "file",
		multiple: true,
		action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

	const onFinish = async (values) => {
		let pathname = location.pathname.split("/");
		let data = new FormData();

		// data.append("id", params.id ? params.id : "");

		// Add Book Information
		data.append("department_id", values.department_id);
		data.append("bookname", values.bookname);
		data.append("datepublish", values.datepublish);
		data.append("type", values.type);
		data.append("university", values.university);
		// data.append("attachment_id", values.attachment_id);

		// add author information

		let author_list = values.author_list;
		author_list.forEach((author, index) => {
			data.append(`author_list[${index}][firstname]`, author.firstname);
			data.append(`author_list[${index}][middlename]`, author.middlename);
			data.append(`author_list[${index}][lastname]`, author.lastname);
			data.append(`author_list[${index}][suffix]`, author.suffix);
			data.append(`author_list[${index}][role]`, author.role);
		});

		// Notification
		mutatethesis(data, {
			onSuccess: (res) => {
				console.log("res", res);
				if (res.success) {
					notification.success({
						message: "Thesis Book Information",
						description: res.message,
					});

					// navigate(`/thesis/books/edit/${dataBooks.id}`);
				}
			},
			onError: (err) => {
				notificationErrors(err);
			},
		});
	};

	return (
		<>
			<Form
				onFinish={onFinish}
				form={form}
				initialValues={{ author_list: [{}] }}
			>
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
							<FloatInput label="Thesis Title" placeholder="Thesis Title" />
						</Form.Item>
					</Col>
				</Row>

				<Col xs={24} sm={24} md={24} lg={24}>
					<ThesisFormAuthor />
				</Col>

				<Row gutter={(12, 12)}>
					<Col xs={24} sm={24} md={24} lg={6}>
						<Form.Item name="datepublish">
							<FloatDatePicker
								label="Year Published"
								placeholder="Year Published"
								format="MM-YYYY"
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
							<FloatInput label="University" placeholder="University" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={(12, 12)}>
					<Col xs={24} sm={24} md={24} lg={24}>
						<Form.Item name="attachment_id">
							<Dragger {...props}>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">
									Click or drag a <b> PDF file</b> to this area to upload
								</p>
								<p className="ant-upload-hint">
									Support for a single or bulk upload. Strictly prohibited from
									uploading company data or other banned files.
								</p>
							</Dragger>
						</Form.Item>
					</Col>
				</Row>

				<ModalAttachment
					toggleModalAttachment={toggleModalAttachment}
					SetToggleModalAttachment={SetToggleModalAttachment}
				/>

				<Button htmlType="submit" className="btn-main-primary w-10 w-xs-100">
					Submit
				</Button>
			</Form>
		</>
	);
}
