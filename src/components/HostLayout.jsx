import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function HostLayout() {
  const hostLink = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <React.Fragment>
      <nav className="host-nav">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? hostLink : null)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? hostLink : null)}
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? hostLink : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? hostLink : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </React.Fragment>
  );
}

export default HostLayout;
