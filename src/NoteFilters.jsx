import React from "react";

export const NoteFilters = ({ sortOrder, statusFilter, handleSortChange, handleStatusChange }) => {
  return (
    <div className="filters">
      <label htmlFor="sortOrder">Сортировка по дате:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="descending">Сначала новые</option>
        <option value="ascending">Сначала старые</option>
      </select>

      <label htmlFor="statusFilter">Фильтр по статусу:</label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={handleStatusChange}
      >
        <option value="all">Все</option>
        <option value="не выполнен">Не выполнено</option>
        <option value="выполнен">Выполнено</option>
        <option value="отложен">Отложено</option>
      </select>
    </div>
  );
};


