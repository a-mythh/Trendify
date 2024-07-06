import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { FaSearch, FaRegSmileWink, FaShoppingBag } from "react-icons/fa";
import logo from "../../../images/logo 6.png";
import { colors, fonts } from "../../../variables";

const options = {
	burgerColor: colors.tertiary,
	logo: logo,
	logoWidth: "20vmax",
	navColor1: colors.primaryButtonColor,
	logoHoverSize: "15px",
	logoHoverColor: colors.primary,
	logoAnimationTime: "1.5",
	link1Text: "Home",
	link2Text: "Products",
	link3Text: "Contact",
	link4Text: "About",
	link1Url: "/",
	link2Url: "/products",
	link3Url: "/contact",
	link4Url: "/about",
	link1Size: "1.5vmax",
	link1Color: colors.primary,
	nav1justifyContent: "flex-end",
	nav2justifyContent: "flex-end",
	nav3justifyContent: "flex-start",
	link1ColorHover: colors.secondaryTextHover,
	link2ColorHover: colors.secondaryTextHover,
	link3ColorHover: colors.secondaryTextHover,
	link4ColorHover: colors.secondaryTextHover,
	link1Margin: "1vmax",
	link2Margin: "0",
	link3Margin: "1vmax",
	profileIcon: "true",
	ProfileIconElement: FaRegSmileWink,
	searchIcon: "true",
	SearchIconElement: FaSearch,
	cartIcon: "true",
	CartIconElement: FaShoppingBag,
	profileIconColor: colors.primary,
	searchIconColor: colors.primary,
	cartIconColor: colors.primary,
	profileIconColorHover: colors.secondaryTextHover,
	searchIconColorHover: colors.secondaryTextHover,
	cartIconColorHover: colors.secondaryTextHover,
	profileIconUrl: "/login",
	searchIconUrl: "/search",
	cartIconUrl: "/cart",
	cartIconMargin: "1vmax",
};

const Header = () => {
	return <ReactNavbar {...options} />;
};

export default Header;
