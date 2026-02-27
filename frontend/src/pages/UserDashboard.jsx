import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
                <p className="text-gray-500">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-4">Your Profile</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Name</span>
                <span className="text-gray-800">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Email</span>
                <span className="text-gray-800">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Role</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {user?.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">User ID</span>
                <span className="text-gray-500 text-sm">{user?.id}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-blue-800">My Tasks</h3>
              <p className="text-blue-600 text-sm mt-1">View your assigned tasks</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">🔔</div>
              <h3 className="font-semibold text-purple-800">Notifications</h3>
              <p className="text-purple-600 text-sm mt-1">Check your notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
