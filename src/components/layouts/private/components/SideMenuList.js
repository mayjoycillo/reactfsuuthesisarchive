import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/pro-light-svg-icons";
import { faBook } from "@fortawesome/pro-regular-svg-icons";

export const adminHeaderMenuLeft = (
	<>
		{/* <div className="ant-menu-left-icon">
            <Link to="/subscribers/current">
                <span className="anticon">
                    <FontAwesomeIcon icon={faUsers} />
                </span>
                <Typography.Text>Subscribers</Typography.Text>
            </Link>
        </div> */}
	</>
);

export const adminHeaderDropDownMenuLeft = () => {
	const items = [
		// {
		//     key: "/subscribers/current",
		//     icon: <FontAwesomeIcon icon={faUsers} />,
		//     label: <Link to="/subscribers/current">Subscribers</Link>,
		// },
	];

	return <Menu items={items} />;
};

export const adminSideMenu = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <FontAwesomeIcon icon={faHome} />,
		moduleCode: "M-01",
	},

	{
		title: "Books",
		path: "/thesis/books",
		icon: <FontAwesomeIcon icon={faBook} />,
	},
	{
		title: "Archived",
		path: "/thesis/archived",
		icon: <FontAwesomeIcon icon={faBook} />,
	},

	{
		title: "Users",
		path: "/users",
		icon: <FontAwesomeIcon icon={faUser} />,
		children: [
			{
				title: "Current",
				path: "/users/current",
				moduleCode: "M-01",
			},
			{
				title: "Archived",
				path: "/users/archived",
				moduleCode: "M-01",
			},
		],
	},
];
