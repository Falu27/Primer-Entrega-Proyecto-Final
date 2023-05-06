import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import products from './routes/products.js';
import carts from './routes/carts.js'
import __dirname from './utils.js';
import ProductManager from './managers/productManager.js';
import views from './routes/views.js'


const app = express();
const productManager = new ProductManager('src/files/Products.json')

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));


app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', views);

const server = app.listen(8080, ()=>console.log("Listening in port 8080"));
const io = new Server(server);

io.on('connection', socket=>{
    console.log('New socket conected')
})