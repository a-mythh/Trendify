import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

// components
import Loader from "../layout/Loader/Loader.jsx";

// css
import "./LoginSignUp.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";

const LoginSignUp = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	let { error, loading, isAuthenticated } = useSelector((state) => state.user);

	const loginTab = useRef(null);
	const registerTab = useRef(null);
	const switcherTab = useRef(null);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;

	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/profile icon.png");

	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(loginEmail, loginPassword));
	};

	const registerSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("avatar", avatar);

		dispatch(register(myForm));
	};

	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isAuthenticated) {
			navigate("/account");
		}
	}, [dispatch, error, alert, isAuthenticated]);

	const switchTabs = (e, tab) => {
		if (tab == "login") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			loginTab.current.classList.remove("shiftToLeft");
		}

		if (tab == "register") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			loginTab.current.classList.add("shiftToLeft");
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="LoginSignUpContainer">
						<div className="LoginSignUpBox">
							<div>
								<div className="login_signUp_toggle">
									<p onClick={(e) => switchTabs(e, "login")}>Login</p>
									<p onClick={(e) => switchTabs(e, "register")}>Register</p>
								</div>
								<button ref={switcherTab}></button>
							</div>

							{/* Login Form */}
							<form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
								<div className="loginEmail">
									<AlternateEmailIcon />
									<input
										type="email"
										placeholder="Email"
										value={loginEmail}
										onChange={(e) => setLoginEmail(e.target.value)}
										required
									/>
								</div>

								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="Password"
										value={loginPassword}
										onChange={(e) => setLoginPassword(e.target.value)}
										required
									/>
								</div>
								<Link to="/password/forgot">Forgot Password?</Link>
								<input type="submit" value="Login" className="loginBtn" />
							</form>

							{/* Sign Up Form  */}
							<form
								className="signUpForm"
								ref={registerTab}
								encType="multipart/form-data"
								onSubmit={registerSubmit}
							>
								<div className="signUpName">
									<SentimentSatisfiedAltIcon />
									<input
										type="text"
										placeholder="Name"
										name="name"
										value={name}
										onChange={registerDataChange}
										required
									/>
								</div>

								<div className="loginEmail">
									<AlternateEmailIcon />
									<input
										type="email"
										placeholder="Email"
                    name="email"
										value={email}
										onChange={registerDataChange}
										required
									/>
								</div>

								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="Password"
                    name="password"
										value={password}
										onChange={registerDataChange}
										required
									/>
								</div>

								<div id="registerImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/"
										onChange={registerDataChange}
									/>
								</div>

								<input
									type="submit"
									value="Register"
									className="signUpBtn"
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

export default LoginSignUp;
