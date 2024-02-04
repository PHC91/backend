//const fs= require('fs')
import * as fs from 'fs'

class CartManager {

    constructor(pathArchivo){
        this.carts =[]
        this.maxId =0
        this.path =pathArchivo
        this.saveCartsToFile();
    }

    saveCartsToFile(){
        fs.writeFileSync(this.path,JSON.stringify(this.carts))
    }

    setCartsFromFile(){
        if(fs.existsSync(this.path)){
            this.carts = JSON.parse(fs.readFileSync(this.path))
            return true
        }else{
            console.log("El archivo no existe")
            return false
        }
    }

    validateProduct(product){
        if(product.title.length>0 &&product.description.length >0 && product.price >0 &&product.thumbnail.length >0 &&product.code.length >0 &&product.stock >0){
            return true
        }else{
            return false
        }
    }

    addCart(){
        try {
            let newCart = {
                id: this.maxId +1,
                products: []
            }
            this.carts.push(newCart)
            this.saveCartsToFile()
            this.maxId ++
            return newCart.id
        } catch (error) {
            return error
        }
    }

    getCartProducts(cartId){
        if(this.setCartsFromFile()){
            let cartFound =this.carts.find((cart)=>{
                return cart.id == cartId
            })
            if(cartFound== undefined){
                return "Not Found"
            }
            return cartFound.products
        }else{
            return 'Error al leer el archivo'
        }
    }
    
    addProductsToCart(cartId,productId){
        if(this.setCartsFromFile()){
            let indexCartFound = this.carts.findIndex((cart)=>{
                return cart.id == cartId
            })
            if(indexCartFound != -1){
                let indexCartProduct = this.carts[indexCartFound].products.findIndex((product)=>{
                    return product.Id == productId
                })
                console.log(indexCartFound)
                console.log("73"+indexCartProduct)
                if(indexCartProduct != -1 && this.carts[indexCartFound].products.length>0 ){
                    console.log("76")
                    let quantityActual = this.carts[indexCartFound].products[indexCartProduct].quantity
                    this.carts[indexCartFound].products[indexCartProduct].quantity = quantityActual +1
                }else{
                    console.log("80")
                    this.carts[indexCartFound].products.push({Id:productId,quantity:1})
                    console.log(this.carts[indexCartFound].products)
                }
                this.saveCartsToFile()
                return "producto agregado"
            }else{
                return "Not Found cart with id " + cartId
            }
        }else{
            return 'Error al leer el archivo'
        }
    }
}

export default  CartManager

