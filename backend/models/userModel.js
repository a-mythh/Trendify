const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name."],
		maxLength: [30, "Name cannot exceed 30 characters."],
		minLength: [4, "Name should have more than 5 characters."],
	},
	email: {
		type: String,
		required: [true, "Please enter an email."],
		unique: true,
		validate: [validator.isEmail, "Please enter a valid email."],
	},
	password: {
		type: String,
		required: [true, "Please enter a password."],
		minLength: [8, "Password should be at least 8 characters."],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

// hash the password before saving the data
userSchema.pre("save", async function (next) {
	// when password is not changed but other fields are changed
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

// jwt token for easy authentication
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// generating password reset token
userSchema.methods.getResetPasswordToken = function () {
	// unique reset token to save in database
	const resetToken = crypto.randomBytes(20).toString("hex");

	// hashing and adding to user schema to be sent to user's email
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
