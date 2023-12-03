const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const Notes = require("../models/Notes.js");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all notes using : GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  let notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//ROUTE 2: Add a new note using : GET "/api/notes/addnotes"
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description } = req.body;
    //if there are error , return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({
        title,
        description,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 3: Updating a note using : GET "/api/notes/updatenotes"
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description } = req.body;
  //Create a new note
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }

  //Find the note to be updated
  let notes = await Notes.findById(req.params.id);
  if (!notes) {
    res.status(404).send("Not Found");
  }
  //Allow update if user owns the note
  if(notes.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  notes = await Notes.findByIdAndUpdate(req.params.id, {$set:newnote},{new:true});

  res.json({ notes });
});

//ROUTE 4: Deleting a note using : DELETE "/api/notes/deletenotes"
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const { title, description } = req.body;

  //Find the note to be deleted
  let notes = await Notes.findById(req.params.id);
  if (!notes) {
    res.status(404).send("Not Found");
  }
  //Allow deletion if user owns the note
  if (notes.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  notes = await Notes.findByIdAndDelete(req.params.id);

  res.json({ Success: "note has been deleted", notes: notes });
});

module.exports = router;
