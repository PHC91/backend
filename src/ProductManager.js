//const fs= require('fs')
import * as fs from 'fs'

class ProductManager {

    constructor(pathArchivo){
        this.products =[]
        this.maxId =0
        this.path =pathArchivo
        //this.saveProductosToFile();
    }

    saveProductosToFile(){
        fs.writeFileSync(this.path,JSON.stringify(this.products))
    }

    setProductsFromFile(){
        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path))
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
     addProducts(product) {
        let keys =Object.keys(product)
        if(keys.includes("title") && keys.includes("description") && keys.includes("price") && keys.includes("thumbnail") && keys.includes("code") && keys.includes("stock") ){
            if(this.validateProduct(product)){
                let existProduct = this.products.find((i)=>{
                    return i.code ==product.code
                })
                if(existProduct==undefined){
                    this.maxId++
                    product.Id =this.maxId
                    this.products.push(product)
                    this.saveProductosToFile()
                    return "Se agrego el producto "+product.title
                }else{
                    return "El producto ya existe"
                }
            }else{
                return "Hay campos vacios, todos son obligatorios"
            }
        }else{
            return "Se deben cargar todas las propiedades"
        }
           
    }

    getProducts(){
        if(this.setProductsFromFile()){
            return this.products
        }else{
            return 'Error al leer el archivo'
        }
       
    }

    getProductById (productId){
        if(this.setProductsFromFile()){
            let productFound =this.products.find((product)=>{
                return product.Id == productId
            })
            if(productFound== undefined){
                return "Not Found"
            }
            return productFound
        }else{
            return 'Error al leer el archivo'
        }
        
    }

    updateProductById(productId,productUpdated){
        if(this.setProductsFromFile()){
            let indexProductFound = this.products.findIndex((product)=>{
                return product.Id == productId
            })
            if(indexProductFound != -1){
                productUpdated.Id = this.products[indexProductFound].Id
                this.products[indexProductFound] = productUpdated
                this.saveProductosToFile()
                return "Updated product with id " + productId
            }else{
                return "Not Found Product with id " + productId
            }
        }else{
            return 'Error al leer el archivo'
        }
       
    }

    deleteProductById(productId){
        if(this.setProductsFromFile()){
            let indexProductFound = this.products.findIndex((product)=>{
                return product.Id == productId
            })
            if(indexProductFound != -1){
                this.products.splice(indexProductFound,1)
                this.saveProductosToFile()
                return "Deleted product with id " + productId
            }else{
                return "Not Found Product with id " + productId
            }
        }else{
            return 'Error al leer el archivo'
        }
      
    }
}

export default  ProductManager

