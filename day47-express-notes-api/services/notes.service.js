const notesModel = require("../models/notes.model");

// Read
const getallNotes = () => {
    return notesModel;
}

// Create
function createNote(title, content){
    const newNote = {
        id: Date.now(),
        title, 
        content
    };

    notesModel.push(newNote);
    return newNote;
}

// Update
function updateNote(id, title, content){
    const note = notesModel.find(data => data.id === Number(id));

    if(!note){
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    // update logic
    note.title = title || note.title;
    note.content = content || note.content;

    return note;
}

// Delete
function deleteNote(id){
    const index = notesModel.findIndex(data => data.id === Number(id));

    if(index === -1){
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    notesModel.splice(index, 1);
}

module.exports = {
    getallNotes, createNote, updateNote, deleteNote
}