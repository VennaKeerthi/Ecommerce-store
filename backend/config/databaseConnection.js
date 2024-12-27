import mongoose from "mongoose";
import cors from 'cors'

const connectDB= async()=>{

mongoose.connection.on('connected',()=>{
    console.log('db connected');
})
    await mongoose.connect(`${process.env.MONGODB_URI}/fashion-store`)
}

export default connectDB;