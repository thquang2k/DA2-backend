const Color = require('../models/colorModel')

const getAllColor = async (req, res, next) => {
    try {
        let colors = await Color.find()
    if(!colors){
        return res.status(400).json({
            success: false,
            message: "Cannot get all colors"
        })
    }else{
        return res.status(200).json({
            success: true,
            message: "Get all colors succeeded!",
            colors: colors
        })
    }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }   
}

const getColorById = async (req, res, next) => {
    try {
        let colorId =req.params.colorId
        if(!colorId){
            return res.status(400).json({
                success: false,
                message: "Color ID is required!"
            })
        }else{
            let color = await Color.findOne({color_id: colorId})
            if(!color){
                return res.status(400).json({
                    success: false,
                    message: `Color with ID ${colorId} is not exist`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get Color with ID ${colorId} succeeded`,
                    color: color
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const createColor = async (req, res, next) => {
    try {
        let colorId =req.body.colorId
        if(!colorId){
            return res.status(400).json({
                success: false,
                message: "Color ID is required!"
            })
        }else{
            let color = await Color.findOne({color_id: colorId})
            if(color){
                return res.status(400).json({
                    success: false,
                    message: `Color ID ${colorId} has been used`
                })
            }
        }
        let color =req.body.color
        if(!color){
            return res.status(400).json({
                success: false,
                message: "Color is required!"
            })
        }
        let colorData = new Color({
            color_id: colorId,
            color: color
        })

        let save = await colorData.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: `Cannot save color`
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `New color created`,
                color: color
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const updateColorById = async (req, res, next) => {
    try {
        let colorId =req.params.colorId
        if(!colorId){
            return res.status(400).json({
                success: false,
                message: "Color ID is required!"
            })
        }else{
            let colorData = await Color.findOne({color_id: colorId})
            if(!colorData){
                return res.status(400).json({
                    success: false,
                    message: `Color ID ${colorId} is not exist`
                })
            }
            let color =req.body.color
            if(color){
                colorData.color = color
            }
            let save = await colorData.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: `Cannot save color`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Color updated`,
                    color: colorData
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const deleteColorById = async (req, res, next) => {
    try {
        let colorId =req.params.colorId
        if(!colorId){
            return res.status(400).json({
                success: false,
                message: "Color ID is required!"
            })
        }else{
            let color = await Color.findOne({color_id: colorId})
            if(!color){
                return res.status(400).json({
                    success: false,
                    message: `Color ID ${colorId} is not exist`
                })
            }else{
                let deleted = await Color.findOneAndDelete({color_id: colorId})
                if(!deleted){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot delete color`
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: `Color deleted`
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
    getAllColor,
    getColorById,
    createColor,
    updateColorById,
    deleteColorById
}