import React from "react";
import { Note } from "./Note";

export const NoteList = ({ notes, onDelete, onEdit, status }) => {
  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <Note
          key={index}
          title={note.title}
          description={note.description}
          dateTime={note.dateTime}
          onDelete={() => onDelete(index)}
          status={note.status}
          onEdit={(newTitle, newDescription, newDateTime) =>
            onEdit(index, newTitle, newDescription, newDateTime)
          }
        />
      ))}
    </div>
  );
};
