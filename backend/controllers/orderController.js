const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create new order
const newOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	const order = await Order.create({
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paidAt: Date.now(),
		user: req.user._id,
	});

	res.status(201).json({
		success: true,
		order,
	});
});

// Get single order
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	// populate will get the name, email of user from the User table using the user id

	if (!order) {
		return next(new ErrorHandler("Order not found with this Id", 404));
	}

	res.status(200).json({
		success: true,
		order,
	});
});

// Get logged in user orders
const myOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find({ user: req.user._id });

	res.status(200).json({
		success: true,
		orders,
	});
});

// Get all orders -> Admin
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
});

// Update order status -> Admin
const updateOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler("Order not found with this Id", 404));
	}

	if (order.orderStatus == "Delivered") {
		return next(new ErrorHandler("You have already delivered this order"), 400);
	}

	order.orderItems.forEach(async (order) => {
		await updateStock(order.product, order.quantity);
	});

	order.orderStatus = req.body.status;
	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}

	await order.save({
		validateBeforeSave: false,
	});

	res.status(200).json({
		success: true,
	});
});

async function updateStock(id, quantity) {
	const product = await Product.findById(id);

	product.stock -= quantity;

	await product.save({
		validateBeforeSave: false,
	});
}

// Delete order -> Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler("Order not found with this Id", 404));
	}

	await order.deleteOne();

	res.status(200).json({
		success: true,
		message: "Order deleted successfully",
	});
});

module.exports = {
	newOrder,
	getSingleOrder,
	myOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
};
