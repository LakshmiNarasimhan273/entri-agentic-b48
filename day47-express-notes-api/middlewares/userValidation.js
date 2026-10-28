function validateRegister(req, res, next){
    const {name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({message: "Name and Mail are required"});
    }

    next();
}

function validateLogin(req, res, next){
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message: "EMail is required"});
    }

    next();
}

module.exports = {validateRegister, validateLogin};