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
            let productsCart = await cartModel.findById(cartId).populate("products.product")
            console.log("pro  "+ productsCart)
            return productsCart.products.length>0?productsCart.products:"Not Found"
        } catch (error) {
            return "Error"
        }
    }
    
    async addProductsToCart(cartId,productId,cantidad){
        try {
            let cart = await cartModel.findByIdAndUpdate( { _id: cartId })
            console.log("-- "+cart)
            cart.products.push({product:productId,cantidad:cantidad})
            await cartModel.updateOne({_id:cartId},cart)
                return "OK"
        } catch (error) {
            console.log("catch")
            console.log(error)
            return "Error"
        }
    }

    async updateProductsCart(cartId,data){
        try {
            let cart = await cartModel.findByIdAndUpdate( { _id: cartId })
            console.log("-- "+cart)
            cart.products=data
            await cartModel.updateOne({_id:cartId},cart)
                return "OK"
        } catch (error) {
            console.log("catch")
            console.log(error)
            return "Error"
        }
    }

    async deleteProductsCart(cartId){
        try {
            let cart = await cartModel.findByIdAndUpdate( { _id: cartId })
            cart.products =[]
            await cartModel.updateOne({_id:cartId},cart)
                return "OK"
        } catch (error) {
            console.log("catch")
            console.log(error)
            return "Error"
        }
    }


    async updateProductsToCart(cartId,productId,cantidad){
        try {
            let cart = await cartModel.findByIdAndUpdate( { _id: cartId })
            
            let index = cart.products.findIndex((p)=>{
               
                return p.product.equals(productId)
            })
           
            cart.products[index].cantidad=cantidad

            await cartModel.updateOne({_id:cartId},cart)
                return "OK"
        } catch (error) {
            console.log("catch")
            console.log(error)
            return "Error"
        }
    }


    
    async deleteProductsToCart(cartId,productId){
        try {
            let cart = await cartModel.findByIdAndUpdate( { _id: cartId })
            
            let index = cart.products.findIndex((p)=>{
               
                return p.product.equals(productId)
            })
           
            cart.products.splice(index,1)

            await cartModel.updateOne({_id:cartId},cart)
                return "OK"
        } catch (error) {
            console.log("catch")
            console.log(error)
            return "Error"
        }
    }
    

}

export default CartManagerMongo