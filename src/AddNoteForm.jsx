// AddNoteForm.jsx
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
      addNote(); // Вызов функции добавления заметки
    }}>
      <input
        type="text"
        placeholder="Заголовок"
        value={newTitle}
        onChange={handleTitleChange} // Обработчик изменения заголовка
      />
      <input
        type="text"
        placeholder="Описание"
        value={newDescription}
        onChange={handleDescriptionChange} // Обработчик изменения описания
      />
      <input
        type="datetime-local"
        value={newDateTime}
        onChange={handleDateChange} // Обработчик изменения даты и времени
      />
      <button type="submit">Добавить заметку</button>
    </form>
  );
};
