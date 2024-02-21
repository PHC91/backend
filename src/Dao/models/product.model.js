import { Int32 } from 'mongodb'
import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    thumbnail:String,
    code:String,
    stock:Number,
    Id:Number
})

export const productModel = mongoose.model(productCollection,productSchema)