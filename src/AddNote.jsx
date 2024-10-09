import React, { useState, useEffect } from "react";
import {NoteList} from "./NoteList"
import { AddNoteForm } from "./AddNoteForm";
import { NoteFilters } from "./NoteFilters";
import { ReminderList } from "./ReminderList";

import "./AddNote.scss";

export const AddNote = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDateTime, setNewDateTime] = useState("");
  const [newDateTimestamp, setNewDateTimestamp] = useState(null);
  const [reminder, setReminder] = useState([]);
  const [dismissedReminders, setDismissedReminders] = useState([]);
  const [shownReminders, setShownReminders] = useState([]);
  const [sortOrder, setSortOrder] = useState("descending");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const dueNotes = notes.filter(
        (note) =>
          note.dateTime <= now &&
          !dismissedReminders.includes(note.title) &&
          !shownReminders.includes(note.title)
      );

      if (dueNotes.length > 0) {
        const newReminders = dueNotes.map((note) => ({
          title: note.title,
          description: note.description,
        }));

        setReminder((prevReminders) => [...prevReminders, ...newReminders]);
        setShownReminders((prev) => [
          ...prev,
          ...dueNotes.map((note) => note.title),
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [notes, dismissedReminders, shownReminders]);

  const addNote = () => {
    if (newTitle && newDescription && newDateTimestamp) {
      const newNote = {
        title: newTitle,
        description: newDescription,
        dateTime: newDateTimestamp,
        status: "не выполнен",
      };
      const updatedNotes = [...notes, newNote];

      setNotes([...updatedNotes]);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      setNewTitle("");
      setNewDescription("");
      setNewDateTime("");
      setNewDateTimestamp(null);
    } else {
      alert("Пожалуйста, заполните все поля, включая дату и время.");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes([...updatedNotes]);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const editNote = (index, newTitle, newDescription, newDateTimestamp) => {
    const updatedNotes = notes.map((note, i) =>
      i === index
        ? {
            ...note,
            title: newTitle,
            description: newDescription,
            dateTime: newDateTimestamp,
          }
        : note
    );
    setNotes([...updatedNotes]);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDateChange = (e) => {
    const dateInput = e.target.value;
    setNewDateTime(dateInput);
    const timestamp = Date.parse(dateInput);
    setNewDateTimestamp(timestamp);
  };

  const closeReminder = (index) => {
    const reminderToClose = reminder[index];
    if (reminderToClose) {
      const updatedNotes = notes.map((note) =>
        reminderToClose.title === note.title
          ? { ...note, status: "выполнен" }
          : note
      );
      setNotes([...updatedNotes]);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      setDismissedReminders((prev) => [...prev, reminderToClose.title]);
      setReminder(reminder.filter((_, i) => i !== index));
    }
  };

  const postponeReminder = (index) => {
    const reminderToPostpone = reminder[index];
    if (reminderToPostpone) {
      const postponedTime = 10 * 60 * 1000;
      const updatedNotes = notes.map((note) =>
        reminderToPostpone.title === note.title
          ? {
              ...note,
              dateTime: note.dateTime + postponedTime,
              status: "отложен",
            }
          : note
      );
      setNotes([...updatedNotes]);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      setReminder(reminder.filter((_, i) => i !== index));
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (statusFilter === "all") return true;
    return note.status === statusFilter;
  });

  const sortedNotes = filteredNotes.sort((a, b) => {
    return sortOrder === "ascending"
      ? a.dateTime - b.dateTime
      : b.dateTime - a.dateTime;
  });

  return (
    <div className="add-note">
      <div className="add">
        <AddNoteForm
          newTitle={newTitle}
          newDescription={newDescription}
          newDateTime={newDateTime}
          handleTitleChange={(e) => setNewTitle(e.target.value)}
          handleDescriptionChange={(e) => setNewDescription(e.target.value)}
          handleDateChange={handleDateChange}
          addNote={addNote}
        />
        <NoteFilters
          sortOrder={sortOrder}
          statusFilter={statusFilter}
          handleSortChange={(e) => setSortOrder(e.target.value)}
          handleStatusChange={(e) => setStatusFilter(e.target.value)}
        />
        <NoteList notes={sortedNotes} onDelete={deleteNote} onEdit={editNote} />
      </div>
      <div className="openWindows">
        <ReminderList
          reminders={reminder}
          closeReminder={closeReminder}
          postponeReminder={postponeReminder}
        />
      </div>
    </div>
  );
};


