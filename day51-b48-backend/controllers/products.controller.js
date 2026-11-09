const productService = require("../services/products.service");

const createProduct = async (req, res, next) => {
    try{
        const product = await productService.createProduct(req.body);

        res.status(201).json({message: "Product Added"});
    }catch(err){
        next(err);
    }
};

const getallProducts = async (req, res, next) => {
    try{
        const products = await productService.getallProducts();

        res.status(200).json({data: products});
    }catch(err){
        next(err)
    }
};

const updateProduct = async (req, res, next) => {
    try{
        const product = await productService.updateProduct(req.params.id, req.body);

        if(!product){
            return res.status(404).json({message: "Product Not Found"});
        }

        res.status(200).json({message: "Product updated"});
    }catch(err){
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try{
        const product = await productService.deleteProduct(req.params.id);

        if(!product){
            return res.status(404).json({message: "Product Not Found"});
        }

        res.status(200).json({message: "Product deleted"});
    }catch(err){
        next(err);
    }
}

module.exports = {
    createProduct, getallProducts, updateProduct, deleteProduct
}