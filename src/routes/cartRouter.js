import { Router } from "express";
import CartManager from "../CartManager.js";
import CartManagerMongo from "../Dao/CartManagerMongo.js"
const router = Router()
const manager = new CartManager('../CartsFile.json')
const managerMongo= new CartManagerMongo()

router.post('/',async (req,res)=>{
    try {
       let managerRes= await managerMongo.addCart()
       if(managerRes =="OK"){
            res.status(201).json("Se creo un cart")
       }else{
            throw (managerRes)
       }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

router.get('/:cid',async (req,res)=>{
    try {
        let managerRes = await managerMongo.getCartProducts(req.params.cid)
        if(managerRes == "Not Found"){
            res.status(404).json({Error:"Sin productos en cart con id "+req.params.cid})
        }else{
            if(managerRes =="Error"){
                res.status(404).json("No se encontro el cart con id "+req.params.cid)
            }else{
                res.status(200).json({productos:managerRes})
            }
            
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

router.post('/:cid/product/:pid',async (req,res)=>{
    try {
        let managerRes = await managerMongo.addProductsToCart(req.params.cid,req.params.pid)
        if(managerRes == "OK"){
            res.status(201).json("Se agrego el producto al cart correctamente")
        }else{
            res.status(404).json("Error no se encontro el cart con id "+req.params.cid)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:error})
    }
})

export default router