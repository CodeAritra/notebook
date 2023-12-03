import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  // const showAlert = props;
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getnote, editnote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnote();
    } 
    else {
      navigate("/login");
      console.log("login")
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNotes] = useState({ id: "", etitle: "", edescription: "" });

  const updateNote = (currentnote) => {
    ref.current.click();
    setNotes({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
    });
  };

  const handleclick = (note) => {
    console.log("Updating");
    editnote(note.id, note.etitle, note.edescription);
    refclose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onchange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote />

      {/* <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    value={note.edescription}
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>YOUR NOTES</h2>
        {notes.map((note) => {
          return (
            <Noteitems key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
