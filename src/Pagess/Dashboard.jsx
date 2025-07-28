import React from "react";
import Sidebars from "../Component/Sidebars";
import { useNavigate } from "react-router";
import UserLogOut from "../auth/UserLogOut";
function Dashboard() {
  const navigate = useNavigate();
  const { LogOut } = UserLogOut();

  // React.useEffect(() => {
  //   const isAuthenticated = !!localStorage.getItem("user");
  //   if (!isAuthenticated) {
  //     navigate("/Authentication");
  //   }
  // }, [navigate]);

  const handleLogout = async () => {
    const { success, error } = await LogOut();
    if (success) {
      navigate("/");
    } else {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center items-center h-screen w-screen ">
        <Sidebars />
        <div className="bg-white shadow-md rounded-lg p-6 w-3/4">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
          <p className="text-gray-700">
            This is your dashboard where you can manage your account and view
            your data.
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            logout{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
