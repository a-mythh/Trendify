import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, SpeedDial, SpeedDialAction } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop } from "@mui/material";
import { colors } from "../../../variables";

// icons
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

// css
import "./Header.css";

// actions
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
	const navigate = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);

	const [open, setOpen] = useState(false);

	const options = [
		{ icon: <ListAltIcon />, name: "Orders", func: orders },
		{ icon: <PersonOutlineIcon />, name: "Profile", func: account },
		{
			icon: (
				<ShoppingBasketIcon
					style={{ color: cartItems.length > 0 ? colors.primary : "unset" }}
				/>
			),
			name: `Cart (${cartItems.length})`,
			func: cart,
		},
		{ icon: <PowerSettingsNewIcon />, name: "Logout", func: logoutUser },
	];

	if (user.role === "admin") {
		options.unshift({
			icon: <SpaceDashboardIcon />,
			name: "Dashboard",
			func: dashboard,
		});
	}

	function dashboard() {
		navigate("/dashboard");
	}

	function orders() {
		navigate("/orders");
	}

	function account() {
		navigate("/account");
	}

	function logoutUser() {
		dispatch(logout());
		alert.success("Logged out successfully");
	}

	function cart() {
		navigate("/cart");
	}

	return (
		<>
			<Backdrop open={open} style={{ zIndex: "10" }} />
			<SpeedDial
				className="speedDial"
				style={{ zIndex: "11" }}
				ariaLabel="SpeedDial tooltip"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				direction="down"
				icon={
					<img
						className="speedDialIcon"
						src={user.avatar.url ? user.avatar.url : "/profile icon.png"}
						alt="profile"
					/>
				}
			>
				{options.map((item) => (
					<SpeedDialAction
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
						tooltipOpen={window.innerWidth <= 600 ? true : false}
					/>
				))}
			</SpeedDial>
		</>
	);
};

export default UserOptions;
