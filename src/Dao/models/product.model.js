import { Int32 } from 'mongodb'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category:String,
    thumbnail:String,
    code:String,
    stock:Number,
    Id:Number
})
productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model(productCollection,productSchema)