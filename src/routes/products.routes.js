import { Router } from "express";
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/products.controller.js';
import { isAdmin, verifySignup } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getProducts)
      .post("/", [verifySignup, isAdmin], createProduct)
      .get("/:id", getProductById)
      .patch("/:id", [verifySignup, isAdmin], updateProductById)
      .delete("/:id", [verifySignup, isAdmin], deleteProductById);


export default router