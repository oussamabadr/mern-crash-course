import Product from '../models/product.model.js';   
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createProduct = (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    const newProduct = new Product(product);

    try {
        newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.error('Error create product:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: `Product [id=${id}] not found` });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error(`Error updating product [id=${id}]:`, error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }

    console.log('Deleting product with ID:', id); 
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: `Product [id=${id}] not found`  });
        }
        res.status(200).json({ success: true, data: "Product deleted" });
    } catch (error) {
        console.error(`Error deleting product [id=${id}]:`, error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};