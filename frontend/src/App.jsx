// packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import WebFont from "webfontloader";

// css
import "./App.css";
import "./variables.css";

// components
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import LoginSignUp from "./components/User/LoginSignUp.jsx";
import Profile from "./components/User/Profile.jsx";
import store from "./store";
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";

// actions
import { loadUser } from "./actions/userAction.jsx";

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	React.useEffect(() => {
		WebFont.load({
			google: {
				families: [
					"Roboto",
					"Droid Sans",
					"Open Sans",
					"Inter",
					"Kalam",
					"Merriweather",
					"Pacifico",
				],
			},
		});

		// if (isAuthenticated)
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<Header />

			{isAuthenticated && <UserOptions user={user} />}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route exact path="/product/:id" element={<ProductDetails />} />
				<Route exact path="/products" element={<Products />} />
				<Route exact path="/products/:keyword" element={<Products />} />
				<Route path="/search" element={<Search />} />

				<Route path="/login" element={<LoginSignUp />} />
				<Route path="/account" element={<ProtectedRoute />}>
					<Route path="/account" element={<Profile />} />
				</Route>
				<Route path="/me/update" element={<ProtectedRoute />}>
					<Route path="/me/update" element={<UpdateProfile />} />
				</Route>
				<Route path="/password/update" element={<ProtectedRoute />}>
					<Route path="/password/update" element={<UpdatePassword />} />
				</Route>
				<Route path="/password/forgot" element={<ForgotPassword />} />
				<Route path="/password/reset/:token" element={<ResetPassword />} />
				<Route path="/cart" element={<Cart />} />

				<Route path="/shipping" element={<ProtectedRoute />}>
					<Route path="/shipping" element={<Shipping />} />
				</Route>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
