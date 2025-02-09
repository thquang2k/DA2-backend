const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const getCurrentUser = async (req, res, next) => {
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
        if(user){
            req.user = user
            next()
        }else {
            return res.json({ success: false, message: "User not login!" });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

module.exports = getCurrentUser;