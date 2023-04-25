import express from 'express';
import products from './routes/products.js';
import carts from './routes/carts.js'
import __dirname from './utils.js';
import ProductManager from './managers/productManager.js';

const app = express();
const productManager = new ProductManager('src/files/Products.json')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`))


app.use('/api/products', products);
app.use('/api/carts', carts)

app.listen(8080, ()=>console.log("Listening in port 8080"))