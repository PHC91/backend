import { Router } from "express";
import ProductManager from "../ProductManager.js"
const router = Router()
const manager = new ProductManager('../ProductsFile.json')



router.get('/',async (req,res)=>{
    try {
        let products =  manager.getProducts()
        let {limit} = req.query
        if(Array.isArray(products)){
            if(limit){
                if(limit>0){
                    let productsLimited = products.slice(0,limit)
                    res.status(200).json({productos:productsLimited})
                }else{
                    res.status(400).json({error:"Limit debe ser mayor a cero"})
                }
            }else{
                res.status(200).json({productos:products})
            }
        }else{
            throw new Error(products)
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})


router.get('/:productId',async (req,res)=>{
    try {
        let product =  manager.getProductById(req.params.productId)
        if(product =="Not Found"){
            res.status(404).json({Error:"No se encontro el producto con id "+req.params.productId})
        }else{
            res.status(200).json({producto:product})
        }
        
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

router.post('/',async (req,res)=>{
    try {
       
        if(req.body.producto){
            let product = req.body.producto
            let resManager = manager.addProducts(product)
            console.log(resManager)
            if(resManager == "Se agrego el producto "+product.title){
                req.app.io.emit('updateProduct',manager.getProducts())
                //socketRouter.emit('updateProduct')
                res.status(201).json("Producto agregado correctamente")
            }else{
                res.status(400).json({Error:resManager})
            }
            
        }else{
            res.status(400).json({Error:"Se debe enviar un producto"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:error})
    }
})

router.put('/:pid',async (req,res)=>{
    try {
       
        if(req.body.producto){
            let product = req.body.producto
            let resManager = manager.updateProductById(req.params.pid,product)
            console.log(resManager)
            if(resManager == "Updated product with id "+req.params.pid){
                res.status(200).json("Producto actualizado correctamente")
            }else{
                res.status(400).json({Error:resManager})
            }
            
        }else{
            res.status(400).json({Error:"Se debe enviar un producto"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:error})
    }
})

router.delete('/:pid',async (req,res)=>{
    try {
                  
            let resManager = manager.deleteProductById(req.params.pid)
            console.log(resManager)
            if(resManager == "Deleted product with id "+req.params.pid){
                req.app.io.emit('updateProduct',manager.getProducts())
                res.status(200).json("Producto eliminado correctamente")
            }else{
                res.status(400).json({Error:resManager})
            }
            
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:error})
    }
})

export default router