import { RiCoinsFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/Micro Tasking and Earning Platform logo.jpg";

import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [userData] = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <nav className="navbar bg-sky-950 text-white shadow-md rounded-b-lg">
      {/* Logo Section */}
      <div className="flex-1">
        <a href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 object-cover rounded-full border-2 border-blue-500"
          />
          <span className="text-xl font-bold">MicroTask</span>
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:flex-none">
        <ul className="menu menu-horizontal px-1">
          {user && user.email ? (
            <>
              <li>
                <a href="/" className="hover:text-yellow-400">
                  Home
                </a>
              </li>
              <li>
                {
                  userData?.role === "Admin" &&
                   <>
                     <Link to={`/dashboard/adminHome`} className="hover:text-yellow-400">
                   Dashboard
                  </Link>
                   </> 
                }
                {
                   userData?.role === "Worker" &&
                   <>
                     <Link to={`/dashboard/workerHome`} className="hover:text-yellow-400">
                   Dashboard
                   </Link>
                   </>
                }
                {
                   userData?.role === "Buyer" &&
                   <>
                     <Link to={`/dashboard/buyerHome`} className="hover:text-yellow-400">
                   Dashboard
                   </Link>
                   </>
                }
                {/* <a href=`/dashboard/` className="hover:text-yellow-400">
                  Dashboard
                </a> */}
              </li>
              <li>
                <span className="flex items-center gap-1 text-yellow-400 text-lg font-semibold">
                  {userData?.coins || 0} <RiCoinsFill />
                </span>
              </li>
              <li tabIndex={0} className="dropdown dropdown-hover">
                <label className="cursor-pointer hover:text-yellow-400">
                  Profile
                </label>
                <ul className="dropdown-content menu p-2 shadow bg-sky-900 rounded-lg w-40 text-sm">
                  <li>
                    <a href="/profile" className="hover:text-yellow-400">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="hover:text-yellow-400"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Litonuddinnil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm text-white hover:text-yellow-400"
                >
                  Join as Developer
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="hover:text-yellow-400">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-yellow-400">
                  Register
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Litonuddinnil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm text-white hover:text-yellow-400"
                >
                  Join as Developer
                </a>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost">
          <FaBars size={24} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-sky-900 rounded-lg w-52"
        >
          {user && user.email ? (
            <>
              <li>
                <a href="/" className="hover:text-yellow-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-yellow-400">
                  Dashboard
                </a>
              </li>
              <li>
                <span className="flex items-center gap-1 text-yellow-400 text-lg font-semibold">
                  {userData?.coins || 0} <RiCoinsFill />
                </span>
              </li>
              <li>
                <a href="/profile" className="hover:text-yellow-400">
                  My Profile
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="hover:text-yellow-400"
                >
                  Logout
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Litonuddinnil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm text-white hover:text-yellow-400"
                >
                  Join as Developer
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="hover:text-yellow-400">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-yellow-400">
                  Register
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Litonuddinnil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm text-white hover:text-yellow-400"
                >
                  Join as Developer
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
