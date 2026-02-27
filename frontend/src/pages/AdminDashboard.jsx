import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/all");
      setUsers(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setMessage("User deleted successfully");
      setUsers(users.filter((u) => u._id !== id));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/user/${id}/role`, { role: newRole });
      setUsers(users.map((u) => (u._id === id ? res.data.user : u)));
      setMessage("Role updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleColors = {
    admin: "bg-red-100 text-red-700",
    manager: "bg-orange-100 text-orange-700",
    user: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500">Welcome, {user?.name}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-purple-700">{users.length}</div>
              <p className="text-purple-600 mt-1 font-medium">Total Users</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-red-700">
                {users.filter((u) => u.role === "admin").length}
              </div>
              <p className="text-red-600 mt-1 font-medium">Admins</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-orange-700">
                {users.filter((u) => u.role === "manager").length}
              </div>
              <p className="text-orange-600 mt-1 font-medium">Managers</p>
            </div>
          </div>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <h2 className="text-xl font-bold text-gray-700 mb-4">Manage All Users</h2>

          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="px-4 py-3 text-purple-700 font-semibold">Name</th>
                    <th className="px-4 py-3 text-purple-700 font-semibold">Email</th>
                    <th className="px-4 py-3 text-purple-700 font-semibold">Role</th>
                    <th className="px-4 py-3 text-purple-700 font-semibold">Change Role</th>
                    <th className="px-4 py-3 text-purple-700 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${roleColors[u.role]}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="user">User</option>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        {u._id !== user?.id && (
                          <button
                            onClick={() => handleDelete(u._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
