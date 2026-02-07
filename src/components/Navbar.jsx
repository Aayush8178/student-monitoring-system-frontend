import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");

  const linkClass = (path) =>
    `block px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-lg font-semibold text-blue-600">
            Student Monitor
          </h1>

          {/* desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {role === "admin" && (
              <>
                <Link to="/" className={linkClass("/")}>Dashboard</Link>
                <Link to="/analytics" className={linkClass("/analytics")}>Analytics</Link>
                <Link to="/at-risk" className={linkClass("/at-risk")}>At Risk</Link>
                <Link to="/settings" className={linkClass("/settings")}>Settings</Link>
              </>
            )}

            {role === "student" && (
              <Link to="/student" className={linkClass("/student")}>
                Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* mobile Hamburger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* mobile dropdown Menu */}
        {open && (
          <div className="md:hidden pb-3 space-y-1">
            {role === "admin" && (
              <>
                <Link to="/" className={linkClass("/")}>Dashboard</Link>
                <Link to="/analytics" className={linkClass("/analytics")}>Analytics</Link>
                <Link to="/at-risk" className={linkClass("/at-risk")}>At Risk</Link>
                <Link to="/settings" className={linkClass("/settings")}>Settings</Link>
              </>
            )}

            {role === "student" && (
              <Link to="/student" className={linkClass("/student")}>
                Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
