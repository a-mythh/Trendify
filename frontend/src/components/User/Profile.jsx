import React, { useEffect } from "react";
import MetaData from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// component
import Loader from "../layout/Loader/Loader";

// css
import "./Profile.css";

const Profile = () => {
	const navigate = useNavigate();
	const { user, loading, isAuthenticated } = useSelector((state) => state.user);

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/account");
		}
	}, [isAuthenticated]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`${user.name} | Profile`} />
					<div className="profileContainer">
						<div>
							<h1>My Profile</h1>
							<img src={user.avatar.url} alt={user.name} />
							<Link to="/me/update">Edit Profile</Link>
						</div>
						<div>
							<div>
								<h4>Full Name</h4>
								<p>{user.name}</p>
							</div>

							<div>
								<h4>Email</h4>
								<p>{user.email}</p>
							</div>

							<div>
								<h4>Joined On</h4>
								<p>{String(user.createdAt).substring(0, 10)}</p>
							</div>

							<div>
								<Link to="/orders">My Orders</Link>
								<Link to="/password/update">Change Password</Link>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
