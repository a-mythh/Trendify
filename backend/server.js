// packages
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// modules
const app = require("./app");
const connectToMongoDB = require("./config/database");

// handling uncaught exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log("Shutting down the server due to Uncaught Exception");

	process.exit(1);
});

// config
dotenv.config({ path: "backend/config/config.env" });

// environment variables
const URL = process.env.URL;
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;

// database
connectToMongoDB(DATABASE_URI);

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// server
const server = app.listen(PORT, () => {
	console.log(`Server is running on ${URL}:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log("Shutting down the server due to Unhandled Promise Rejection");

	server.close(() => {
		process.exit(1);
	});
});
