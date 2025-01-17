import mongoose from "mongoose";
import cors from 'cors'

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String,required:true},
    cartData: {type:Object,default:{}}
},{minimize:false})//minimize:false kept in order to not ignore the cartData

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel