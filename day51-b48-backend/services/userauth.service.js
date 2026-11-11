const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

// register user
const registerUser = async (username, email, password, role) => {
    const existingUser = await userModel.findOne({email});

    if(existingUser){
        throw new Error("Email Already Exists");
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create(
        {username, email, password: hashedPassword, role}
    );
    return user;
}

// login user
const loginUser = async (email, password) => {
    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch){
        throw new Error("Invalid email or password");
    }

    return user;
}

module.exports = {registerUser, loginUser};