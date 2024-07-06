import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { colors } from "../../variables";

const Product = ({ product }) => {
	const options = {
		edit: false,
		color: colors.starBackground,
		activeColor: colors.starForeground,
		size: window.innerWidth < 600 ? 17 : 25,
		value: product.ratings,
		isHalf: true,
	};

	return (
		<Link className="productCard" to={`/product/${product._id}`}>
			<img src={product.images[0].url} alt={product.name} />
			<p>{product.name}</p>
			<div>
				<ReactStars {...options} /> <span> ({product.numOfReviews}) </span>
			</div>
			<span>{`₹${product.price}`}</span>
		</Link>
	);
};

export default Product;
