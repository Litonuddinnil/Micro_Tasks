import { useState } from "react";
import { BiMenu, BiMenuAltLeft, BiMoneyWithdraw } from "react-icons/bi";
import { FaBook, FaCoins, FaHistory, FaHome, FaList } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import { MdAddComment, MdContactPhone } from "react-icons/md";
import logoCompany from "../assets/Micro Tasking and Earning Platform logo.jpg";
import Footer from "../Components/Footer/Footer";
import useUsers from "../hooks/useUsers";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users] = useUsers();

  // Ensure users[0] exists before destructuring
  const currentUser = users[0] || {};
  const { name = "Loading...", photoURL = "", role = "Unknown", coins = 0 } = currentUser;

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
              alt=""
              className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
            />
          </a>
        </div>

        <ul className="menu p-4 uppercase">
        {
            role==="Admin"  &&
            <>
            <li>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  }`
                }
              >
                <FaHome />
                Admin home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageItem"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  }`
                }
              >
                <FaList />
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/booking"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  } relative`
                }
              >
                <FaBook />
                Manage Tasks
              </NavLink>
            </li>
            </>  
        }
        {
             role === "Worker" &&
             <>
            <li>
              <NavLink
                to="/dashboard/workerHome"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  }`
                }
              >
                <FaHome />
                Worker home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/taskList"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  }`
                }
              >
                <FaList />
                TaskList
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/mySubmissions"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  } relative`
                }
              >
                <FaBook />
                My Submissions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/withdrawals"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  } relative`
                }
              >
               <BiMoneyWithdraw/>
                Withdrawals
              </NavLink>
            </li>
            </>  
        }
        {
            role ==="Buyer" &&
            <>
            <li>
              <NavLink
                to="/dashboard/buyerHome"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  }`
                }
              >
                <FaHome />
                Buyer home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/addTask"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  }`
                }
              >
                 <MdAddComment/>
                 Add new Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myTasks"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  } relative`
                }
              >
                <FaBook />
                My Task's
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/purchaseCoin"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  } relative`
                }
              >
                <FaCoins />
                Purchase Coin
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-white text-orange-500"
                      : "hover:bg-orange-500 hover:text-white"
                  } relative`
                }
              >
                <FaHistory />
                Payment history
              </NavLink>
            </li>
            </>  
        }

          {/* Shared navlink component */}
          <div className="divider"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <BiMenuAltLeft />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaShop />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
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
              <span className="text-yellow-500 font-bold text-xl">{coins}</span>
            </p>
            <p className="text-xl font-semibold text-gray-400">
              User Role |{" "}
              <span className="text-yellow-500 font-bold text-xl">{role}</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src={photoURL}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
            />
            <h1 className="text-xl font-bold">{name}</h1>
          </div>
        </div>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default DashBoard;
