import { Button, Form, Modal } from "antd";
import React from "react";
import { GET } from "../../../../providers/useAxiosQuery";

export default function ModalAttachment(props) {
	const { toggleModalAttachment, SetToggleModalAttachment } = props;

	console.log(toggleModalAttachment);

	const [form] = Form.useForm();
	return (
		<>
			<Modal
				title={
					<>
						<b>
							{toggleModalAttachment.data &&
								toggleModalAttachment.data.bookname}
						</b>
					</>
				}
				open={toggleModalAttachment.open}
				onCancel={() => {
					SetToggleModalAttachment({ open: false, data: null });
				}}
				footer={[
					<Button
						className="btn-main-primary outlined"
						size="large"
						key={1}
						onClick={() => {
							SetToggleModalAttachment({
								open: false,
								data: null,
							});
						}}
					>
						CANCEL
					</Button>,
					<Button
						type="primary"
						className="btn-main-primary"
						size="large"
						key={2}
						onClick={() => {
							form.submit();
						}}
						// loading={isLoadingFacultyLoad}
					>
						SUBMIT
					</Button>,
				]}
			>
				<Form.Item></Form.Item>
			</Modal>
		</>
	);
}
