import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <p className="note-title m-2 font-bold text-2xl">{note.title}</p>
            <p className="note-content m-2">{note.content}</p>
            <p className="note-date m-2 text-lg">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                completed
            </button>
        </div>
    );
}  

export default Note