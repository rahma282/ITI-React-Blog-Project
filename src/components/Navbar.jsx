import React from "react";
import { NavLink , useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className="btn btn-ghost text-xl"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add"
                className="btn btn-ghost text-xl"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Create Post
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="btn btn-ghost text-xl"
                    style={{ fontFamily: "'Pacifico', cursive" }}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="btn btn-ghost text-xl"
                    style={{ fontFamily: "'Pacifico', cursive" }}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost text-xl"
                  style={{ fontFamily: "'Pacifico', cursive" }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        <NavLink
          to="/"
          className="btn btn-ghost text-xl"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          MindSparks
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className="btn btn-ghost text-xl"
              style={{ fontFamily: "'Quicksand'" }}
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className="btn btn-ghost text-xl"
              style={{ fontFamily: "'Quicksand'" }}
            >
              Create Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="btn btn-ghost text-xl"
              style={{ fontFamily: "'Quicksand'" }}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex ml-0.5">
        {!isLoggedIn ? (
          <NavLink
            to="/login"
            className="btn btn-ghost text-xl"
            style={{ fontFamily: "'Pacifico'" }}
          >
            SignIn
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-ghost text-xl"
            style={{ fontFamily: "'Pacifico'" }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
