const notesModel = require("../models/notesModels");

// GET ALL NOTES
const getAllNotes = async (req, res) => {
  try {
    const allNotes = await notesModel.findAll();
    res.status(200).json({
      message: "Notes retrieved successfully",
      data: allNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving notes",
      error: error.message,
    });
  }
};

// CREATE NOTE
const createNote = async (req, res) => {
  const { judul, isi } = req.body;

  try {
    const newNote = await notesModel.create({ judul, isi });
    res.status(201).json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }
};

// GET NOTE BY ID
const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await notesModel.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note retrieved successfully",
      data: note,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving note",
      error: error.message,
    });
  }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;

  try {
    const note = await notesModel.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const updatedNote = await notesModel.updateById(id, { judul, isi });
    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};

// DELETE NOTE
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await notesModel.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const deletedNote = await notesModel.deleteById(id);
    res.status(200).json({
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};