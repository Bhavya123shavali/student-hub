import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API calls

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "User" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token
        if (!token) {
          navigate("/login"); // Redirect if not logged in
          return;
        }

        // Fetch user data from backend
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login"); // Redirect on error
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome, {userData.name}!
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link to="/assignments" className="dashboard-card bg-blue-500">
          📚 Assignments
        </Link>
        <Link to="/chat" className="dashboard-card bg-green-500">
          💬 Chat
        </Link>
        <Link to="/notes" className="dashboard-card bg-yellow-500">
          📝 Notes
        </Link>
        <Link to="/profile" className="dashboard-card bg-purple-500">
          🙍 Profile
        </Link>
        <Link to="/reminders" className="dashboard-card bg-red-500">
          ⏰ Reminders
        </Link>
        <Link to="/settings" className="dashboard-card bg-gray-700">
          ⚙️ Settings
        </Link>
      </div>
    </div>
  );
};

export default Home;
