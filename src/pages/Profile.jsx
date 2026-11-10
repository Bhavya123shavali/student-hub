import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API calls

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT auth
        if (!token) {
          navigate("/login"); // Redirect if not logged in
          return;
        }
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  };

  if (!user) {
    return <div className="text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
        {/* Profile Image */}
        <img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
        />

        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        {/* Edit & Logout Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
