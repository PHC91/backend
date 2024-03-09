import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cartsRouter from "./routes/cartRouter.js"
import productsRouter from "./routes/productsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import sessionRouter from "./routes/sessionRouter.js"
import body_parser from 'body-parser'

import handlebars from 'express-handlebars'
import __dirname from  './utils.js'
import path from "path"
import { Server } from 'socket.io';


import cookieParser from 'cookie-parser'
import session from 'express-session'
import  mongoStore from 'connect-mongo'

const port = 8080
const app = express()

import { messageModel } from './Dao/models/messages.model.js'

// import ProductManager from "./ProductManager.js"

// import ProductManagerMongo from './Dao/ProductManagerMongo.js'
// import { productModel } from "../models/product.model.js"

// const manager = new ProductManager('../ProductsFile.json')



app.engine('handlebars',handlebars.engine())
app.set('views',path.join(__dirname,'../views'))

app.set('view engine','handlebars')
// configure the app to use bodyParser()
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());
app.use(cookieParser())

app.use(session({
    store: mongoStore.create({
      mongoUrl: "mongodb+srv://pablocuratola:gerardoloco@clustercoder.uhbybep.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true} ,// See below for details
      ttl:60 * 3600
    }),
    secret:"secretSession",
    resave:false,
    saveUninitialized:false
  }));

//app.use(express.static(__dirname+'../public/js'));
//app.use('../public', express.static(__dirname + '/public' ));
app.use('/api/carts',cartsRouter)
app.use('/api/products',productsRouter)
app.use('/api/session',sessionRouter)
app.use('/',viewsRouter)

const httpServer = app.listen(port,()=>{
    console.log('Servidor escuchando en puerto: '+ port)
})

const io = new Server(httpServer)

io.on('connection',async(socket)=>{
    console.log("Nuevo Cliente Conectado con id "+ socket.id)
    
    //socket.emit("updateProduct",await productModel.paginate({},{limit:limit,page:page,sort: { price: sort}}))
    let messages = await messageModel.find({})
    io.emit("messageLogs",messages)
    socket.on("message",async (data)=>{
     
        await messageModel.create(data)
        let messages = await messageModel.find({})
        io.emit("messageLogs",messages)
    })
    
})



app.io = io;

const uri = "mongodb+srv://pablocuratola:gerardoloco@clustercoder.uhbybep.mongodb.net/?retryWrites=true&w=majority";
await mongoose.connect(uri)
console.log("Conectado a Mongo!")

