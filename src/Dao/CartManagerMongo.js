import {cartModel} from './models/cart.model.js'

class CartManagerMongo {
    validateProduct(product){
        if(product.title.length>0 &&product.description.length >0 && product.price >0 &&product.thumbnail.length >0 &&product.code.length >0 &&product.stock >0){
            return true
        }else{
            return false
        }
    }

    async addCart(){
        try {
           await cartModel.insertMany({products:[]})
            return "OK"
        } catch (error) {
            return error
        }
    }

    async getCartProducts(cartId){
        try {
            let productsCart = await cartModel.findById(cartId)
            return productsCart.products.length>0?productsCart.products:"Not Found"
        } catch (error) {
            return "Error"
        }
    }
    
    async addProductsToCart(cartId,productId){
        try {
            let res = await cartModel.findByIdAndUpdate( { _id: cartId }, 
                { $push: { products: productId  } },)
                return "OK"
        } catch (error) {
            console.log("catch")
            console.log(error)
            return "Error"
        }
    }
}

export default CartManagerMongo