import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();

const productManager = new ProductManager('src/files/Products.json')
const products = productManager.getProducts('src/files/Products.json');

//All products and Filter by quantity /?limit=
router.get('/', async (req, res)=>{
    try{
        const allProducts = await products;
        const limit = req.query.limit;
        if(limit){
            const filter = products.slice(0, limit);
            res.send(filter)
        }
        else{
            res.send(allProducts)
        }
}catch(error){
    res.status(501).send('Products not found')
}
})

//Filter by ID  /num
router.get('/:id', async (req, res)=>{
    try{
        const id = parseInt(req.params.id)
        const search = productManager.getProductById(id)
        if(!search){
            res.status(404).send(`Product id ${id} does not exist`)
            return
        }
        
        res.send(search);
    }catch(error){
        res.status(404).send('Search not found')
    }
})


router.post('/', async (req, res)=>{
    try{
    const addNewProduct = req.body;
    productManager.addProduct(addNewProduct);
    //products.push(addNewProduct);
    res.send({status:"succes", message:"Product added"});
    
    }catch(error){
        res.status(404).send({ status: "error", error: "not found" });
    }
})

router.put('/:pid', async (req, res)=>{
    const productsList = await products;
    const id = req.params.pid;

    const upDate = req.body;
    const pIndex = productsList.findIndex((i)=> i.id == id);
    if (pIndex === -1){
        return res.status(404).send({status: "error", error:"Product not found"});
    }
    productsList[pIndex]=upDate;
    productManager.updateProduct(id, upDate)
    res.send({ status: "Success", message: "The products is updated"});
});

router.delete('/:pid', async (req, res)=>{
    const productsList = await products;
    const id = req.params.pid;
    const pIndex = productsList.findIndex((i)=> i.id == id);
    if (pIndex === -1){
        return res.status(404).send({status: "error", error:"Product not found"});
    }
    productsList.splice(pIndex, 1);
    productManager.deleteProduct(productsList);
    res.send({status: "Success", mesage: `Products Id:${id} deleted`});
})






export default router;