import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager();
const products = productManager.getProducts();

const router = Router();

router.get('/', async (req, res)=>{
    const allProducts = await products;
    res.render("home", { allProducts, css: "productsCss" });
});

router.get('/realTimeProducts', async (req, res)=>{
    res.render('realTimeProducts', {css: 'realTimeProductsCss'})
});

export default router;