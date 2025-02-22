import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

// components
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";

// css
import "./UpdateProfile.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants.jsx";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/profile icon.png");

	const updateProfileSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("avatar", avatar);

		dispatch(updateProfile(myForm));
	};

	const updateProfileDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setAvatar(user.avatar.url);
			setAvatarPreview(user.avatar.url);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("Profile updated successfully.");
			dispatch(loadUser());

			navigate("/account");

			dispatch({
				type: UPDATE_PROFILE_RESET,
			});
		}
	}, [dispatch, error, alert, user, isUpdated]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Update Profile" />
					<div className="updateProfileContainer">
						<div className="updateProfileBox">
							<h2 className="updateProfileHeading">Update Profile</h2>
							<form
								className="updateProfileForm"
								encType="multipart/form-data"
								onSubmit={updateProfileSubmit}
							>
								<div className="updateProfileName">
									<SentimentSatisfiedAltIcon />
									<input
										type="text"
										placeholder="Name"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>

								<div className="updateProfileEmail">
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

								<div id="updateProfileImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/"
										onChange={updateProfileDataChange}
									/>
								</div>

								<input
									type="submit"
									value="Update Profile"
									className="updateProfileBtn"
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

export default UpdateProfile;
