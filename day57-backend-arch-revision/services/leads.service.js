const leadModel = require("../models/leads.model");

// Create
const createLead = async (data) => {
    return await leadModel.create(data);
}

// Read all
const getallLeads = async () => {
    return await leadModel.find();
}

module.exports = {createLead, getallLeads};