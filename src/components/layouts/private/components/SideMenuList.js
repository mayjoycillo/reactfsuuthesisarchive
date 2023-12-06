import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/pro-light-svg-icons";

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
];
