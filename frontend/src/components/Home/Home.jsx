import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import logo from "../../images/logo 1 r.png";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

// css
import "./Home.css";

// components
import Product from "./ProductCard.jsx";
import MetaData from "../layout/MetaData.jsx";
import Loader from "../layout/Loader/Loader.jsx";

// actions
import { clearErrors, getProduct } from "../../actions/productAction.jsx";

const Home = () => {
	const alert = useAlert();

	const dispatch = useDispatch();
	const { loading, error, products, productCount } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		dispatch(getProduct());
	}, [dispatch, error, alert]);

	return (
		<>
			<MetaData title="Trendify" />
			<div className="banner">
				<img src={logo} />
				<h1>Where trends come to life!</h1>
				<a href="#products">
					<button>
						Scroll <CgMouse />
					</button>
				</a>
			</div>
			<div id="products">
				{loading ? (
					<Loader />
				) : (
					<>
						<h2 className="homeHeading">Featured Products</h2>
						<div className="container" id="container">
							{products &&
								products.map((product) => (
									<Product product={product} key={product._id} />
								))}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Home;
