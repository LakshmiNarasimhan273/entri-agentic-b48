const userModel = require("../models/users.model");

function getallUsers(){
    return userModel;
}

// api logics
function registerUser(name, email){
    const existingUser = userModel.find(data => data.email === email);
    // if matches -> existingUser (true)
    if(existingUser){
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const newUser = {
        id: Date.now(),
        name,
        email
    }

    userModel.push(newUser);
    return newUser;
};

function findUser(email){
    return userModel.find(data => data.email === email);
}

module.exports = {getallUsers, registerUser, findUser};