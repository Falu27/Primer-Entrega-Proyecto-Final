import fs from "fs";

export default class CartsManager {
  constructor() {
    this.carts = [];
    this.path = './src/files/Carts.json';
  }

  writeFile = ()=>{
    try{
    const save = JSON.stringify(this.carts, null, "\t" );
    fs.writeFileSync(this.path, save)
}
catch(error){
    console.log('Save Error!!')
}
}

 getCarts = async()=>{
    
        this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        return this.carts

 }

newCart= async()=>{
    try{
    const carts = await this.getCarts();
    const addCart = {
        products:[]
    }

    if (carts.length === 0) {
        addCart.id = 1;
      } else {
        addCart.id = carts[carts.length - 1].id + 1;
      }
      
    carts.push(addCart)
    this.writeFile()
    }catch(error){
        console.log(error)
    }
};

    CartProducts = async (CartId, ProductId)=>{
        const carts = await this.getCarts();
        const cartNumber = carts.find((num)=> num.id == CartId);
        const inCart = cartNumber.product.find((p)=> p.product == ProductId.product);
        if(!inCart){
            cartNumber.products.push(ProductId);
        }else{
            const index = cartNumber.products.findIdex((i)=> i.product == ProductId.product);
            cartNumber.products[index].quantity += ProductId.quantity;
        }

        const newCart = carts.map((n)=> n.id == CartId ? {...n, ...cartNumber} : n);
        this.writeFile();
    }

}