import { Router } from "express";
import {userModel} from '../Dao/models/user.model.js'
const router = Router()

router.get('/logout', async (req,res)=>{
    req.session.destroy(err=>{
        if(!err)  return res.redirect("/login")
        return res.send({message:'logout Error',body:err})
        
    })
})

router.post('/login', async (req,res)=>{
    
})

router.post('/register', async (req,res)=>{
    try {
        console.log("BODY REGISTER",req.body)
        const {first_name, last_name, email, age,password}= req.body
        const addUser = {
            firstName:first_name, 
            lastName:last_name, 
            email, 
            age,
            password
        }

        const newUser = await userModel.create(addUser)
      
        req.session.user ={ firstName:first_name, 
            lastName:last_name, 
            email, }
        return res.redirect('/login')
    } catch (error) {
        res.status(500).json({message:'we have some issues register this user'})
    }
})

export default router