const axios = require('axios')

const User = require('../models/userModel')
const Role = require('../models/roleModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUser = async (req, res, next) => {
    try {
        let users = await User.find().select("-password");
        return res.status(200).json({
            success: true,
            users: users,
            message: "Get all users succeeded!"
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const getUserById = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                users: users,
                message: "User ID is required"
            })
        }else{
            let user = await User.findOne({user_id: userId}).select("-password");
            return res.status(200).json({
                success: true,
                user: user,
                message: `Get user by ID ${userId}`
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const fetchUserData = async (req, res, next) => {
    try {
        let user = req.user
        console.log(user)
        if(!user){
            return res.status(400).json({
                success: false,
                message: `Not login`
            })
        }else{
            let userData = await User.findOne({user_id: user.userId}).select("-password")
            return res.status(200).json({
                success: true,
                message: `Fetch user data succeeded!`,
                user: userData
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const createUser = async (req, res, next) => {
    try {
        let username = req.body.username
        if(!username){
            return res.status(400).json({
                success: false,
                message: "Username is required"
            })
        }else{
            let user = await User.findOne({user_name: username})
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "Username is used"
                })
            }
        }
        let fullname = req.body.fullname
        if(!fullname){
            return res.status(400).json({
                success: false,
                message: "Fullname is required"
            })
        }
        let phoneNumber = req.body.phoneNumber
        if(!phoneNumber){
            return res.status(400).json({
                success: false,
                message: "Phone number is required"
            })
        }
        let email = req.body.email
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }
        let password = req.body.password
        if(!password){
            return res.status(400).json({
                success: false,
                message: "password is required"
            })
        }
        let roleId = req.body.roleId
        if(!roleId){
            return res.status(400).json({
                success: false,
                message: "Role is required"
            })
        }

        let hashedPassword = bcrypt.hashSync(password, 10)
        let user = new User({
            user_id: "test",
            user_name: username,
            full_name: fullname,
            phone_num: phoneNumber,
            email: email,
            password: hashedPassword,
            role_id: roleId
        })
        user.user_id = user._id.toString()
        user.user_id.replace('new Object Id(', '')
        user.user_id.replace(')', '')
        
        let data = { userId: user.user_id}
        let response = await axios.post(`${process.env.PRODUCT_SERVICE_URL}/cart/create`, data)
        console.log(response)
        if(response.data.success){
            let save = await user.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: "cannot save user"
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: "created user!",
                    user: user
                })
            }
        }else{
            return res.status(400).json({
                success: false,
                message: "Cannot post create cart request"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const loginByAccount = async (req, res, next) => {
    try {
        //Get body params
        let username = req.body.username
        let password = req.body.password
        // Verify empty/undified/null
        if(!username){
            return res.status(400).json({
                success: false,
                message: `Username is required`
            })
        }else{
            //Check user exist
            let user = await User.findOne({user_name: username})
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: `Username is not exist`
                })
            }else{
                //Check pass empty/undified/null
                if(!password){
                    return res.status(400).json({
                        success: false,
                        message: `Password is required`
                    })
                }else{
                    //Compare password
                    if(!bcrypt.compareSync(password, user.password)){
                        return res.status(400).json({
                            success: false,
                            message: `Username or password is wrong!`
                        })
                    }else{
                        //Login succeed
                        //Create payload
                        const payload = {
                            userId: user.user_id,
                            username: user.user_name
                        }
                        let role = await Role.findOne({role_id: user.role_id})
                        //Check role exist
                        if(!role){
                            return res.status(400).json({
                                success: false,
                                message: `Role ID ${user.role_id} is not exist!`
                            })
                        }else{
                            payload.role = role.role_name
                        }
                        
                        //Token generate
                        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                            expiresIn: "1h"
                        })
                        return res.status(200).json({
                            success: true,
                            message: `Login succeeded!`,
                            token: accessToken
                        })
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const checkLoginByToken = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        let token = header && header.split(" ")[1];
        if (!token) {
            return res.json({ 
                success: false, 
                message: "Missing token!" });
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded;
        if (user) {
            return res.json({ 
                success: true, 
                message: "Fetch current user!",
                user: user
            })
        } else {
            return res.json({ 
                success: false, 
                message: "User not login!" });
        }
    } catch (error) {
        return res.json({
            message: `Error: ${error.message}` 
        });
    }
}

const updateUserById = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: `User ID required!`
            })
        }else{
            let user = await User.findOne({user_id: userId})
            let oldUser = user
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: `User with ID ${userId} is not exist!`
                })
            }else{
                let phoneNumber = req.body.phoneNumber
                if(phoneNumber){
                    user.phone_num = phoneNumber
                }

                let email = req.body.email
                if(email){
                    user.email = email
                }
                let password = req.body.password
                if(password){
                    let hashedPassword = bcrypt.hashSync(password, 10)
                    user.password = hashedPassword
                }
                let roleId = req.body.roleId
                if(roleId){
                    user.role_id = roleId
                }

                let save =await user.save()
                if(!save){
                    return res.status(400).json({
                        success: false,
                        message: "cannot save user"
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: "updated user!",
                        user: user
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

const updateCurrentUser = async (req, res, next) => {
    try {
        let user = req.user
        let userData = await User.findOne({user_id: user.userId})
        let phoneNumber = req.body.phoneNumber
        if(phoneNumber){
            userData.phone_num = phoneNumber
        }

        let email = req.body.email
        if(email){
            userData.email = email
        }
        let password = req.body.password
        if(password){
            let hashedPassword = bcrypt.hashSync(password, 10)
            userData.password = hashedPassword
        }
        let roleId = req.body.roleId
        if(roleId){
            userData.role_id = roleId
        }

        let save =await userData.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: "cannot save user"
            })
        }else{
            let payload = {
                userId: userData.user_id,
                username: userData.user_name
            }
            let role = await Role.findOne({role_id: userData.role_id})
            if(!role){
                return res.status(400).json({
                    success: false,
                    message: `Cannot get role with ID ${userData.role_id}`
                })
            }else{
                payload.role = role.role_name
            }

            let accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            return res.status(200).json({
                success: true,
                message: "updated user!",
                user: userData,
                token: accessToken
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: `User ID required!`
            })
        }else{
            let user = await User.findOne({user_id: userId})
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: `User with ID ${userId} is not exist!`
                })
            }else{
                let data = { userId: user.user_id}
                let response = await axios.delete(`${process.env.PRODUCT_SERVICE_URL}/cart/delete`, data)
                if(response.data.success){
                    await User.findOneAndDelete({user_id: userId})
                    return res.status(200).json({
                        success: true,
                        message: "deleted user!",
                    })

                }else{
                    return res.status(400).json({
                        success: false,
                        message: "cannot remove cart from delete request!",
                    })
                }
                
            }
        }
    }catch(error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
module.exports = {
    getAllUser,
    getUserById,
    fetchUserData,
    createUser,
    updateUserById,
    updateCurrentUser,
    deleteUserById,
    loginByAccount,
    checkLoginByToken
}