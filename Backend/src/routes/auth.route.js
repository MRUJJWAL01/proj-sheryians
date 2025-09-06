const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/me",authMiddleware.authUser,authController.getMe);
router.post("/user/logout",authController.logoutUser);

router.post("/seller/register",authMiddleware.authUser, authController.registerSeller);
router.post("/seller/login", authController.sellerLogin);

module.exports = router;
