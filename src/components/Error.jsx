import React from "react";
import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <>
      <h1>{error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
      <h4>Go to <Link to="/login">Login</Link></h4>
    </>
  );
}

export default Error;
