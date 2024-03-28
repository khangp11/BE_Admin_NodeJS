const authController = require("../../controllers/auth/authController");
const { verifyToken } = require("../../controllers/auth/verifyToken");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logOut);
router.post("/refresh", authController.requestRefreshToken);

module.exports = router;