const axios = require('axios')

const Shipment = require('../models/shipmentModel')
const ShipmentDetail = require('../models/shipmentDetailModel')

const getAllShipment = async (req, res, next) => {
    try {
        let shipments = await Shipment.find()
        let shipmentList = []
        for (let i = 0; i < shipments.length; i++) {
            let detail = await ShipmentDetail.find({shipment_id: shipments[i].shipment_id})
            shipmentList.push({
                shipment: shipments[i],
                detail: detail
            })            
        }

        return res.status(200).json({
            success: true,
            message: "Get all shipments succeeded",
            list: shipmentList
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const getShipmentById = async (req, res, next) => {
    try {
        let shipmentId = req.params.shipmentId
        let shipment = await Shipment.findOne({shipment_id: shipmentId})
        if(!shipment){
            return res.status(400).json({
                success: false,
                message: `Cannot find shipment with ID ${shipmentId}`
            })
        }
        let detail = await ShipmentDetail.find({shipment_id: shipment.shipment_id})

        return res.status(400).json({
            success: true,
            message: `Get shipment with ID ${shipmentId} succeeded`,
            shipment: shipment,
            detail: detail
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const createShipment = async (req, res, next) => {
    try {
        let orderId = req.body.orderId
        if(!orderId){
            return res.status(400).json({
                success: false,
                message: "Require order ID"
            })
        }
        
        let orderResponse = await axios.get(`${process.env.ORDER_SERVICE_URL}/orders/${orderId}`)
        let orderData = orderResponse.data

        if(orderData.order.status != 'Paid'){
            return res.status(200).json({
                success: false,
                message: "Cannot create shipment for order that has not been paid!"
            })
        }

        let addressResponse = await axios.get(`${process.env.USER_SERVICE_URL}/addresses/get/${orderData.order.address_id}`)
        let addressData = addressResponse.data

        let shipment = new Shipment({
            shipment_id: "temp",
            order_id: orderId,
            recipient_name: orderData.order.fullname,
            recipient_phone_num: orderData.order.phone_number,
            city: addressData.address.city,
            district: addressData.address.district,
            avenue: addressData.address.avenue,
            specific: addressData.address.specific,
            total_item: orderData.order.total_item
        })

        shipment.shipment_id = shipment._id.toString()
        shipment.shipment_id.replace('new ObjectId(', '')
        shipment.shipment_id.replace(')', '')
        
        for (let i = 0; i < orderData.detail.length; i++) {
            let detail = new ShipmentDetail({
                shipment_id: shipment.shipment_id,
                product_name: orderData.detail[i].product_name,
                quantity: orderData.detail[i].quantity
            })
            await detail.save()
        }
        await shipment.save()
        let detail = await ShipmentDetail.find({shipment_id: shipment.shipment_id})
        return res.status(200).json({
            success: true,
            message: "Create shipment succeeded",
            shipment: shipment,
            detail: detail
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const updateShipmentById = async (req, res, next) => {
    try {
        let shipmentId = req.params.shipmentId
        let shipment = await Shipment.findOne({shipment_id: shipmentId})
        if(!shipment){
            return res.status(200).json({
                success: false,
                message: `Cannot find shipment ID ${shipmentId}`
            })
        }

        if(req.body.status){
            shipment.status = req.body.status
            let data = {status: shipment.status}
            let updateOrderStatus = await axios.put(`${process.env.ORDER_SERVICE_URL}/orders/update/${shipment.order_id}`, data)
            if(!updateOrderStatus.data.success){
                return res.status(200).json({
                    success: false,
                    message: "Cannot call put update order API"
                })
            }
        }

        await shipment.save()

        return res.status(200).json({
            success: true,
            message: "Updated shipment",
            shipment: shipment
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const deleteShipmentById = async (req, res, next) => {
    try {
        let shipmentId = req.params.shipmentId
        let shipment = await Shipment.findOne({shipment_id: shipmentId})
        if(!shipment){
            return res.status(400).json({
                success: false,
                message: `Cannot find shipment with ID ${shipmentId}`
            })
        }

        await ShipmentDetail.deleteMany({shipment_id: shipmentId})
        return res.status(200).json({
            success: true,
            message: "Deleted shipment"
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllShipment,
    getShipmentById,
    createShipment,
    updateShipmentById,
    deleteShipmentById
}