import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/">Foodiez</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/Login" className={({ isActive }) => isActive ? 'active' : ''}>
          Login
        </NavLink>
        <NavLink to="/SignUp" className={({ isActive }) => isActive ? 'active' : ''}>
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
