const express = require("express");

// controllers
const {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	updateProfile,
	getAllUsers,
	getSingleUser,
	updateUserRole,
	deleteUser,
} = require("../controllers/userController");

// middlewares
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router
	.route("/admin/users")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
	.route("/admin/user/:id")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
