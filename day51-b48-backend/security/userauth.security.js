const authService = require("../services/userauth.service");
const jwt = require("jsonwebtoken");

// register user req & res connectivity to service
const registerApi = async(req, res, next) => {
    try{
        const {username, email, password, role} = req.body;

        if(!username || !email || !password || !role){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await authService.registerUser(username, email, password, role);

        res.status(201).json({message: "User account created"});
    }catch(err){
        next(err);
    }
}

const loginApi = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Both the fields are required"});
        };

        const user = await authService.loginUser(email, password);

        // token generation
        const token = jwt.sign(
            {userId: user._id, username: user.username, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES}
        );
        res.status(200).json({message: "Login Successful", token});
    }catch(err){
        next(err);
    }
}

module.exports = {registerApi, loginApi};