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
    try {
       const {email,password} = req.body
       const session = req.session 
       console.log(
        "session.routes.js", session
       )
       const findUser= await userModel.findOne({email})
       if(!findUser) return res.json({message:"user not register"})
       if(findUser.password!== password) {
        return res.json({message:"wrong passord"})
       }
       req.session.user = {
        ...findUser,
        password:null
       }

       return res.redirect("profile",{
        firstName: req.session?.user?.first_name || findUser.first_name,
        lastName: req.session?.user?.last_name || findUser.last_name,
        email:req.session?.user?.email || email,
        age:req.session?.user?.age || findUser.age
       })
    } catch (error) {
        console.log(error)
    }
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