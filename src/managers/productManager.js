import fs from 'fs';
export default class ProductManager {


    constructor(){
        this.index = 0;
        this.products = [];
        this.path = './src/files/Products.json';
    }

    writeFile = ()=>{
        try{
        const save = JSON.stringify(this.products, null, "\t" );
        fs.writeFileSync(this.path, save)
    }
    catch(error){
        console.log('Save Error!!')
    }
    }
    
    getProducts=()=>{
        this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        return this.products
    }

    addProduct= async({title, description, price, thumbnails, code , stock, status})=>{
        try{
        const products = this.getProducts();
        const product ={
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            status,
            
        };

        if(!title || !description || !price || !thumbnails || !code || !stock){
            console.log("All fields are required.")
            return null;
        }
        const codeRepeat = products.find((prod)=>prod.code === code);
        if(codeRepeat){
            console.log("Error! Repeated Code")
            return null;
        }

        if (products.length === 0) {
            product.id = 1;
          } else {
            product.id = products[products.length - 1].id + 1;
          }
          
        products.push(product)
        this.writeFile()

    }catch(error){
        console.log(error);
    }
    }

    getProductById = (id)=>{
        const list = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const search = list.find(product=>product.id === id)
        search === undefined ? console.log('Object id:'+id+ ' no exist') : console.log(`The object with id:${id} is: ${JSON.stringify(search, null, '\t')}`);
        return search
        //Lo paso a string para que no me tire [Object Object]
    }

    
     //update 1 element
    getUpdateProduct = (id, key, val)=>{
        const indexProd = this.products.findIndex(prod=>prod.id === id);
        if(indexProd != -1){
            this.products[indexProd][key] = val;
            
            const data= this.path;
            fs.writeFileSync(data, JSON.stringify(this.products, null, '\t'));

            return console.log(`The product whit id:${id} has been updated`);
        }else{
            return console.log('The product does not exist')
        }

    }

    //update complete product
    updateProduct = async (id, elem) => {
        try {
          const products = await this.getProducts();
    
          const upProduct = products.map((p) =>
            p.id == id ? { ...p, ...elem } : p
          );
    
          fs.promises.writeFile(this.path, JSON.stringify(upProduct, null, "\t"));
        } catch (error) {
          console.log(error);
        }
      };
    
	deleteProduct = async (allProducts) => {
		const products = await this.getProducts();
	
		const recharge = JSON.stringify(allProducts, null, '\t');
        fs.writeFileSync(this.path, recharge)
	  };

}

const Pmanager = new ProductManager('../files/Products.json')