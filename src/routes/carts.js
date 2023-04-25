import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import CartsManager from "../managers/cartsManager.js";

const router = Router();

const productManager = new ProductManager('src/files/Products.json');
const cartsManager = new CartsManager('src/files/Carts.json');

const products = productManager.getProducts();
const carts = cartsManager.getCarts();

router.get('/cid', async (req, res)=>{
    try{
        const cartId = req.params.cid;
        const allCarts = await carts;
        const myCart = allCarts.find((c)=> c.id == cartId);

        res.send(myCart);
    }catch(error){
        return res.status(404).send({status: "Error", error:"Cart not found"});
    }
})

router.post('/', async (req, res)=>{
    try{
    cartsManager.newCart();
    res.send("New cart is created");

    }catch(error){
        return res.status(404).send({status: "Error", error:"Cart not found"});
    }
});

router.post('/:cid/product/:pid', async (req, res)=>{
    const allCarts = await carts;
    const cartId = req.params.cid;
    const cartCreated = allCarts.find((a)=>a.id == cartId);
    if(!cartCreated){
        return res.status(404).send({ status: "error", error: "Cart not found" });
    }
    const productId = req.params.pid;
    let quantity = req.body.quantity;
    quantity ? (quantity = quantity) : (quantity=1);
    const allProducts = await products;
    const myProduct = allProducts.find((p)=> p.id == productId);
    myProduct ? res.send({status: "succes ", code: "Cart ready" }) : res.send("Product not found");
    const myProductId = myProduct.id;
    const loadCart ={
        product: myProductId,
        quantity: quantity,
    };
    cartsManager.CartProducts(cartId, loadCart);
});


export default router


/* 
1) crear carpeta routes
2)crear el archivo referente a la entidad pets.router.js o pet.js
3) Importar la app de rotuer ( import { Router } from 'express') e inicio la mini app  const router = Router();
4) Exporto mi router  export default router;
5) Importo en app principal import petsRouter from './routes/pets.router.js'
6) Me autorobo los end point y lo paso
7) Reemplazo app por router
8) Hacemos un arreglo para que nos devuelva algo  pets = []
9) Modificando para que envie nuestras pets  res.send(pets)
10) Encuentro la palabra en comun "pets" y lo relaciono con la palabra use  app.use('/api/pets', petsRouter);
11)


*/