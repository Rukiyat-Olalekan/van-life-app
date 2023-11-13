import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>Sorry, the page your were looking for was not found.</h1>
      <button className="back-button">
        <Link to="/" className="link-button">
          Back to home
        </Link>
      </button>
    </>
  );
}

export default NotFound;
