import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/profile icon.png";

// css
import { colors } from "../../variables";

const ReviewCard = ({ review }) => {
	// options for react stars
	const options = {
		edit: false,
		color: colors.starBackground,
		activeColor: colors.starForeground,
		size: window.innerWidth < 600 ? 14 : 18,
		value: review.rating,
		isHalf: true,
	};

	return (
		<div className="reviewCard">
			<img src={profilePng} alt="user" />
			<p>{review.name}</p>
			<ReactStars {...options} />
			<span>{review.comment}</span>
		</div>
	);
};

export default ReviewCard;
