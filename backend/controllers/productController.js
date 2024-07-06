const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product -> Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

// Get all products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
	const resultPerPage = 8;
	const productCount = await Product.countDocuments();

	const apiFeature = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter();

	const products = await apiFeature.query;
	let filteredProductsCount = products.length;

	apiFeature.pagination(resultPerPage);

	res.status(200).json({
		success: true,
		products,
		productCount,
		resultPerPage,
		filteredProductsCount,
	});
});

// Get product details
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

// Update product -> Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		product,
	});
});

// Delete product -> Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	await product.deleteOne();

	res.status(200).json({
		success: true,
		message: "Product deleted successfully",
	});
});

// Create new review or update review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user.id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const product = await Product.findById(productId);

	// if there is a review by the same user who is reviewing now then it has been reviewed before
	const isReviewed = product.reviews.find(
		(review) => review.user.toString() == req.user.id
	);

	if (isReviewed) {
		product.reviews.forEach((review) => {
			if (review.user.toString() == req.user.id) {
				review.rating = rating;
				review.comment = comment;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	// overall rating of product by finding average of all ratings
	let avg = 0;
	product.reviews.forEach((review) => {
		avg += review.rating;
	});
	product.ratings = avg / product.reviews.length;

	await product.save({
		validateBeforeSave: false,
	});

	res.status(200).json({
		success: true,
		message: "Review created successfully.",
	});
});

// Get all reviews of a product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

// Delete product review
const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	const reviews = product.reviews.filter(
		(review) => review._id.toString() !== req.query.id.toString() // review id passed through query
	);

	let avg = 0;
	reviews.forEach((review) => {
		avg += review.rating;
	});
	const ratings = avg / reviews.length;
	const numOfReviews = reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		success: true,
		message: "Review deleted successfully.",
	});
});

module.exports = {
	createProduct,
	getAllProducts,
	getProductDetails,
	updateProduct,
	deleteProduct,
	createProductReview,
	getProductReviews,
	deleteProductReview,
};
