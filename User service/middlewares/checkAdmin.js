const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const checkAdmin = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        let token = header && header.split(" ")[1];
        if (!token) {
            return res.status(400).json({ 
                success: false,
                message: "Missing token!" });
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded;
        if(user){
            if (user.role != "Admin") {
                return res.status(405).json({ 
                    success: false,
                    message: "You don't have permission to access!" 
                });
            }else{
                next()
            }
        }else {
            return res.status(401).json({ success: false, message: "User not login!" });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

module.exports = checkAdmin;