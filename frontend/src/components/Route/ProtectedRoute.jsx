import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Route, redirect, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = () => {
	const { loading, isAuthenticated, user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			navigate("/login");
		}
	}, [loading, isAuthenticated, navigate]);

	if (!loading) {
		if (!isAuthenticated) {
			return null;
		}

		return <Outlet />;
	} else {
		<Loader />;
	}

	// return (
	// 	<>
	// 		{!loading && (
	// 			<Route
	// 				{...rest}
	// 				render={(props) => {
	// 					if (!isAuthenticated) {
	// 						return redirect("/login");
	// 					}

	// 					return <Component {...props} />;
	// 				}}
	// 			/>
	// 		)}
	// 	</>
	// );
};

export default ProtectedRoute;
