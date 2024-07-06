import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useAlert } from "react-alert";

// components
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";

// reducer
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction.jsx";

// css
import "./ProductDetails.css";
import { colors } from "../../variables";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const alert = useAlert();

	const { product, loading, error } = useSelector(
		(state) => state.productDetails
	);

	// options for react stars
	const options = {
		edit: false,
		color: colors.starBackground,
		activeColor: colors.starForeground,
		size: window.innerWidth < 600 ? 22 : 26,
		value: product.ratings,
		isHalf: true,
	};

	const [quantity, setQuantity] = useState(1);

	const increaseQuantity = () => {
		if (product.stock <= quantity) {
			return;
		}

		const qty = quantity + 1;
		setQuantity(qty);
	};

	const decreaseQuantity = () => {
		if (quantity <= 1) {
			return;
		}

		const qty = quantity - 1;
		setQuantity(qty);
	};

	const addToCartHandler = () => {
		dispatch(addItemsToCart(id, quantity));
		alert.success("Added to cart.");
	};

	useEffect(() => {
		window.scrollTo(0, 80);
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProductDetails(id));
	}, [dispatch, id, error, alert]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`${product.name} | Trendify`} />

					<div className="ProductDetails">
						<div>
							<Carousel className="Carousel" stopAutoPlayOnHover={true}>
								{product.images &&
									product.images.map((item, i) => (
										<img
											key={i}
											className="CarouselImage"
											src={item.url}
											alt={`${i} slide`}
										/>
									))}
							</Carousel>
						</div>

						<div>
							<div className="detailsBlock-1">
								<h2>{product.name}</h2>
								<p>Product # {product._id}</p>
							</div>
							<div className="detailsBlock-2">
								<ReactStars {...options} />{" "}
								<span> ({product.numOfReviews}) </span>
							</div>
							<div className="detailsBlock-3">
								<h1>{`$${product.price}`}</h1>
								<div className="detailsBlock-3-1">
									<div className="detailsBlock-3-1-1">
										<button onClick={decreaseQuantity}>-</button>
										<input type="number" value={quantity} readOnly />
										<button onClick={increaseQuantity}>+</button>
									</div>
									<button onClick={addToCartHandler}>Add to Cart</button>
								</div>

								<p>
									Status:{" "}
									<b className={product.stock < 1 ? "redColor" : "greenColor"}>
										{product.stock < 1 ? "Out of stock" : "Available"}
									</b>
								</p>
							</div>
							<div className="detailsBlock-4">
								Description: <p>{product.description}</p>
							</div>

							<button className="submitReview">Write a review</button>
						</div>
					</div>

					<div>
						<h3 className="reviewHeading">Reviews</h3>
						{product.reviews && product.reviews[0] ? (
							<div className="reviews">
								{product.reviews &&
									product.reviews.map((review) => (
										<ReviewCard review={review} key={review._id} />
									))}
							</div>
						) : (
							<p className="noReviews">
								Be the first one to review this product.
							</p>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default ProductDetails;
