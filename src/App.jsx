import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Assignments from "./pages/Assignments";
import Chat from "./pages/Chat";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./services/ProtectedRoute";

const Navbar = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup"]; // Hide navbar on login/signup pages

  if (hideNavbarRoutes.includes(location.pathname)) return null; // Hide navbar

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-md">
      <h2 className="text-xl font-semibold">Student Hub</h2>
      <div className="flex items-center space-x-4">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
