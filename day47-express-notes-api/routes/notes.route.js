const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes.controller");
const notesValidation = require("../middlewares/noteValidation");

// localhost:8081/api/users/128376127
router.get("/", notesController.getNotes);
router.post("/", notesValidation, notesController.addNote);
router.put("/:id", notesValidation, notesController.editNote);
router.delete("/:id", notesController.removeNote);

module.exports = router;