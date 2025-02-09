const Address = require("../models/addressModel")
const User = require("../models/userModel")

const getAllAddress = async (req, res, next) => {
    try {
        let addressList = await Address.find()
        if(!addressList){
            return res.status(400).json({
                success: false,
                message: "Cannot find address"
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `Get all address`,
                addresses: addressList
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const getAddressCurrentUser = async (req, res, next) => {
    try {
        let user = req.user
        let addressList = await Address.find({user_id: user.userId})
        return res.status(200).json({
            success: true,
            message: `Address of current user`,
            address: addressList
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAddressByUserId = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: `user ID is required`
            })
        }else{
            let user = User.findOne({user_id:userId})
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find user with ID ${userId}`
                })
            }else{
                let addressList = await Address.find({user_id: userId})
                return res.status(200).json({
                    success: true,
                    message: `Address of user ID ${userId}`,
                    address: addressList
                })
            }
        }
    }catch(error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAddressById = async (req, res, next) => {
    try {
        let addressId = req.params.addressId
        if(!addressId){
            return res.status(400).json({
                success: false,
                message: `Address ID is required`
            })
        }else{
            let address = await Address.findOne({address_id:addressId})
            if(!address){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find user with ID ${addressId}`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Address ID ${addressId}`,
                    address: address
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const createAddress = async (req,res,next) => {
    try {
        let user = req.user
        let city = req.body.city
        if(!city){
            return res.status(400).json({
                success: false,
                message: "City is required"
            })
        }
        let district = req.body.district
        if(!district){
            return res.status(400).json({
                success: false,
                message: "District is required"
            })
        }
        let avenue = req.body.avenue
        if(!avenue){
            return res.status(400).json({
                success: false,
                message: "Avenue is required"
            })
        }
        let specific = req.body.specific
        if(!specific){
            return res.status(400).json({
                success: false,
                message: "Specific address is required"
            })
        }
        
        let address = new Address({
            address_id: "temp",
            user_id: user.userId,
            city: city,
            district: district,
            avenue: avenue,
            specific: specific
        })
        address.address_id = address._id.toString()
        address.address_id.replace('new Object Id(', '')
        address.address_id.replace(')', '')

        let save = await address.save()
        if(save){
            return res.status(200).json({
                success: true,
                message: "Address saved!",
                address: address
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Address save failed!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const updateAddressById = async (req, res, next) =>{
    try {
        let user = req.user
        let addressId = req.params.addressId
        if(!addressId){
            return res.status(400).json({
                success: false,
                message: "Address Id is required!"
            })
        }else{
            let address = await Address.findOne({address_id: addressId})
            if(!address){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find address with ID ${addressId}`
                })
            }else {
                if(address.user_id != user.userId){
                    return res.status(400).json({
                        success: false,
                        message: `This address is not yours!`
                    })
                }
                let province = req.body.province
                if(province){
                    address.province = province
                }
                let district = req.body.district
                if(district){
                    address.district = district
                }
                let avenue = req.body.avenue
                if(avenue){
                    address.avenue = req.body.avenue
                }
                let specific = req.body.specific
                if(specific){
                    address.specific = specific
                }

                let save = await address.save()
                if(save){
                    return res.status(200).json({
                        success: true,
                        message: "Address updated!",
                        address: address
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
    
}

const deleteAddressById = async (req, res, next) => {
    try {
        let addressId = req.params.addressId
    if(!addressId){
        return res.status(400).json({
            success: false,
            message: "Address ID is required!"
        })
    }else{
        let user = req.user
        let address = await Address.findOne({address_id: addressId})
        if(!address){
            return res.status(400).json({
                success: false,
                message: `Cannot find address with ID ${addressId}`
            })
        }else{
            if(address.user_id != user.userId){
                return res.status(400).json({
                    success: false,
                    message: `This address is not yours!`
                })
            }
            let deleteAddress = await Address.deleteOne({address_id: addressId})
            if(deleteAddress){
                return res.status(200).json({
                    success: true,
                    message: `Deleted address`
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: `Deleted address failed`
                })
            }
        }
    }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllAddress,
    getAddressCurrentUser,
    getAddressByUserId,
    getAddressById,
    createAddress,
    updateAddressById,
    deleteAddressById
}