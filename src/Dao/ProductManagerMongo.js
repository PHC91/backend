import { productModel } from "./models/product.model.js"

class ProductManagerMongo {


    validateProduct(product){
        if(product.title.length>0 &&product.description.length >0 && product.price >0 &&product.thumbnail.length >0 &&product.code.length >0 &&product.stock >0){
            return true
        }else{
            return false
        }
    }
    async addProducts(product) {
        let keys =Object.keys(product)
        if(keys.includes("title") && keys.includes("description") && keys.includes("price") && keys.includes("thumbnail") && keys.includes("code") && keys.includes("stock")&& keys.includes("category") ){
            if(this.validateProduct(product)){
                let existProduct = await productModel.exists({code:product.code})
                if(existProduct==null){
                    await productModel.insertMany(product)
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

    async getProducts(limit,page,sort){
        try {
            let products = await productModel.paginate({},{limit:limit,page:page,sort: { price: sort}})
            console.log(products)
            console.log("----------------------------------")
            return products 
        } catch (error) {
            console.log(error)
        }
      
    }

    async getProductById (productId){
        try {
            let productoEncontrado = await productModel.findById(productId)
            console.log(productoEncontrado)
            return productoEncontrado
        } catch (error) {
            console.log("no encontrado....")
            return "Not Found"
        }
        
    }

    async updateProductById(productId,productUpdated){
        try {
            let res = await productModel.findByIdAndUpdate(productId,productUpdated)
            console.log(res)
            return "Updated product with id "+productId
        } catch (error) {
            console.log(error)
            return "No se encontro el producto o hubo un error"
        }
       
    }

    async deleteProductById(productId){
        try {
            let res = await productModel.findByIdAndDelete(productId)
            console.log(res)
            return "Deleted product with id "+productId
        } catch (error) {
            console.log(error)
            return "No se encontro el producto o hubo un error"
        }
    }
}

export default  ProductManagerMongo
