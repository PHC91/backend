import ProductManager from "./src/ProductManager.js"

let product1 = {
    title:"Guitarra",
    description: "Una guitarra comun",
    price: 300,
    thumbnail:"https://wwww.google.com.ar",
    code:"123G",
    stock:10
}
let product2 = {
    title:"Microfono",
    description: "Un Microfono comun",
    price: 100,
    thumbnail:"https://wwww.google.com.ar",
    code:"124M",
    stock:40
}
let product3 = {
    title:"Bajo",
    description: "Un Bajo Profesional",
    price: 500,
    thumbnail:"https://wwww.google.com.ar",
    code:"125B",
    stock:40
}
let product4 = {
    title:"Guitarra Electrica",
    description: "Una Guitarra Electrica Profesional",
    price: 1000,
    thumbnail:"https://wwww.google.com.ar",
    code:"126GE",
    stock:5
}

let product5 = {
    title:"Parlantes Stereo 2.1",
    description: "Parlantes 2.1",
    price: 100000,
    thumbnail:"https://wwww.google.com.ar",
    code:"127Gf",
    stock:5
}

let product6 = {
    title:"Parlantes Stereo 5.1",
    description: "Parlantes 5.1",
    price: 200000,
    thumbnail:"https://wwww.google.com.ar",
    code:"129Gf",
    stock:5
}

let product7 = {
    title:"Parlantes Stereo 7.1",
    description: "Parlantes 7.1",
    price: 400000,
    thumbnail:"https://wwww.google.com.ar",
    code:"130Gf",
    stock:5
}

let product8 = {
    title:"Pantalla 50 pulgadas",
    description: "Pantalla 50 pulgadas Led",
    price: 800000,
    thumbnail:"https://wwww.google.com.ar",
    code:"131Gf",
    stock:5
}

let product9 = {
    title:"Pantalla 30 pulgadas",
    description: "Pantalla 30 pulgadas Led",
    price: 200000,
    thumbnail:"https://wwww.google.com.ar",
    code:"132Gf",
    stock:5
}

let product10 = {
    title:"Pantalla 100 pulgadas",
    description: "Pantalla 100 pulgadas Led",
    price: 10000000,
    thumbnail:"https://wwww.google.com.ar",
    code:"133Gf",
    stock:5
}





const manager = new ProductManager('ProductsFile.json')

manager.addProducts(product1)
manager.addProducts(product2)
manager.addProducts(product3)
manager.addProducts(product4)
manager.addProducts(product5)
manager.addProducts(product6)
manager.addProducts(product7)
manager.addProducts(product8)
manager.addProducts(product9)
manager.addProducts(product10)


// console.log("------------------------------")
// console.log("Se muestran todos los productos")
// console.log(manager.getProducts())
// console.log("------------------------------")
// console.log("Se agrega producto 1")
// console.log(manager.addProducts(product1))
// console.log("------------------------------")
// console.log("Se agrega producto 2")
// console.log(manager.addProducts(product2))
// console.log("------------------------------")
// console.log("------------------------------")
// console.log("Se agrega producto 3")
// console.log(manager.addProducts(product3))
// console.log("------------------------------")
// console.log("Se muestran todos los productos")
// console.log(manager.getProducts())
// console.log("------------------------------")
// console.log("Busca producto con Id 1")
// console.log(manager.getProductById(1))
// console.log("------------------------------")
// console.log("Se muestran todos los productos")
// console.log(manager.getProducts())
// console.log("------------------------------")
// console.log("Actualizo precio del producto en 99999 con Id 1")
// product1.price = 99999
// console.log(manager.updateProductById(1,product1))

// console.log("------------------------------")
// console.log("Se muestran todos los productos")
// console.log(manager.getProducts())


// console.log("------------------------------")
// console.log("Elinino producto con Id 1")
// console.log(manager.deleteProductById(1))

// console.log("------------------------------")
// console.log("Se muestran todos los productos")
// console.log(manager.getProducts())


