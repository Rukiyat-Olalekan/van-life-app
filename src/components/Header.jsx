import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import navImg from "../assets/images/avatar-icon.png";

function Header() {
  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }
  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          <img src={navImg} alt="nav profile" />
        </NavLink>
        <NavLink className="button">
          <button onClick={fakeLogOut}>X</button>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
