const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		next(new ErrorHandler("Please login to access this resource", 401));
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);

	req.user = await User.findById(decodedData.id);

	next();
});

const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`Role: ${req.user.role} is not allowed to access this resource.`,
					403
				)
			);
		}

		next();
	};
};

module.exports = { isAuthenticatedUser, authorizeRoles };
