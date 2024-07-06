// this is like a try-catch block for any async function
const catchAsyncErrors = (anyAsyncFunction) => (req, res, next) => {
	Promise.resolve(anyAsyncFunction(req, res, next)).catch(next);
};

module.exports = catchAsyncErrors;
