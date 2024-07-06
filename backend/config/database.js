const mongoose = require("mongoose");

async function connectToMongoDB(uri) {
	const client = await mongoose.connect(`${uri}/trendify`);

	console.log("Connected to MongoDB successfully");
}

module.exports = connectToMongoDB;
