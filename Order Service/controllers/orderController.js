const axios = require('axios')

const Order = require('../models/orderModel')
const OrderDetail = require('../models/orderDetailModel')
const Coupon = require('../models/couponModel')

const getAllOrder = async (req, res, next) => {
    try {
        let orders = await Order.find()
        if(!orders){
            return res.status(400).json({
                success: false,
                message: "Get all orders failed"
            })
        }

        let orderList = []
        for (let i = 0; i < orders.length; i++) {
            let detail = await OrderDetail.find({order_id: orders[i].order_id})
            if(!detail){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find order detail with order ID ${orders[i].order_id}`
                }) 
            }
            let orderItem = {
                order: orders[i],
                detail: detail
            }
            orderList.push(orderItem)
        }

        return res.status(200).json({
            success: true,
            message: "Get all orders succeeded",
            orderList: orderList
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const getOrderById = async (req, res, next) => {
    try {
        let orderId = req.params.orderId
        let order = await Order.findOne({order_id: orderId})
        if(!order){
            return res.status(400).json({
                success: false,
                message: `Cannot find order with ID ${orderId}`
            })
        }

        let detail = await OrderDetail.find({order_id: orderId})

        return res.status(200).json({
            success: true,
            message: `Get order with ID ${orderId} succeeded`,
            order: order,
            detail: detail
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const createOrder = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        let config = {
            headers: {
                authorization: header
            }
          }
        let userData = await axios.get(`${process.env.USER_SERVICE_URL}/users/fetch`, config)
        if(!userData){
            return res.status(400).json({
                success: false,
                message: `Cannot fetch data user from user service`
            })
        }
        let user = userData.data.user
        if(!req.body.addressId){
            return res.status(400).json({
                success: false,
                message: `Address ID is required`
            })
        }
        let addressId = req.body.addressId
        let addressData = await axios.get(`${process.env.USER_SERVICE_URL}/addresses/get/${addressId}`)
        if(!addressData){
            return res.status(400).json({
                success: false,
                message: `Cannot get address from user service`
            })
        }
        let address = addressData.data.address

        let cartData = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/cart/`, config)
        if(!cartData){
            return res.status(400).json({
                success: false,
                message: `Cannot get cart from product service`
            })
        }
        let cart = cartData.data.cart
        let cartDetail = cartData.data.detail
        for (let i = 0; i < cartDetail.length; i++) {
            //const promotion_id = array[i];
            
        }
        let deliveryCost
        if(address.city != "TP Hồ Chí Minh"){
            deliveryCost = 35000
        }else{
            deliveryCost = 20000
        }

        if(req.body.couponId){
            let coupon = await Coupon.findOne({coupon_id: couponId})
            if(!coupon){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find coupon with ID ${couponId}`
                })
            }else if(coupon.is_used){
                return res.status(400).json({
                    success: false,
                    message: `Coupon with ID ${couponId} has been used`
                })
            }else if(coupon.expired_at < new Date()){
                return res.status(400).json({
                    success: false,
                    message: `Coupon with ID ${couponId} is expired`
                })
            }else{
                if(coupon.discount_amount){
                    discountAmount = coupon.discount_amount
                }else{
                    discountAmount = (cart.total_price + deliveryCost)*(coupon.discount_rate)
                }
            }
        }
        let order = new Order({
            order_id: "temp",
            user_id: user.user_id,
            fullname: user.full_name,
            phone_number: user.phone_num,
            address_id: address.address_id,
            total_item: cart.total_item,
            total_price: cart.total_price,
            delivery_cost: deliveryCost
        })
        if(req.body.couponId){
            let coupon = await Coupon.findOne({coupon_id: couponId})
            if(!coupon){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find coupon with ID ${couponId}`
                })
            }else if(coupon.is_used){
                return res.status(400).json({
                    success: false,
                    message: `Coupon with ID ${couponId} has been used`
                })
            }else if(coupon.expired_at < new Date()){
                return res.status(400).json({
                    success: false,
                    message: `Coupon with ID ${couponId} is expired`
                })
            }else{
                if(coupon.discount_amount){
                    order.discount_amount = coupon.discount_amount
                }else{
                    order.discount_amount = (cart.total_price + deliveryCost)*(coupon.discount_rate)
                }
            }
        }
        order.total_cost = order.total_price + order.delivery_cost - order.discount_amount
        order.order_id = order._id.toString()
        order.order_id.replace('new ObjectId(', '')
        order.order_id.replace(')','')

        console.log(cartDetail)
        for (let i = 0; i < cartDetail.length; i++) {
            let orderDetail = new OrderDetail({
                order_id: order.order_id,
                product_name: cartDetail[i].product_name,
                variant_id: cartDetail[i].variant_id,
                unit_price: cartDetail[i].variant_price,
                quantity: cartDetail[i].quantity,
                promotion_id: cartDetail[i].promotion_id,
                product_img: cartDetail[i].product_img

            })
            if(cartDetail[i].promotion_id && cartDetail[i].promotion_id != 'None'){
                let promotionFetch = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/promotion/${orderDetail.promotion_id}`)
                if(promotionFetch){
                    let promotionData = promotionFetch.data.promotion
                    orderDetail.price = (1 - promotionData.promotion_rate)* orderDetail.unit_price
                }
            }else{
                orderDetail.price = orderDetail.unit_price
            }
            
            await orderDetail.save()
        }
        let save = await order.save()
        if(save){
            let details = await OrderDetail.find({order_id: order.order_id})

            return res.status(200).json({
                success: true,
                message: `Fetch user data succedded`,
                order: order,
                detail: details
            })
        }else{
            return res.status(400).json({
                success: false,
                message: `Cannot save order`
            })
        }


    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}
const updateOrderById = async (req, res, next) => {
    try {
        let orderId = req.params.orderId
        let order = await Order.findOne({order_id: orderId})

        
        if(!order){
            return res.status(200).json({
                success: false,
                message: `Cannot find order with ID ${orderId}`
            })
        }

        if(req.body.status){
            order.status = req.body.status
        }

        await order.save()
        return res.status(200).json({
            success: true,
            message: `Updated order with ID ${orderId}`,
            order: order
        })

    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}
module.exports = {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrderById
}