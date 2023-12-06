import { useEffect } from "react";
import { Layout } from "antd";

import { name } from "../../providers/companyInfo";

export default function Public(props) {
	const { children, title, pageId } = props;

	useEffect(() => {
		if (title) {
			document.title = title + " | " + name;
		}

		return () => {};
	}, [title]);

	return (
		<Layout className="public-layout" id={pageId ?? ""}>
			{children}
		</Layout>
	);
}
