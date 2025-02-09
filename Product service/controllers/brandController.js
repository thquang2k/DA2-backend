const Brand = require('../models/brandModel')

const getAllBrand = async (req, res, next) => {
    try {
        let brands = await Brand.find()
    if(!brands){
        return res.status(400).json({
            success: false,
            message: "Cannot get all brands"
        })
    }else{
        return res.status(200).json({
            success: true,
            message: "Get all brands succeeded!",
            brands: brands
        })
    }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }   
}

const getBrandById = async (req, res, next) => {
    try {
        let brandId =req.params.brandId
        if(!brandId){
            return res.status(400).json({
                success: false,
                message: "Brand ID is required!"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                return res.status(400).json({
                    success: false,
                    message: `Brand with ID ${brandId} is not exist`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get Brand with ID ${brandId} succeeded`,
                    brand: brand
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const createBrand = async (req, res, next) => {
    try {
        let brandId =req.body.brandId
        if(!brandId){
            return res.status(400).json({
                success: false,
                message: "Brand ID is required!"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(brand){
                return res.status(400).json({
                    success: false,
                    message: `Brand ID ${brandId} has been used`
                })
            }
        }
        let brandName =req.body.brandName
        if(!brandName){
            return res.status(400).json({
                success: false,
                message: "Brand Name is required!"
            })
        }
        let brand = new Brand({
            brand_id: brandId,
            brand_name: brandName
        })

        let save = await brand.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: `Cannot save brand`
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `New brand created`,
                brand: brand
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const updateBrandById = async (req, res, next) => {
    try {
        let brandId =req.params.brandId
        if(!brandId){
            return res.status(400).json({
                success: false,
                message: "Brand ID is required!"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                return res.status(400).json({
                    success: false,
                    message: `Brand ID ${brandId} is not exist`
                })
            }
            let brandName =req.body.brandName
            if(brandName){
                brand.brand_name = brandName
            }
            let save = await brand.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: `Cannot save brand`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Brand updated`,
                    brand: brand
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const deleteBrandById = async (req, res, next) => {
    try {
        let brandId =req.params.brandId
        if(!brandId){
            return res.status(400).json({
                success: false,
                message: "Brand ID is required!"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                return res.status(400).json({
                    success: false,
                    message: `Brand ID ${brandId} is not exist`
                })
            }else{
                let deleted = await Brand.findOneAndDelete({brand_id: brandId})
                if(!deleted){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot delete brand`
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: `Brand deleted`
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
    getAllBrand,
    getBrandById,
    createBrand,
    updateBrandById,
    deleteBrandById
}