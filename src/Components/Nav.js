import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="NavBar ">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Login">Login</NavLink>
        <NavLink to="/SignUp">SignUp</NavLink>
      </div>
    </>
  );
};

export default Nav;
