import React from "react";

export const OpenWindow = ({ title, description, onClose, onPostpone }) => {
  return (
    <div className="openWindow">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Закрыть</button>
      <button onClick={onPostpone}>Отложить</button>
    </div>
  );
};
