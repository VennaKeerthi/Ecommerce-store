import express from "express"
import {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"
import cors from 'cors'

const orderRouter = express.Router()

// Admin features
orderRouter.get("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User Features
orderRouter.get('/userorders',authUser,userOrders)

// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;