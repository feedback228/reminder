import React from "react";

export const AddNoteForm = ({
  newTitle,
  newDescription,
  newDateTime,
  handleTitleChange,
  handleDescriptionChange,
  handleDateChange,
  addNote,
}) => {
  return (
    <div className="add">
      <h1>Добавить напоминалку</h1>
      <input
        type="text"
        placeholder="Заголовок"
        value={newTitle}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Описание"
        value={newDescription}
        onChange={handleDescriptionChange}
      />
      <input
        type="datetime-local"
        value={newDateTime}
        onChange={handleDateChange}
      />
      <button onClick={addNote}>Добавить</button>
    </div>
  );
};


