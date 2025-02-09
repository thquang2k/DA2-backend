const bcrypt = require('bcrypt')

const User = require('../models/userModel')

const CreateSuperAdmin = async () => {
    try {
        let admin  = await User.findOne({role_id: "0"});
        if(!admin){
            admin = new User({
                user_id: process.env.ADMIN_ID,
                user_name: process.env.ADMIN_USERNAME,
                full_name: "admin",
                phone_num: "0",
                email: process.env.ADMIN_EMAIL,
                password: hashed_password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10, (error) => {
                    if(error){
                        console.error(`Error hash: ${error.message}`)
                        process.exit(1);
                    }
                }),
                role_id: "0"
            })
            let save = await admin.save()
            if(save){
                console.log("Admin has been initialized!")
            }
        }else{
            console.log("Admin has already been initialized!")
        }
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

module.exports = {
    CreateSuperAdmin
}