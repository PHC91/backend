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

export default router