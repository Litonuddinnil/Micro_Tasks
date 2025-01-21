import { RiCoinsFill } from "react-icons/ri";
import logo from "../../assets/Micro Tasking and Earning Platform logo.jpg";
  
import useUsers from "../../hooks/useUsers";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [users, ] = useUsers(); 
  // console.log(users)
  const currentUser = users.find((u) => u.email === user?.email) || {
    name: "Guest",
    role: "Unknown",
    coins: 0,
    photoURL: "",
  };
  // console.log(currentUser);
  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className="navbar bg-white shadow-md">
      {/* Website Name / Logo */}
      <div className="flex-1">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
          />
        </a>
      </div>

      {/* Navigation Items */}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user && user?.email ? (
            <>
              {/* Links for logged-in users */}
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary">
                  Dashboard
                </a>
              </li>
              <li>
                {/* Display Coin Balance */}
                <span
                  className="flex items-center gap-1 text-yellow-500 text-xl font-semibold cursor-pointer"
                  
                >
                  { currentUser.coins || 0} <RiCoinsFill />
                </span>
              </li>
              <li className="dropdown dropdown-end">
                {/* Profile Dropdown */}
                <label
                  tabIndex={0}
                  className="hover:text-primary cursor-pointer"
                >
                  Profile
                  <svg
                    className="fill-current inline ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="/profile" className="hover:text-primary">
                      Profile
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="hover:text-primary"
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
                  className="btn btn-primary btn-sm"
                >
                  Join as Developer
                </a>
              </li>
            </>
          ) : (
            <>
              {/* Links for non-logged-in users */}
              <li>
                <a href="/login" className="hover:text-primary">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-primary">
                  Register
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Litonuddinnil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Join as Developer
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
