const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	// wrong MongoDB ID error
	if (err.name === "CastError") {
		const message = `Resource not found. Invalid: ${err.path}`;
		err = new ErrorHandler(message, 400);
	}

	// mongoose duplicate key error
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
		err = new ErrorHandler(message, 400);
	}

	// wrong jwt error
	if (err.name === "JsonWebTokenError") {
		const message = "Json Web Token is invalid, try again.";
		err = new ErrorHandler(message, 400);
	}

	// jwt expire error
	if (err.name == "TokenExpiredError") {
		const message = "Json Web Token is Expired, try again.";
		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
		stackTrace: err.stack,
	});
};

module.exports = errorMiddleware;
