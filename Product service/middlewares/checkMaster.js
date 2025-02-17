const axios = require('axios')

const checkMaster = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        let token = header && header.split(" ")[1];
        if (!token) {
            return res.json({ 
                success: false,
                message: "Missing token!" 
            });
        }
        let config = {
            headers: {
                authorization: header
            }
          }
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/login/check`, config)
        if(!response){
            return res.json({ 
                success: false,
                message: "Cannot get response from user service!" 
            });
        }else{
            if(!response.data.user){
                return res.json({ 
                    success: false,
                    message: "Response do not return user data!" 
                });
            }
            req.user = response.data.user
            if(req.user.role == "Admin" || req.user.role == "Manager"){
                next()
            }else{
                return res.json({ 
                    success: false,
                    message: "Current user does not have permission!" 
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

module.exports = checkMaster