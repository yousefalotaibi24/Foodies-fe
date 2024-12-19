import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

const Nav = () => {
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/">Foodiez</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        {isLoggedIn ? (
          <Logout />
        ) : (
          <>
            <NavLink to="/Login" className={({ isActive }) => isActive ? 'active' : ''}>
              Login
            </NavLink>
            <NavLink to="/SignUp" className={({ isActive }) => isActive ? 'active' : ''}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
