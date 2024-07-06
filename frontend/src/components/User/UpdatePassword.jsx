import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

// components
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";

// css
import "./UpdatePassword.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants.jsx";

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const updatePasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("oldPassword", oldPassword);
		myForm.set("newPassword", newPassword);
		myForm.set("confirmPassword", confirmPassword);

		dispatch(updatePassword(myForm));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("Password updated successfully.");

			navigate("/account");

			dispatch({
				type: UPDATE_PASSWORD_RESET,
			});
		}
	}, [dispatch, error, alert, isUpdated]);

	return (
		<>
			<MetaData title="Change Password" />
			<div className="updatePasswordContainer">
				<div className="updatePasswordBox">
					<h2 className="updatePasswordHeading">Change Password</h2>
					<form
						className="updatePasswordForm"
						onSubmit={updatePasswordSubmit}
					>
						{/* Old Password */}
						<div className="loginPassword">
							<VpnKeyIcon />
							<input
								type="password"
								placeholder="Old Password"
								name="password"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								required
							/>
						</div>

						{/* New Password */}
						<div className="loginPassword">
							<LockOpenIcon />
							<input
								type="password"
								placeholder="New Password"
								name="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
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
							value="Change"
							className="updatePasswordBtn"
							disabled={loading ? true : false}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdatePassword;
