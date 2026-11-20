const express = require("express");
const router = express.Router();

const leadController = require("../controllers/leads.controller");
const validateLead = require("../middleware/validateLead.middleware");

router.post("/", validateLead, leadController.createLead);
router.get("/", leadController.getallLeads);

module.exports = router;