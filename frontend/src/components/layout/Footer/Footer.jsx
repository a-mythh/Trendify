import React from "react";

// css
import "./Footer.css";

// images
import logo from "../../../images/logo 1 r.png";
import AppStore from "../../../images/AppStore.png";
import PlayStore from "../../../images/PlayStore.png";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="leftFooter">
				<h4>Download our App</h4>
				{/* <p>Download App for Android and iOS.</p> */}
				<img src={AppStore} alt="App Store" />
				<img src={PlayStore} alt="Play Store" />
			</div>

			<div className="midFooter">
				<img src={logo} alt="Trendify Logo" />
				<p id="slogan">Stay in style. Shop with smile.</p>
				<p>Copyrights 2024 &copy; a-mythh</p>
			</div>

			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a href="http://instagram.com/trendify">Instagram</a>
				<a href="http://facebook.com/trendify">Facebook</a>
				<a href="http://x.com/trendify">Twitter</a>
			</div>
		</footer>
	);
};

export default Footer;
