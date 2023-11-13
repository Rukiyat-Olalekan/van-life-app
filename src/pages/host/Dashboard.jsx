import React from "react";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <React.Fragment>
      <h1>Dashboard goes here.</h1>
      <Outlet />
    </React.Fragment>
  );
}

export default Dashboard;
