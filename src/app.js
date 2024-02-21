import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cartsRouter from "./routes/cartRouter.js"
import productsRouter from "./routes/productsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import body_parser from 'body-parser'

import handlebars from 'express-handlebars'
import __dirname from  './utils.js'
import path from "path"
import { Server } from 'socket.io';
const port = 8080
const app = express()

// import ProductManager from "./ProductManager.js"

// const manager = new ProductManager('../ProductsFile.json')

app.engine('handlebars',handlebars.engine())
app.set('views',path.join(__dirname,'../views'))

app.set('view engine','handlebars')
// configure the app to use bodyParser()
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());

//app.use(express.static(__dirname+'../public/js'));
//app.use('../public', express.static(__dirname + '/public' ));
app.use('/api/carts',cartsRouter)
app.use('/api/products',productsRouter)
app.use('/',viewsRouter)

const httpServer = app.listen(port,()=>{
    console.log('Servidor escuchando en puerto: '+ port)
})

const io = new Server(httpServer)

io.on('connection',(socket)=>{
    console.log("Nuevo Cliente Conectado con id "+ socket.id)
    
    socket.emit("updateProduct",manager.getProducts())
    
})



app.io = io;

const uri = "mongodb+srv://pablocuratola:gerardoloco@clustercoder.uhbybep.mongodb.net/?retryWrites=true&w=majority";
await mongoose.connect(uri)
console.log("Conectado a Mongo!")

