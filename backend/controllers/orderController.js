import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// global variables
const currency = 'inr'
const deliveryCharge=10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 

// placing orders using cod
const placeOrder = async(req,res) => {
    try{
        // userId comes from auth.js you have to pass only items,amount,address
        const {userId,items,amount,address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)//creating new order document
        await newOrder.save()//saving document in mongodb database
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.status(200).json({success:true,message:"Order placed"})
    }
    catch(error){
        console.log(error)
        res.status(400).json({success:false,message:error.message})
    }
}

// placing orders using stripe method
const placeOrderStripe = async(req,res) => {
    try{
        const {userId,items,amount,address} = req.body
        // origin for initiating payment
        const {origin} = req.headers
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)//creating new order document
        await newOrder.save()//saving document in mongodb database
        
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({price_data: {
                currency: currency,
                product_data: {
                    name:"Delivery fee"
                },
                unit_amount: deliveryCharge*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        })

        res.status(200).json({success:true,session_url:session.url})
    }
    catch(error){
        console.log(error)
        res.status(400).json({success:false,message:error.message})
    }
}

// verify stripe
const verifyStripe = async(req,res) => {
    const {orderId,success,userId} = req.body

    try{
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.status(200).json({success:true})
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.status(200).json({success:false})
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({success:false,message:error.message})
    }
}

// placing orders using razorpay method
const placeOrderRazorpay = async(req,res) => {

}

// All orders data for admin panel
const allOrders = async(req,res) => {
    try{
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// user orders data for Frontend
const userOrders = async(req,res) => {
    try{
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.status(200).json({success:true,orders})
    }
    catch(error){
        console.log(error)
        res.status(400).json({success:false,message:error.message})
    }
}

// update order status from admin
const updateStatus = async(req,res) => {
    try{
        const {orderId,status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.status(200).json({success:true,message:"status updated"})
    }
    catch(error){
        res.status(400).json({success:"false",message:error.message})
    }
}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe }