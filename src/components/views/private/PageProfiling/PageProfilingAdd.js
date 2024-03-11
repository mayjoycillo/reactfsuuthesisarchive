import { useParams } from "react-router-dom";
import {
	Card,
	Col,
	Row,
	Button,
	Form,
	Typography,
	notification,
	Avatar,
} from "antd";
import React, { Component, useState } from "react";

import FloatInput from "../../../providers/FloatInput";
import FloatSelect from "../../../providers/FloatSelect";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import FloatInputMask from "../../../providers/FloatInputMask";
import notificationErrors from "../../../providers/notificationErrors";
import validateRules from "../../../providers/validateRules";

import optionGender from "../../../providers/optionGender";
import optionLanguage from "../../../providers/optionLanguage";
import nationalities from "../../../providers/nationalities";

import { DELETE, GET, POST } from "../../../providers/useAxiosQuery";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function PageProfiling() {
	const params = useParams();
	const [src] = useState("");

	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	const [form] = Form.useForm();

	const { data: roles } = GET(`api/user_roles`, "user_role");

	console.log("roles:", roles);

	const { mutate: mutateProfileCreate, loading: loadingProfile } = POST(
		`api/profile`,
		"profile_list",
		(res) => {},
		false
	);

	const onFinish = async (values) => {
		let data = new FormData();

		console.log("data", data);

		// let data = { ...values };
		data.append("id", params.id ? params.id : "");
		data.append("username", values.username);
		data.append("email", values.emailaddress);

		if (!params.id) {
			data.append("password", values.password);
		}

		data.append("fullname", values.fullname);
		data.append("school_id", values.school_id);

		mutateProfileCreate(data, {
			onSuccess: (res) => {
				if (res.success) {
					notification.success({
						message: "Profiling",
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
			<Form form={form} onFinish={onFinish}>
				<Row gutter={[12, 12]}>
					<Col xs={24} sm={24} md={24} lg={24}>
						<div
							style={{
								background: "gray",
								padding: "5px 10px",
								borderTopLeftRadius: "20px",
								borderTopRightRadius: "20px",
							}}
						>
							<Title level={5}>Users Information</Title>
						</div>
						<Card>
							<Row gutter={[12, 12]}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<label
										htmlFor="photo-upload"
										className="custom-file-upload fas"
									>
										<div className="img-wrap img-upload">
											<Avatar
												shape="square"
												size={120}
												icon={<UserOutlined />}
											/>
										</div>
										<input id="photo-upload" type="file" onChange={onChange} />
									</label>
								</Col>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item name="username">
										<FloatInput
											label="Username"
											placeholder="Username"
											onChange={onChange}
										/>
									</Form.Item>

									<Form.Item name="password">
										<FloatInput
											label="Password"
											placeholder="Password"
											onChange={onChange}
										/>
									</Form.Item>

									<Form.Item
										name="email"
										rules={[validateRules.email]}
										style={{ marginBottom: 0 }}
									>
										<FloatInput
											label="Email Address"
											placeholder="Email Address"
										/>
									</Form.Item>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
				<div
					style={{
						background: "gray",
						padding: "3px 8px",
						borderTopLeftRadius: "20px",
						borderTopRightRadius: "20px",
					}}
				>
					<Title level={5}>Users Information</Title>
				</div>
				<Card>
					<Row gutter={[12, 12]}>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="firstname" style={{ marginBottom: 0 }}>
								<FloatInput
									label="Firstname"
									placeholder="Firstname"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="middlename" style={{ marginBottom: 0 }}>
								<FloatInput
									label="Middlename"
									placeholder="Middlename"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="lastname" style={{ marginBottom: 0 }}>
								<FloatInput
									label="Lastname"
									placeholder="Lastname"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="suffix" style={{ marginBottom: 0 }}>
								<FloatInput
									label="Suffix"
									placeholder="Suffix"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="contact" style={{ marginBottom: 0 }}>
								<FloatInput
									label="Contact Number"
									placeholder="Contact Number"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="course" style={{ marginBottom: 0 }}>
								<FloatInput
									label="Course"
									placeholder="Course"
									onChange={onChange}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="graduationyear">
								<FloatDatePicker
									label="Year Graduated"
									placeholder="Year Graduated"
									onChange={onChange}
									format="YYYY"
									picker="year"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={6}>
							<Form.Item name="role" style={{ marginBottom: 0 }}>
								<FloatSelect
									label="Role"
									placeholder="Role"
									options={
										roles
											? roles.data.map((item) => ({
													value: item.id,
													label: item.role,
											  }))
											: []
									}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Button htmlType="submit" className="btn-main-primary w-10 w-xs-100">
						Submit
					</Button>
				</Card>
			</Form>
		</>
	);
}
