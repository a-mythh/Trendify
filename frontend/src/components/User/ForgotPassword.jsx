import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

// components
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";

// css
import "./ForgotPassword.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");

	const { error, message, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const forgotPasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("email", email);

		dispatch(forgotPassword(myForm));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			alert.success(message);
		}
	}, [dispatch, error, alert, message]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Forgot Password" />
					<div className="forgotPasswordContainer">
						<div className="forgotPasswordBox">
							<h2 className="forgotPasswordHeading">Forgot Password</h2>
							<form
								className="forgotPasswordForm"
								onSubmit={forgotPasswordSubmit}
							>
								<div className="forgotPasswordEmail">
									<AlternateEmailIcon />
									<input
										type="email"
										placeholder="Email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								<input
									type="submit"
									value="Send Email"
									className="forgotPasswordBtn"
									disabled={loading ? true : false}
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ForgotPassword;
