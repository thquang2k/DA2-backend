const Origin = require('../models/originModel')

const getAllOrigin = async (req, res, next) => {
    try {
        let origins = await Origin.find()
    if(!origins){
        return res.status(400).json({
            success: false,
            message: "Cannot get all origins"
        })
    }else{
        return res.status(200).json({
            success: true,
            message: "Get all origins succeeded!",
            origins: origins
        })
    }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }   
}

const getOriginById = async (req, res, next) => {
    try {
        let originId =req.params.originId
        if(!originId){
            return res.status(400).json({
                success: false,
                message: "Origin ID is required!"
            })
        }else{
            let origin = await Origin.findOne({origin_id: originId})
            if(!origin){
                return res.status(400).json({
                    success: false,
                    message: `Origin with ID ${originId} is not exist`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get Origin with ID ${originId} succeeded`,
                    origin: origin
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const createOrigin = async (req, res, next) => {
    try {
        let originId =req.body.originId
        if(!originId){
            return res.status(400).json({
                success: false,
                message: "Origin ID is required!"
            })
        }else{
            let origin = await Origin.findOne({origin_id: originId})
            if(origin){
                return res.status(400).json({
                    success: false,
                    message: `Origin ID ${originId} has been used`
                })
            }
        }
        let country =req.body.country
        if(!country){
            return res.status(400).json({
                success: false,
                message: "Country is required!"
            })
        }
        let origin = new Origin({
            origin_id: originId,
            country: country
        })

        let save = await origin.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: `Cannot save origin`
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `New origin created`,
                origin: origin
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const updateOriginById = async (req, res, next) => {
    try {
        let originId =req.params.originId
        if(!originId){
            return res.status(400).json({
                success: false,
                message: "Origin ID is required!"
            })
        }else{
            let origin = await Origin.findOne({origin_id: originId})
            if(!origin){
                return res.status(400).json({
                    success: false,
                    message: `Origin ID ${originId} is not exist`
                })
            }
            let country =req.body.country
            if(country){
                origin.country = country
            }
            let save = await origin.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: `Cannot save origin`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Origin updated`,
                    origin: origin
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const deleteOriginById = async (req, res, next) => {
    try {
        let originId =req.params.originId
        if(!originId){
            return res.status(400).json({
                success: false,
                message: "Origin ID is required!"
            })
        }else{
            let origin = await Origin.findOne({origin_id: originId})
            if(!origin){
                return res.status(400).json({
                    success: false,
                    message: `Origin ID ${originId} is not exist`
                })
            }else{
                let deleted = await Origin.findOneAndDelete({origin_id: originId})
                if(!deleted){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot delete origin`
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: `Origin deleted`
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
    getAllOrigin,
    getOriginById,
    createOrigin,
    updateOriginById,
    deleteOriginById
}