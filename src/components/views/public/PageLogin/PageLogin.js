import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Layout,
	Typography,
	Card,
	Alert,
	Form,
	Button,
	Tabs,
	DatePicker,
} from "antd";

import { POST } from "../../../providers/useAxiosQuery";
import { logo } from "../../../providers/companyInfo";
import { encrypt } from "../../../providers/companyInfo";
import { date, description } from "../../../providers/companyInfo";
import FloatInput from "../../../providers/FloatInput";
import FloatInputPassword from "../../../providers/FloatInputPassword";
import validateRules from "../../../providers/validateRules";

export default function PageLogin() {
	const navigate = useNavigate();

	const [errorMessageLogin, setErrorMessageLogin] = useState({
		type: "",
		message: "",
	});

	const { mutate: mutateLogin, isLoading: isLoadingButtonLogin } = POST(
		"api/login",
		"login"
	);

	const onFinishLogin = (values) => {
		console.log("onFinishLogin", values);

		mutateLogin(values, {
			onSuccess: (res) => {
				// console.log("res", res);
				if (res.data) {
					localStorage.userdata = encrypt(JSON.stringify(res.data));
					localStorage.token = res.token;
					window.location.reload();
				} else {
					setErrorMessageLogin({
						type: "error",
						message: res.message,
					});
				}
			},
			onError: (err) => {
				setErrorMessageLogin({
					type: "error",
					message: (
						<>
							Unrecognized username or password. <b>Forgot your password?</b>
						</>
					),
				});
			},
		});
	};

	const onChange = (key) => {
		console.log(key);
	};

	const items = [
		{
			key: "1",
			label: "Log In",
			children: (
				<Card>
					<div className="text-center mt-0">
						<img src="../../../images/register.png" alt="" />
					</div>
					<Typography.Title className="text-center text-1 mt-0">
						Applicant Access Module
					</Typography.Title>

					<Typography.Title className="text-center text-log-in mt-0">
						Log In
					</Typography.Title>

					<Form
						layout="vertical"
						className="login-form"
						onFinish={onFinishLogin}
						autoComplete="off"
					>
						<Form.Item
							name="email"
							rules={[validateRules.required]}
							hasFeedback
						>
							<FloatInput
								label="Username / E-mail"
								placeholder="Username / E-mail"
							/>
						</Form.Item>

						<Form.Item
							name="password"
							rules={[validateRules.required]}
							hasFeedback
						>
							<FloatInputPassword label="Password" placeholder="Password" />
						</Form.Item>

						<Button
							type="primary"
							htmlType="submit"
							loading={isLoadingButtonLogin}
							className="mt-10 btn-log-in"
							block
							size="middle"
						>
							Log In
						</Button>

						{errorMessageLogin.message && (
							<Alert
								className="mt-10"
								type={errorMessageLogin.type}
								message={errorMessageLogin.message}
							/>
						)}
					</Form>
				</Card>
			),
		},
	];

	return (
		<Layout.Content>
			<div className="container">
				<div className="left">
					<div className="logo-wrapper zoom-in-out-box-1">
						<img src={logo} alt="" />
					</div>

					<Typography.Title className="title">
						FSUU
						<p className="sub-title">Father Saturnino Urios University</p>
					</Typography.Title>
				</div>
				<div className="right">
					<Tabs
						defaultActiveKey="1"
						items={items}
						type="card"
						onChange={onChange}
					/>
				</div>
			</div>

			<Layout.Footer>
				<Typography.Text>
					{`© ${date.getFullYear()} ${description}. All Rights
                        Reserved.`}
				</Typography.Text>
			</Layout.Footer>
		</Layout.Content>
	);
}
