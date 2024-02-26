import React, { useState } from "react";
import { Card, Col, Row, Radio, Button } from "antd";
import { Typography } from "antd";
import FloatInput from "../../../providers/FloatInput";
import optionLanguage from "../../../providers/optionLanguage";
import FloatSelect from "../../../providers/FloatSelect";

const { Title } = Typography;

export default function PageDashboard() {
	const [value, setValue] = useState(1);
	const onChange = (e) => {
		console.log("radio checked", e.target.value);
		setValue(e.target.value);
	};

	return (
		<>
			<Row gutter={[12, 12]}>
				<Col xs={24} sm={24} md={12} lg={12}>
					<Title level={5}>Basic Information</Title>
					<Card>
						<FloatInput
							label="Fullname"
							placeholder="Fullname"
							// onChange={onChange}
						/>
						<FloatInput
							label="Email"
							placeholder="Email Address"
							// onChange={onChange}
						/>
						<FloatInput
							label="Pronouns"
							placeholder="Pronouns"
							// onChange={onChange}
						/>
						<FloatInput
							label="Student ID"
							placeholder="Student ID"
							// onChange={onChange}
						/>
						<FloatInput
							label="Password"
							placeholder="Password"
							// onChange={onChange}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12}>
					<Title level={5}>System Settings</Title>
					<Card>
						<FloatSelect
							label="Language"
							placeholder="Language"
							options={optionLanguage}
						/>
						<p className="radio-group-title">Select Options</p>
						<Radio.Group value={value}>
							<Radio value={1}>A</Radio>
							<Radio value={2}>B</Radio>
							<Radio value={3}>C</Radio>
							<Radio value={4}>D</Radio>
						</Radio.Group>
						<FloatInput
							label="Global Notification Settings"
							placeholder="Global Notification Settings"
							// onChange={onChange}
						/>
					</Card>
				</Col>
				<Button type="primary">Primary Button</Button>
			</Row>
		</>
	);
}
