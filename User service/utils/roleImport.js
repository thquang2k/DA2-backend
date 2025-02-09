const Role = require('../models/roleModel')

const ROLES = [{
    id: "0",
    name: "Admin"
},
{
    id: "1",
    name: "Manager"
},
{
    id: "2",
    name: "Staff"
},
{
    id: "10",
    name: "Customer"
}]

const ImportRole = async () => {
    try {
        let roles  = await Role.countDocuments();
        if(roles == 0){
            ROLES.forEach(async (role) => {
                roleData = new Role({
                    role_id: role.id,
                    role_name: role.name
                })
                let save = await roleData.save()
                if(!save){
                    console.log("Cannot save role data")
                }
            });
            console.log("Role data has been initialized!")
        }else{
            console.log("Role data has been already initialized!")
        }
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

module.exports = {
    ImportRole
}