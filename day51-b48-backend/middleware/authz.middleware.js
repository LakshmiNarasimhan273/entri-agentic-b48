const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = (...allowedRoles) => {
    return async (req, res, next) => {
        try{
            // authz logics
            // 1. Get token from request headers
            const authHeaders = req.headers.authorization;
            // Bearer vlanjdslajngleurgljefn
            if(!authHeaders || !authHeaders.startsWith("Bearer ")){
                return res.status(401).json({message: "Access Denied. Token Missing"});
            }
            // We need to segregate the Bearer word and the token

            const token = authHeaders.split(" ")[1];
            // 2. Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // 3. Find the logged-in user with DB (A dual Check)
            const user = await userModel.findById(decoded.userId).select("-password");
            if(!user){
                return res.status(404).json({
                    message: "User not found"
                })
            }
            // 4. Attach the user details to request
            req.user = user;

            // 5. RBAC - Role Based Access Control
            if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
                return res.status(403).json({
                    message: "Forbidden. You don't have permission to access this"
                });
            }
            
            // 6. Allow request to continue
            next();

        }catch(err){
            return res.status(401).json({
                message: "Invalid Token"
            });
        }
    }
}

module.exports = authMiddleware;