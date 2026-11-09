const productsModel = require("../models/products.model");

const createProduct = async (data) => {
    return await productsModel.create(data);
};

const getallProducts = async () => {
    return await productsModel.find();
}

const updateProduct = async (id, data) => {
    return await productsModel.findByIdAndUpdate(
        id, data, {new: true, runValidators: true}
    );
}

const deleteProduct = async (id) => {
    return await productsModel.findByIdAndDelete(id);
}

module.exports = {
    createProduct, getallProducts, updateProduct, deleteProduct
}