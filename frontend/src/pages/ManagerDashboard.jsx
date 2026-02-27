import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/members");
        setMembers(res.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>
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
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-orange-700">{members.length}</div>
              <p className="text-orange-600 mt-1 font-medium">Total Members</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-blue-700">📊</div>
              <p className="text-blue-600 mt-1 font-medium">Reports</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-green-700">✅</div>
              <p className="text-green-600 mt-1 font-medium">Tasks Done</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-700 mb-4">Team Members</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>
          )}

          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading members...</p>
          ) : members.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No members found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-orange-50">
                    <th className="px-4 py-3 text-orange-700 font-semibold rounded-tl-lg">Name</th>
                    <th className="px-4 py-3 text-orange-700 font-semibold">Email</th>
                    <th className="px-4 py-3 text-orange-700 font-semibold rounded-tr-lg">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{member.name}</td>
                      <td className="px-4 py-3 text-gray-600">{member.email}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">
                        {new Date(member.createdAt).toLocaleDateString()}
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

export default ManagerDashboard;
