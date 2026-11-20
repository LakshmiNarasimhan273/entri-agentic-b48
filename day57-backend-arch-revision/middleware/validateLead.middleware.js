const validateLead = (req, res, next) => {
    const {name, email, course, status} = req.body;

    if(!name || !email || !course || !status){
        return res.status(400).json({message: "All the fileds are required"});
    }

    if(!email.includes("@")){
        return res.status(400).json({message: "Please enter a valid email address"});
    }
    next();
};

module.exports = validateLead;