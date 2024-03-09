import { Router } from "express";
import ProductManagerMongo from "../Dao/ProductManagerMongo.js";
import authMdw from "../middleware/auth.middleware.js";
const router = Router()
const managerMongo = new ProductManagerMongo()

router.get('/',(req,res)=>{
    let user ={
        name:"CJ",
        id:1
    }
    res.render('realTimeProducts',user)
})



router.get('/chat',(req,res)=>{
    // let user ={
    //     name:"CJ",
    //     id:1
    // }
    res.render('chat')
})

router.get('/products',async (req,res)=>{
    try {
        //let products =  manager.getProducts()
       
        let {limit,page,sort} = req.query
        limit = limit? limit:10
        page = page?page:1
        sort = sort=='asc'?-1:1
        let products = await managerMongo.getProducts(limit,page,sort)
        console.log(products)
        const user = req.session.user
        if(products.docs.length>0){
            let resObject = {
                user:user,
                status:"success",
                payload: products.docs,
                totalPages:products.totalPages,
                prevPage:products.prevPage,
                nextPage:products.nextPage,
                page:products.page,
                hasPrevPage:products.hasPrevPage,
                hasNextPage:products.hasNextPage,
                prevLink:products.prevLink,
                nextLink:products.nextLink
            }
            res.render('products',resObject)
        }else{
            let resObject = {
                user:user,
                status:"error",
                payload: products.docs,
                totalPages:products.totalPages,
                prevPage:products.prevPage,
                nextPage:products.nextPage,
                page:products.page,
                hasPrevPage:products.hasPrevPage,
                hasNextPage:products.hasNextPage,
                prevLink:products.prevLink,
                nextLink:products.nextLink
            }
            res.render('products',resObject)
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:error.message})
    }
})

router.get('/login', async (req,res)=>{
    res.render("login");
})

router.get('/register', async (req,res)=>{
    res.render("register");
})


router.get('/profile', authMdw,async (req,res)=>{
    const user = req.session.user
    res.render("profile",{
        user
    });
})

export default router