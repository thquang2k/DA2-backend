const Promotion = require('../models/promotionModel')

const getAllPromotion = async (req, res, next) => {
    try {
        let promotions = await Promotion.find()
    if(!promotions){
        return res.status(400).json({
            success: false,
            message: "Cannot get all promotion"
        })
    }else{
        return res.status(200).json({
            success: true,
            message: "Get all promotions succeeded!",
            promotions: promotions
        })
    }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }   
}

const getPromotionById = async (req, res, next) => {
    try {
        let promotionId =req.params.promotionId
        if(!promotionId){
            return res.status(400).json({
                success: false,
                message: "Promotion ID is required!"
            })
        }else{
            let promotion = await Promotion.findOne({promotion_id: promotionId})
            if(!promotion){
                return res.status(400).json({
                    success: false,
                    message: `Promotion with ID ${promotionId} is not exist`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get Promotion with ID ${promotionId} succeeded`,
                    promotion: promotion
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const createPromotion = async (req, res, next) => {
    try {
        let promotionId =req.body.promotionId
        if(!promotionId){
            return res.status(400).json({
                success: false,
                message: "Promotion ID is required!"
            })
        }else{
            let promotion = await Promotion.findOne({promotion_id: promotionId})
            if(promotion){
                return res.status(400).json({
                    success: false,
                    message: `Promotin ID ${promotionId} has been used`
                })
            }
        }
        let promotionName =req.body.promotionName
        if(!promotionName){
            return res.status(400).json({
                success: false,
                message: "Promotion Name is required!"
            })
        }
        let promotionRate =req.body.promotionRate
        if(!promotionRate){
            return res.status(400).json({
                success: false,
                message: "Promotion Rate is required!"
            })
        }
        let promotionStart =req.body.promotionStart
        if(!promotionStart){
            return res.status(400).json({
                success: false,
                message: "Promotion start date is required!"
            })
        }
        let promotionEnd =req.body.promotionEnd
        if(!promotionEnd){
            return res.status(400).json({
                success: false,
                message: "Promotion end date is required!"
            })
        }else{
            if(promotionEnd < promotionStart){
                return res.status(400).json({
                    success: false,
                    message: "Promotion end is earlier than promotion start!"
                })
            }
        }
        let promotion = new Promotion({
            promotion_id: promotionId,
            promotion_name: promotionName,
            promotion_rate: promotionRate,
            start_date: promotionStart,
            end_date: promotionEnd
        })

        let save = await promotion.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: `Cannot save promotion`
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `New promotion created`,
                promotion: promotion
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const updatePromotionById = async (req, res, next) => {
    try {
        let promotionId =req.params.promotionId
        if(!promotionId){
            return res.status(400).json({
                success: false,
                message: "Promotion ID is required!"
            })
        }else{
            let promotion = await Promotion.findOne({promotion_id: promotionId})
            if(!promotion){
                return res.status(400).json({
                    success: false,
                    message: `Promotion ID ${promotionId} is not exist`
                })
            }
            let promotionName =req.body.promotionName
            if(promotionName){
                promotion.promotion_name = promotionName
            }
            let promotionRate =req.body.promotionRate
            if(promotionRate){
                promotion.promotion_rate = promotionRate
            }
            let promotionStart =req.body.promotionStart
            if(promotionStart){
                promotion.start_date = promotionStart
            }
            let promotionEnd =req.body.promotionEnd
            if(promotionStart){
                promotion.end_date = promotionEnd
            }
            
            let save = await promotion.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: `Cannot save promotion`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Promotion updated`,
                    promotion: promotion
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const deletePromotionById = async (req, res, next) => {
    try {
        let promotionId =req.params.promotionId
        if(!promotionId){
            return res.status(400).json({
                success: false,
                message: "Promotion ID is required!"
            })
        }else{
            let promotion = await Promotion.findOne({promotion_id: promotionId})
            if(!promotion){
                return res.status(400).json({
                    success: false,
                    message: `Promotion ID ${promotionId} is not exist`
                })
            }else{
                let deleted = await Promotion.findOneAndDelete({promotion_id: promotionId})
                if(!deleted){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot delete promotion`
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: `Promotion deleted`
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

module.exports = {
    getAllPromotion,
    getPromotionById,
    createPromotion,
    updatePromotionById,
    deletePromotionById
}