import express from 'express'

import cartsRouter from "./routes/cartRouter.js"
import productsRouter from "./routes/productsRouter.js"
import body_parser from 'body-parser'

const port = 8080
const app = express()

// configure the app to use bodyParser()
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());


app.use('/api/carts',cartsRouter)
app.use('/api/products',productsRouter)
app.listen(port,()=>{
    console.log('Servidor escuchando en puerto: '+ port)
})