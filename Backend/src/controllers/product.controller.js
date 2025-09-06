const productModel = require("../model/product.model");
const storegeService = require("../services/storage.services")

const createProduct = async(req,res)=>{
    const {title ,description,price,stock} = req.body;
    try {
        const files = await Promise.all(req.files.map(async file => await storegeService.uploadFile(file.buffer) ))
        
        const  seller = req.seller;

        const realPrice = JSON.parse(price);

        const product = await productModel.create({
            title,
            description,
            images: files.map(file => file.url),
            price:{
                amount:realPrice.amount,
                currency:realPrice.currency,
            },
            seller:seller._id,
            stock:parseInt(stock),
        })
        return res.status(201).json({
        message: "product created successfully",
        product
        
    })

        
    } catch (error) {

        res.status(401).json({
            msg : error.message,
            error,
        })

        
    }
}

const getSellerProducts = async(req,res) =>{
    const seller = req.seller

    const product = await productModel.find({
        seller:seller._id,

    })

       return res.status(200).json({
        message: "Seller products fetch successfully",
        product
    })
}
const getAllProducts =async (req,res)=>{
    const products = await productModel.find().populate("seller");
     res.status(200).json({
        message: "All products fetched",
        products
    })

}

const getProductDetails = async (req,res) =>{
    const productId = req.params.id

    const product = await productModel.findOne({
        _id:productId
    })
     res.status(200).json({
        message: "product details fetched successfully",
        product
    })
}

module.exports = {
    createProduct,
    getSellerProducts,
    getAllProducts,
    getProductDetails
}

