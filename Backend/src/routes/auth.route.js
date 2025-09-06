const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();


router.post("/user/register",authController.registerUser);
router.post("/user/login",authController.loginUser);
router.post("/seller/register",authController.registerSeller);
try {
    
    router.post("/seller/login",authController.sellerLogin);
} catch (error) {
    console.log(error);
    
}


module.exports = router;