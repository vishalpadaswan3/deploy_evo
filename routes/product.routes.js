const express = require('express');
const { productModel } = require('../model/product.model');
const { auth } = require('../middleware/auth.middleware');
const { check } = require('../middleware/check.middleware');

const productRouter = express.Router();
productRouter.use(auth);

productRouter.get('/products',check(["user","seller"]) ,async (req, res) => {
    try {
        const user = await productModel.find();
        res.send(user);
    } catch (error) {
        res.send(error.message);
    }
});


productRouter.post("/addproducts",check(["seller"]), async (req, res) => {
    try {
        const product = new productModel(req.body);
        await product.save();
        res.send("product added successfully");
    } catch (error) {
        res.send(error.message);
    }
});

productRouter.delete("/deleteproducts/:id",check(["seller"]), async (req, res) => {
    try {
        const s = req.params.id;

        const ur = await productModel.findByIdAndDelete({_id:s});
        res.send("product deleted successfully");
    }catch(error){
        res.send(error.message);
    }
});

module.exports = {
    productRouter
}