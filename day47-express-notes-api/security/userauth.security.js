const userService = require("../services/users.service");

function registerUser(req, res, next){
    try{
        const {name, email} = req.body;
        const user = userService.registerUser(name, email);

        res.status(201).json({message: "User account created", user});
    }catch(error){
        next(error)
    }
}

// login function
function loginUser(req, res){
    const {email} = req.body;

    const user = userService.findUser(email);

    if(!user){
        return res.status(404).json({message: "User account not found"});
    }
    res.status(200).json({message: "Login successful", user});
}

module.exports = {registerUser, loginUser}