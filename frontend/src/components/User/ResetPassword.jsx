import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

// components
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";

// css
import "./ResetPassword.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();
	const { token } = useParams();

	const { error, success, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const resetPasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("password", password);
		myForm.set("confirmPassword", confirmPassword);

		console.log(token);
		dispatch(resetPassword(token, myForm));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success("Password reset successfully.");

			navigate("/login");
		}
	}, [dispatch, error, alert, success, navigate]);

	return (
		<>
			<MetaData title="Reset Password" />
			<div className="resetPasswordContainer">
				<div className="resetPasswordBox">
					<h2 className="resetPasswordHeading">Reset Password</h2>
					<form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
						{/* New Password */}
						<div className="loginPassword">
							<LockOpenIcon />
							<input
								type="password"
								placeholder="New Password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						{/* Confirm Password */}
						<div className="loginPassword">
							<LockIcon />
							<input
								type="password"
								placeholder="Confirm Password"
								name="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>

						<input
							type="submit"
							value="Reset"
							className="resetPasswordBtn"
							disabled={loading ? true : false}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
