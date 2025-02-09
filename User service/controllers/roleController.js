const Role = require("../models/roleModel")

const getAllRole = async (req, res, next) => {
    try {
        let roles = await Role.find()
        if(!roles){
            return res.status(400).json({
                success: false,
                message: "Cannot find roles"
            })
        }else{
            return res.status(200).json({
                success: true,
                message: "Get all roles succeeded!",
                roles: roles
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const createRole = async (req, res, next) => {
    try {
        let roleName = req.body.roleName
        if(!roleName){
            return res.status(400).json({
                success: false,
                message: "Role name Required"
            })
        }
        let roleId = req.body.roleId
        if(!roleId){
            return res.status(400).json({
                success: false,
                message: "Role ID Required"
            })
        }else{
            let roleIdCheck = await Role.findOne({role_id: roleId})
            if(roleIdCheck){
                return res.status(400).json({
                    success: false,
                    message: "Role ID is used"
                })
            }
        }

        let role = new Role({
            role_id: roleId,
            role_name: roleName
        })

        let save = await role.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: "Role cannot save"
            })
        }else{
            return res.status(200).json({
                success: true,
                message: "New role added!",
                role: role
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const updateRoleById = async (req, res, next) => {
    try {
        let roleId = req.params.roleId
        if(!roleId){
            return res.status(400).json({
                success: false,
                message: `Role ID is required`
            })
        }

        let role = await Role.findOne({role_id: roleId})
        if(!role){
            return res.status(400).json({
                success: false,
                message: `Role with ID ${roleId} is not exist!`
            })
        }else{
            let roleName = req.body.roleName
            if(roleName){
                role.role_name = roleName   
            }

            let save = await role.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: `Cannot save role!`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Role updated!`,
                    role: role
                })
            }
            

        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const deleteRoleById = async (req, res, next) => {
    try {
        let roleId = req.params.roleId
        if(!roleId){
            return res.status(400).json({
                success: false,
                message: `Role ID is required`
            })
        }

        let role = await Role.findOne({role_id: roleId})
        if(!role){
            return res.status(400).json({
                success: false,
                message: `Role with ID ${roleId} is not exist!`
            })
        }else{
            let deleteRole = await Role.findOneAndDelete({role_id: roleId})
            if(!deleteRole){
                return res.status(400).json({
                    success: false,
                    message: `Cannot save role!`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Role deleted!`
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllRole,
    createRole,
    updateRoleById,
    deleteRoleById
}
