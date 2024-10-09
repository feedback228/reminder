import React, { useState, useEffect } from "react";

export const Note = ({ title, description, dateTime, onDelete, onEdit, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDateTime, setEditedDateTime] = useState(dateTime);

  useEffect(() => {
    if (isEditing) {
      setEditedTitle(title);
      setEditedDescription(description);
      setEditedDateTime(dateTime);
      console.log("В режиме редактирования:", { title, description, dateTime });
    }
  }, [isEditing, title, description, dateTime]);

  const handleEdit = () => {
    console.log("Попытка сохранить изменения:", { editedTitle, editedDescription, editedDateTime });
    if (editedTitle && editedDescription && editedDateTime) {
      onEdit(editedTitle, editedDescription, new Date(editedDateTime).getTime());  
      setIsEditing(false);
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            value={new Date(editedDateTime).toISOString().slice(0, 16)}  
            onChange={(e) => setEditedDateTime(e.target.value)}
          />
          <button onClick={handleEdit}>Сохранить</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Статус: {status}</p>
          <p>
            Дата и время напоминания:{" "}
            {dateTime ? new Date(dateTime).toLocaleString() : "Не указаны"}
          </p>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
          <button onClick={onDelete}>Удалить</button>
        </>
      )}
    </div>
  );
};


