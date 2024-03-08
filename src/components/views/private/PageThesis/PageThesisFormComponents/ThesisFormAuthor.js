import { Button, Col, Form, Popconfirm, Row, Typography } from "antd";
import React from "react";
import FloatInput from "../../../../providers/FloatInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";
import { GET } from "../../../../providers/useAxiosQuery";
import { useParams } from "react-router-dom";
const { Text } = Typography;

export default function ThesisFormAuthor(props) {
	const [form] = Form.useForm();
	const params = useParams();

	const { refetch: refetchBooks } = GET(
		`api/authors/${params.id}`,
		["authors"],
		(res) => {
			if (res.data) {
				let data = res.data;

				let author_list = [{}];

				if (data.books && data.books.length > 0) {
					author_list = data.books.map((bookauthor) => {
						return {
							...bookauthor,
						};
					});
				}

				form.setFieldsValue({
					author_list: author_list,
				});
			}
		},
		false
	);
	const RenderInput = (props) => {
		const { formDisable, name, restField, fields, remove } = props;
		return (
			<>
				<Text>Thesis Authors</Text>
				<Row gutter={[12, 0]}>
					<Col xs={24} sm={24} md={24} lg={6}>
						<Form.Item {...restField} name={[name, "firstname"]}>
							<FloatInput
								label="First Name"
								placeholder="First Name"
							></FloatInput>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={24} lg={6}>
						<Form.Item {...restField} name={[name, "middlename"]}>
							<FloatInput
								label="Middle Name"
								placeholder="Middle Name"
							></FloatInput>
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24} lg={6}>
						<Form.Item {...restField} name={[name, "lastname"]}>
							<FloatInput
								label="Last Name"
								placeholder="Last Name"
							></FloatInput>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={24} lg={6}>
						<Form.Item {...restField} name={[name, "suffix"]}>
							<FloatInput label="Suffix" placeholder="Suffix"></FloatInput>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={24} lg={6}>
						<Form.Item {...restField} name={[name, "role"]}>
							<FloatInput label="Role" placeholder="Role"></FloatInput>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={24} lg={6}>
						<Form.Item {...restField} name={[name, "course"]}>
							<FloatInput label="Course" placeholder="Course"></FloatInput>
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={4} lg={4} xl={4}>
						<div className="action">
							{fields.length > 1 ? (
								<Popconfirm
									title="Are you sure to delete this address?"
									onConfirm={() => {
										// handleDeleteQuestion(name);
										remove(name);
									}}
									onCancel={() => {}}
									okText="Yes"
									cancelText="No"
									placement="topRight"
									okButtonProps={{
										className: "btn-main-invert",
									}}
								>
									<Button type="link" className="form-list-remove-button p-0">
										<FontAwesomeIcon icon={faTrashAlt} className="fa-lg" />
									</Button>
								</Popconfirm>
							) : null}
						</div>
					</Col>
				</Row>
			</>
		);
	};

	return (
		<>
			<Row gutter={[12, 12]}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Form.List name="author_list">
						{(fields, { add, remove }) => (
							<Row gutter={[12, 0]}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									{fields.map(({ key, name, ...restField }, index) => (
										<div key={key} className={`${index !== 0 ? "mr-0" : ""}`}>
											<RenderInput
												// formDisabled={formDisabled}
												form={form}
												name={name}
												restField={restField}
												fields={fields}
												remove={remove}
											/>
										</div>
									))}
								</Col>

								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Button
										type="link"
										className="btn-main-primary p-0"
										icon={<FontAwesomeIcon icon={faPlus} />}
										onClick={() => add()}
									>
										Add Another Author
									</Button>
								</Col>
							</Row>
						)}
					</Form.List>
				</Col>
			</Row>
		</>
	);
}
