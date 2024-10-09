import React from "react";
import { OpenWindow } from "./OpenWindow";

export const ReminderList = ({ reminders, closeReminder, postponeReminder }) => {
  return (
    <div className="openWindows">
      <h2>Уведомления</h2>
      {reminders.length > 0 &&
        reminders.map((remind, index) => (
          <OpenWindow
            key={index}
            title={remind.title}
            description={remind.description}
            onClose={() => closeReminder(index)}
            onPostpone={() => postponeReminder(index)}
          />
        ))}
    </div>
  );
};

