const noteService = require("../services/notes.service");

// Get all notes
function getNotes(req, res, next){
    try{
        res.status(200).json(noteService.getallNotes);
    }catch(error){
        next(error);
    }
}

function addNote(req, res, next){
    try{
        const {title, content} = req.body;

        const note = noteService.createNote(title, content);

        res.status(201).json({message: "Note created", note});
    }catch(error){
        next(error);
    }
}

function editNote(req, res, next){
    try{
        const {title, content} = req.body;

        const note = noteService.updateNote(req.params.id, title, content);
        res.status(200).json({message: "Note updated", note});
    }catch(error){
        next(error);
    }
}

function removeNote(req, res, next){
    try{
        noteService.deleteNote(req.params.id);

        res.status(200).json({message: "Note deleted"});
    }catch(error){
        next(error);
    }
}

module.exports = {getNotes, addNote, editNote, removeNote};