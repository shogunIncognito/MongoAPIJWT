import Product from '../models/Products.js';

// sin schema
// import { conn } from '../db/db.js';
// const db = conn.collection('products')
const serverError = (res) => res.status(500).json({ code: 500, message: 'Internal Server Error' });
const notFoundError = (res) => res.status(404).json({ code: 404, message: 'Product not found' })

export const createProduct = async (req, res) => {
    try {
        const { name, category, price, imgUrl } = req.body;
        const producto = new Product({ name, category, price, imgUrl })
        const data = await producto.save()
        res.status(201).json(data);
    } catch (error) {
        serverError(res)
    }
}

export const getProducts = async (req, res) => {
    // db.find({}).toArray()
    //     .then(data => res.json(data))
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        serverError(res)
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.findById(id);

        if (data === null) return notFoundError(res)

        res.json(data)
    } catch (error) {
        serverError(res)
    }
}

export const updateProductById = async (req, res) => {
    try {
        const { body, params: { id } } = req;
        const data = await Product.findByIdAndUpdate(id, body, { new: true });
        if (!data) return notFoundError(res)

        res.sendStatus(204);
    } catch (error) {
        serverError(res)
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Product.findByIdAndRemove(id);

        if (data === null) return notFoundError(res)

        res.json(data)
    } catch (error) {
        serverError(res)
    }
}