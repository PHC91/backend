import { Router } from "express";
import ProductManager from "../ProductManager.js"
const router = Router()
const manager = new ProductManager('../ProductsFile.json')

router.get('/',(req,res)=>{
    let user ={
        name:"CJ",
        id:1
    }
    res.render('index',user)
})

export default router