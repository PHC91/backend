import { Router } from "express";
import CartManager from "../CartManager.js";
const router = Router()
const manager = new CartManager('../CartsFile.json')


router.post('/',async (req,res)=>{
    try {
       let managerRes= manager.addCart()
       if(managerRes >0){
            res.status(201).json("Se creo un cart con id "+ managerRes)
       }else{
            throw (managerRes)
       }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

router.get('/:cid',async (req,res)=>{
    try {
        let managerRes = manager.getCartProducts(req.params.cid)
        if(managerRes == "Not Found"){
            res.status(404).json({Error:"No se encontro el cart con id "+req.params.cid})
        }else{
            res.status(200).json({productos:managerRes})
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

router.post('/:cid/product/:pid',async (req,res)=>{
    try {
        let managerRes = manager.addProductsToCart(req.params.cid,req.params.pid)
        if(managerRes == "producto agregado"){
            res.status(201).json(managerRes)
        }else{
            res.status(404).json(managerRes)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:error})
    }
})

export default router