const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const multer = require("multer");

const upload = multer({storage:multer.memoryStorage()});

router.post("/",authMiddleware.authSeller,upload.array("images",5),productController.createProduct);

router.get("/seller",authMiddleware.authSeller,productController.getSellerProducts)

router.get("/",productController.getAllProducts);

router.get("/product-details/:id",productController.getProductDetails)


module.exports = router;