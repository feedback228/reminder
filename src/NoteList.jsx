import React from "react";

export const NoteList = ({ notes, onDelete, onEdit, status }) => {
  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <p>{new Date(note.dateTime).toLocaleString()}</p>
          <p>Статус: {note.status}</p>
          <button onClick={() => onDelete(index)}>Удалить</button>
          <button onClick={() => onEdit(index, note.title, note.description, note.dateTime)}>Редактировать</button>
        </div>
      ))}
    </div>
  );
};


