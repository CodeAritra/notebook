import React, { useState } from "react";
import noteContext from "./noteContext";

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  //get all notes
  const getnote = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add note
  const addnote = async (title, description) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete note
  const deletenote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  //Edit note
  const editnote = async (id, title, description) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    console.log(newNotes);
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addnote, deletenote, getnote, editnote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NotesState;
