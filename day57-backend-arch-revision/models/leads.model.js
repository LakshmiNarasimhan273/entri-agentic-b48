const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Converted", "Rejected"],
        default: "New"
    }
});

const Lead = mongoose.model("leads", leadSchema);

module.exports = Lead;