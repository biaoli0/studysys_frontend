import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from "axios";

function PrivateRoute({ children, ...rest }) {
  const [token] = useState(localStorage.getItem("token") || undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // Verify token in local storage
    async function authenticate() {
      const BASE_URL = "http://localhost:8080/token";
      const headersConfig = {
        "Content-Type": "application/json",
        Token: token,
      };
      // Send a POST request for verify token
      try {
        await Axios.post(BASE_URL, {}, { headers: headersConfig });
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
      }
    }
    authenticate(token);
  }, [token]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated === undefined ? null : isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location.pathname,
              },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
