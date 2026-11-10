import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash, FaBell, FaStop } from "react-icons/fa";

const Reminders = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [reminders, setReminders] = useState(
    JSON.parse(localStorage.getItem("reminders")) || []
  );
  const [isRinging, setIsRinging] = useState(false);
  const [alarmAudio, setAlarmAudio] = useState(null);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach((reminder) => {
        if (reminder.active && new Date(reminder.time).getTime() <= now.getTime()) {
          sendNotification(reminder.message);
          playAlarm(reminder.id);
          setTimeout(() => stopAlarm(reminder.id), 30000);
        }
      });
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => console.log("Service Worker Registered"));
    }

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const handleSetReminder = () => {
    const reminderTime = new Date(date);
    reminderTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

    const newReminder = {
      id: Date.now(),
      time: reminderTime,
      message: `⏰ Reminder: ${reminderTime.toLocaleString()}`,
      active: true,
    };

    setReminders([...reminders, newReminder]);
    alert("Reminder Set Successfully!");
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const sendNotification = (message) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Reminder Alert", { body: message });
      });
    } else {
      alert(message);
    }
  };

  const playAlarm = (id) => {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
    const alarm = new Audio("/alarm.mp3");
    alarm.play();
    alarm.loop = true;
    setAlarmAudio(alarm);
    setIsRinging(true);
  };

  const stopAlarm = (id) => {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      setAlarmAudio(null);
    }
    setIsRinging(false);
    toggleReminder(id);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full lg:w-1/2 p-6">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
          ⏰ Set Your Reminders
        </h2>

        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-lg font-semibold mb-2">Choose Date:</h3>
          <Calendar onChange={setDate} value={date} className="border p-2 rounded" />

          <h3 className="text-lg font-semibold mt-4">Choose Time:</h3>
          <DatePicker
            selected={time}
            onChange={(newTime) => setTime(newTime)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="border p-2 w-full mt-2 rounded"
          />

          <button
            onClick={handleSetReminder}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-200"
          >
            <FaBell /> Set Reminder
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-6">
        <h3 className="text-xl font-semibold mb-2">Upcoming Reminders:</h3>
        <ul className="bg-white text-gray-800 p-4 rounded-lg shadow max-h-[400px] overflow-y-auto">
          {reminders.length === 0 ? (
            <p className="text-gray-500">No reminders set.</p>
          ) : (
            reminders.map((reminder) => (
              <li
                key={reminder.id}
                className="flex justify-between items-center border-b p-3 hover:bg-gray-100 rounded transition-all duration-200"
              >
                <span className={`text-gray-700 ${reminder.active ? "font-bold" : "text-gray-400"}`}>
                  {reminder.message}
                </span>

                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={reminder.active}
                      onChange={() => toggleReminder(reminder.id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                    <span className="ml-2 text-sm text-gray-600">
                      {reminder.active ? "ON" : "OFF"}
                    </span>
                  </label>

                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-500 hover:text-red-700 transition-all duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {isRinging && (
        <div className="fixed bottom-10 right-10 flex items-center gap-3 p-4 bg-red-500 text-white rounded-lg shadow-lg animate-bounce">
          <FaBell className="text-2xl" />
          <span>Alarm is Ringing!</span>
          <button
            onClick={() => stopAlarm()}
            className="bg-white text-red-500 px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-all duration-200"
          >
            <FaStop /> Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default Reminders;