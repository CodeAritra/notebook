import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addnote } = context;
  // const showAlert=props;

  const [notes, setNotes] = useState({ title: "", description: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addnote(notes.title, notes.description);
    setNotes({ title: "", description: "" });
    // props.showAlert("Added successfully", "success");
  };

  const onchange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>ADD A NOTE</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={3}
            required
            value={notes.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
            minLength={3}
            required
            value={notes.description}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleclick}
          disabled={notes.title.length < 3 || notes.description.length < 3}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
