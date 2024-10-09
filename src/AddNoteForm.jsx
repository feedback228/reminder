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
    <form onSubmit={(e) => {
      e.preventDefault();
      addNote(); 
    }}>
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
      <button type="submit">Добавить заметку</button>
    </form>
  );
};
