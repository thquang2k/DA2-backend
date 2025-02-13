const Coupon = require('../models/couponModel')
const generateRandomString = require('../utils/generateCoupon')

const getAllCoupon = async (req, res, next) => {
    try {
        let coupons = await Coupon.find()
        if(!coupons){
            return res.status(400).json({
                success: false,
                message: "Cannot find all coupons"
            })
        }else{
            return res.status(200).json({
                success: true,
                message: "Get all coupons succeeded",
                coupons: coupons
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}
const getCouponById = async (req, res, next) => {
    try {
        let couponId = req.params.couponId
        if(!couponId){
            return res.status(400).json({
                success: false,
                message: "require coupon ID"
            })
        }else{
            let coupon = await Coupon.findOne({coupon_id: couponId})
            if(!coupon){
                return res.status(400).json({
                    success: false,
                    message: `coupon with ID ${couponId} is not exist`
                }) 
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get coupon ID ${couponId} succeeded`,
                    coupon: coupon
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const createCoupon = async (req, res, next) => {
    try {
        let expiredAt = req.body.expiredAt
        if(!expiredAt){
            return res.status(400).json({
                success: false,
                message: `Require expire date`
            })
        }

        let coupon = new Coupon({
            expired_at: expiredAt
        })

        if(req.body.discountRate && req.body.discountAmount){
            return res.status(400).json({
                success: false,
                message: `Only 1 field in discount rate or discount amount`
            })
        }else if(!req.body.discountRate && !req.body.discountAmount){
            return res.status(400).json({
                success: false,
                message: `Required 1 field discount rate or discount amount`
            })
        }else{
            if(req.body.discountRate){
                coupon.discount_rate = req.body.discountRate
                coupon.discount_amount = 0
            }else{
                coupon.discount_amount = req.body.discountAmount
                coupon.discount_rate = 0
            }
        }
        coupon.coupon_code = generateRandomString(12)
        coupon.coupon_id = coupon._id.toString()
        coupon.coupon_id.replace('new ObjectId(', '')
        coupon.coupon_id.replace(')', '')

        let save = await coupon.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: "Cannot save coupon"
            })
        }else{
            return res.status(200).json({
                success: true,
                message: "Created coupon",
                coupon: coupon
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const updateCouponByCode = async (req, res, next) => {
    try {
        let couponCode = req.params.couponCode
        if(!couponCode){
            return res.status(400).json({
                success: false,
                message: "require coupon Code"
            })
        }else{
            let coupon = await Coupon.findOne({coupon_code: couponCode})
            if(!coupon){
                return res.status(400).json({
                    success: false,
                    message: `coupon with code ${couponCode} is not exist`
                }) 
            }else{
                if(req.body.discountRate && req.body.discountAmount){
                    return res.status(400).json({
                        success: false,
                        message: `Only 1 field in discount rate or discount amount`
                    })
                }else if(!req.body.discountRate && !req.body.discountAmount){
                    return res.status(400).json({
                        success: false,
                        message: `Required 1 field discount rate or discount amount`
                    })
                }else{
                    if(req.body.discountRate){
                        coupon.discount_rate = req.body.discountRate
                    }else{
                        coupon.discount_amount = req.body.discountAmount
                    }
                }
                if(req.body.isUsed){
                    coupon.is_used = req.body.isUsed
                }
                if(req.body.expiredAt){
                    coupon.expired_at = req.body.expiredAt
                }

                let save = await coupon.save()
                if(!save){
                    return res.status(400).json({
                        success: false,
                        message: "Cannot save coupon"
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: "Updated coupon",
                        coupon: coupon
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const deleteCouponById = async (req, res, next) => {
    try {
        let couponId = req.params.couponId
        if(!couponId){
            return res.status(400).json({
                success: false,
                message: "require coupon ID"
            })
        }else{
            let coupon = await Coupon.findOne({coupon_id: couponId})
            if(!coupon){
                return res.status(400).json({
                    success: false,
                    message: `coupon with ID ${couponId} is not exist`
                }) 
            }else{
                await Coupon.findOneAndDelete({coupon_id: couponId})
                return res.status(200).json({
                    success: true,
                    message: `Deleted coupon ID ${couponId}`,
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllCoupon,
    getCouponById,
    createCoupon,
    updateCouponByCode,
    deleteCouponById
}