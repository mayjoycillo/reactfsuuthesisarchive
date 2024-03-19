import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	Button,
	Card,
	Col,
	Form,
	Row,
	Typography,
	Upload,
	message,
	notification,
} from "antd";

import ThesisFormAuthor from "./PageThesisFormComponents/ThesisFormAuthor";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import FloatSelect from "../../../providers/FloatSelect";
import { GET, POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";
import optionType from "../../../providers/optionType";

import ModalAttachment from "./components/ModalAttachment";

import { InboxOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/pro-regular-svg-icons";
import dayjs from "dayjs";

const { Title } = Typography;

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

	const propsUpload = {
		accept: "application/pdf",
		beforeUpload: (file) => {
			return false;
		},
	};

	const onFinish = (values) => {
		console.log("onFinish values", values);
		let data = new FormData();

		// data.append("id", params.id ? params.id : "");

		// Add Book Information
		data.append("department_id", values.department_id);
		data.append("bookname", values.bookname);
		if (values.datepublish) {
			if (dayjs(values.datepublish).isValid()) {
				data.append(
					"datepublish",
					dayjs(values.datepublish).format("YYYY-MM-DD")
				);
			} else {
				data.append("datepublish", values.datepublish);
			}
		} else {
			data.append("datepublish", "");
		}
		data.append("type", values.type);
		data.append("university", values.university);

		if (values.pdf_file && values.pdf_file.file) {
			data.append("pdf_file", values.pdf_file.file, values.pdf_file.file.name);
		}

		// add author information

		let author_list = values.author_list;
		author_list.forEach((author, index) => {
			data.append(`author_list[${index}][firstname]`, author.firstname);
			data.append(`author_list[${index}][middlename]`, author.middlename);
			data.append(`author_list[${index}][lastname]`, author.lastname);
			data.append(`author_list[${index}][suffix]`, author.suffix);
			data.append(`author_list[${index}][email]`, author.email);
			data.append(`author_list[${index}][role]`, author.role);
			data.append(`author_list[${index}][course]`, author.course);
			data.append(
				`author_list[${index}][school_id]`,
				parseInt(author.school_id)
			);
			data.append(`author_list[${index}][contact]`, author.contact);
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
				} else {
					notification.error({
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
			<Form
				onFinish={onFinish}
				form={form}
				initialValues={{ author_list: [{}] }}
			>
				<div
					style={{
						background: "gray",
						padding: "3px 8px",
						borderTopLeftRadius: "20px",
						borderTopRightRadius: "20px",
					}}
				>
					<Title level={5}>Thesis Book Information</Title>
				</div>
				<Card>
					<Row gutter={(12, 12)}>
						<Col xs={24} sm={24} md={24} lg={18}>
							<Form.Item name="department_id">
								<FloatSelect
									label="Department"
									placeholder="Department"
									required
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
									required
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={(12, 12)}>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="datepublish">
								<FloatDatePicker
									label="Year Published"
									placeholder="Year Published"
									required
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
									required
									options={optionType}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12}>
							<Form.Item name="university">
								<FloatInput
									label="University"
									placeholder="University"
									required
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={(12, 12)}>
						<Col xs={24} sm={24} md={24} lg={24}>
							<ThesisFormAuthor />
						</Col>
					</Row>

					<Row gutter={(12, 12)} style={{ marginTop: "20px" }}>
						<Col xs={24} sm={24} md={24} lg={24}>
							<Form.Item name="pdf_file" valuePropName="filelist">
								<Upload {...propsUpload}>
									<Button
										icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
									>
										Upload File PDF
									</Button>
								</Upload>
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
				</Card>
			</Form>
		</>
	);
}
