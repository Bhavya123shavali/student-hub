import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-2xl font-bold">Settings</h2>
      <button onClick={() => setDarkMode(!darkMode)} className="mt-4 bg-blue-600 text-white p-2 rounded">
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default Settings;
