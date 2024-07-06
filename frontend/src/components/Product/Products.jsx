import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";

// redux
import { clearErrors, getProduct } from "../../actions/productAction";

// css
import "./Products.css";

// components
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const categories = [
	"Electronics",
	"Laptop",
	"Footwear",
	"Bottom",
	"Tops",
	"Camera",
	"SmartPhones",
];

const Products = () => {
	const dispatch = useDispatch();
	const { keyword } = useParams();

	const [currentPage, setCurrentPage] = useState(1);
	let [price, setPrice] = useState([0, 50000]);
	let [category, setCategory] = useState("");
	const [ratings, setRatings] = useState(0);

	const {
		products,
		loading,
		error,
		productCount,
		resultPerPage,
		filteredProductsCount,
	} = useSelector((state) => state.products);

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	const priceHandler = (event, newPrice) => {
		setPrice(newPrice);
	};

	let count = filteredProductsCount;

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		window.scrollTo(0, 30);
		dispatch(getProduct(keyword, currentPage, price, category, ratings));
	}, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Products | Trendify" />

					{/* Products */}
					<h2 className="productHeading">Products</h2>
					<div className="products">
						{products &&
							products.map((product) => (
								<ProductCard product={product} key={product._id} />
							))}
					</div>

					{/* Filters */}
					<div className="filterBox">
						<Typography>Price</Typography>
						<Slider
							className="price-slider"
							value={price}
							onChange={priceHandler}
							valueLabelDisplay="auto"
							aria-labelledby="range-slider"
							min={0}
							max={50000}
						/>

						{/* Categories */}
						<Typography className="categories-typography">
							Categories
						</Typography>
						<ul className="categoryBox">
							{categories.map((category) => (
								<li
									className="category-link"
									key={category}
									onClick={() => setCategory(category)}
								>
									{category}
								</li>
							))}
						</ul>

						<fieldset>
							<Typography component="legend">Ratings Above</Typography>
							<Slider
								value={ratings}
								onChange={(e, newRating) => {
									setRatings(newRating);
								}}
								aria-labelledby="continuous-slider"
								valueLabelDisplay="auto"
								min={0}
								max={5}
							/>
						</fieldset>
					</div>

					{/* Pagination */}
					{resultPerPage < count && (
						<div className="paginationBox">
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resultPerPage}
								totalItemsCount={productCount}
								onChange={setCurrentPageNo}
								nextPageText="Next"
								prevPageText="Previous"
								firstPageText="First"
								lastPageText="Last"
								itemClass="page-item"
								linkClass="page-link"
								activeClass="pageItemsActive"
								activeLinkClass="pageLinkActive"
							/>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Products;
