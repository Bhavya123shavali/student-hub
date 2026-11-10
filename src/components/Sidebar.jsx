import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <button
        className="p-4 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside className={`bg-gray-800 text-white w-64 h-screen fixed transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <ul className="p-4 space-y-2">
          <li><Link to="/" className="block p-2 hover:bg-gray-700">Home</Link></li>
          <li><Link to="/assignments" className="block p-2 hover:bg-gray-700">Assignments</Link></li>
          <li><Link to="/chat" className="block p-2 hover:bg-gray-700">Chat</Link></li>
          <li><Link to="/notes" className="block p-2 hover:bg-gray-700">Notes</Link></li>
          <li><Link to="/reminders" className="block p-2 hover:bg-gray-700">Reminders</Link></li>
          <li><Link to="/settings" className="block p-2 hover:bg-gray-700">Settings</Link></li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
