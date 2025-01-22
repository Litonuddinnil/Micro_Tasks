 import { useState } from "react";
import { BiMenu, BiMoneyWithdraw } from "react-icons/bi";
import { FaBook, FaCoins, FaHistory, FaHome, FaList } from "react-icons/fa";
 
import { HiX } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import { MdAddComment, MdContactPhone } from "react-icons/md";
import logoCompany from "../assets/Micro Tasking and Earning Platform logo.jpg";
import Footer from "../Components/Footer/Footer"; 
import useUser from "../hooks/useUser";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData] =useUser();


  // Common styles for NavLinks
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg ${
      isActive
        ? "bg-white text-orange-500"
        : "hover:bg-orange-500 hover:text-white"
    }`;

  // Sidebar navigation based on role
  const renderRoleBasedNav = () => {
    switch (userData.role) {
      case "Admin":
        return (
          <>
            <li>
              <NavLink to="/dashboard/adminHome" className={navLinkStyles}>
                <FaHome />
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manageUsers" className={navLinkStyles}>
                <FaList />
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/booking" className={navLinkStyles}>
                <FaBook />
                Manage Tasks
              </NavLink>
            </li>
          </>
        );
      case "Worker":
        return (
          <>
            <li>
              <NavLink to="/dashboard/workerHome" className={navLinkStyles}>
                <FaHome />
                Worker Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/taskList" className={navLinkStyles}>
                <FaList />
                Task List
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/mySubmissions" className={navLinkStyles}>
                <FaBook />
                My Submissions
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/withdrawals" className={navLinkStyles}>
                <BiMoneyWithdraw />
                Withdrawals
              </NavLink>
            </li>
          </>
        );
      case "Buyer":
        return (
          <>
            <li>
              <NavLink to="/dashboard/buyerHome" className={navLinkStyles}>
                <FaHome />
                Buyer Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addTask" className={navLinkStyles}>
                <MdAddComment />
                Add New Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myTasks" className={navLinkStyles}>
                <FaBook />
                My Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/purchaseCoin" className={navLinkStyles}>
                <FaCoins />
                Purchase Coin
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/paymentHistory" className={navLinkStyles}>
                <FaHistory />
                Payment History
              </NavLink>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div
        className={`lg:w-64 bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100 text-black ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="border-2 flex items-center justify-center animate-move-right-left">
          <a href="/">
            <img
              src={logoCompany}
              alt="Logo"
              className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
            />
          </a>
        </div>

        <ul className="menu p-4 uppercase">
          {renderRoleBasedNav()}
          <div className="divider"></div>
          <li>
            <NavLink to="/" className={navLinkStyles}>
              <FaHome />
              Home
            </NavLink>
          </li> 
          <li>
            <NavLink to="/" className={navLinkStyles}>
              <MdContactPhone />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Toggle Button for Small Screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiX /> : <BiMenu />}
      </button>

      {/* Scrollable Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        <div className="flex items-center justify-end gap-4">
          <div>
            <p className="text-xl font-semibold text-gray-400">
              Available Coins |{" "}
              <span className="text-yellow-500 font-bold text-xl">
                {userData.coins}
              </span>
            </p>
            <p className="text-xl font-semibold text-gray-400">
              User Role |{" "}
              <span className="text-yellow-500 font-bold text-xl">
                {userData.role}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src={userData.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
            />
            <h1 className="text-xl font-bold">{userData.name}</h1>
          </div>
        </div>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default DashBoard;
