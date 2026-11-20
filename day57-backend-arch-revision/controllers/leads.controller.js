const leadService = require("../services/leads.service");

// Create
const createLead = async (req, res, next) => {
    try{
        const lead = await leadService.createLead(req.body);

        res.status(201).json({message: "Lead Created Successfully"});
    }catch(error){
        next(error);
    }
};

// Get All
const getallLeads = async (req, res, next) => {
    try{
        const leads = await leadService.getallLeads();

        res.status(200).json(leads);
    }catch(error){
        next(error);
    }
};

module.exports = {createLead, getallLeads};