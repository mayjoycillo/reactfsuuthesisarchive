import { useParams } from "react-router-dom";
import { Card, Col, Row, Button, Form, Typography, notification } from "antd";
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

const { Title } = Typography;

export default function PageProfiling() {
	const params = useParams();

	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	const [form] = Form.useForm();

	const { data: dataReligion } = GET(`api/ref_religion`, "ref_religion");

	const { data: dataNationality } = GET(
		`api/ref_nationality`,
		"ref_nationality"
	);

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

		data.append("firstname", values.firstname);
		data.append("middlename", values.middlename);
		data.append("lastname", values.lastname);
		data.append("extensionname", values.extensionname);
		data.append("placeofbirth", values.placeofbirth);
		data.append("dateofbirth", values.dateofbirth);
		data.append("gender", values.gender);
		data.append("address", values.address);
		data.append("religion", values.religion);
		if (values.national_id) {
			data.append("nationality", values.nationality);
		}
		data.append("contact", values.contact);

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
				<Title level={5}>Users Account</Title>
				<Row gutter={(12, 12)}>
					<Col xs={24} sm={24} md={25} lg={12}>
						<Form.Item name="fullname">
							<FloatInput
								label="Fullname"
								placeholder="Fullname"
								onChange={onChange}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={(12, 12)}>
					<Col xs={24} sm={24} md={25} lg={12}>
						<Form.Item name="schoolid">
							<FloatInput
								label="School ID"
								placeholder="School ID"
								onChange={onChange}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={(12, 12)}>
					<Col xs={24} sm={24} md={25} lg={12}>
						<Form.Item name="username">
							<FloatInput
								label="Username"
								placeholder="Username"
								onChange={onChange}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={(12, 12)}>
					<Col xs={24} sm={24} md={25} lg={12}>
						<Form.Item name="email" rules={[validateRules.email]}>
							<FloatInput label="Email Address" placeholder="Email Address" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={(12, 12)}>
					<Col xs={24} sm={24} md={25} lg={12}>
						<Form.Item name="password">
							<FloatInput
								label="Password"
								placeholder="Password"
								onChange={onChange}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</>
	);
}
