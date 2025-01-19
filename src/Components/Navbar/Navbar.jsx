import logo from "../../assets/Micro Tasking and Earning Platform logo.jpg";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { user,logOut } = useAuth();
const handlerLogOut = ()=>{
  logOut();
}
  return (
    <div className="navbar bg- shadow-md">
      {/* Website Name / Logo */}
      <div className="flex-1">
        <div className=" border-2 rounded-full border-red-600">
          <img
            src={logo}
            alt=""
            className="w-24 h-24 object-cover rounded-full  border-4 border-blue-500 "
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {/* For Not Logged In Users */}
          {user && user?.email ? (
            <>
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
                <span className="text-primary font-semibold">
                  Coins
                  {/* Coins: {userCoins || 0} */}
                </span>
              </li>
              <li className="dropdown dropdown-end">
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
                      onClick={handlerLogOut} 
                      className="hover:text-primary"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li> 
              <li>
                <a
                  href="https://github.com/your-client-repo"
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
                  href="https://github.com/your-client-repo"
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
