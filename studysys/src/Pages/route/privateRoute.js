import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from "axios";
import userEvent from "@testing-library/user-event";

function PrivateRoute({ children, ...rest }) {
  let isAuthenticated = false;
  const verifyUser = async (token) => {
    // const token = localStorage.getItem("token") || undefined;
    const BASE_URL = "http://localhost:8080/token";
    const headersConfig = {
      "Content-Type": "application/json",
      Token: token,
    };
    // Send a POST request for verify token
    try {
      await Axios.post(BASE_URL, {}, { headers: headersConfig });
      console.log("have a successful token in local");
      isAuthenticated = true;
      // setIsAuth(true);
      return true;
    } catch (e) {
      console.log("have a failure token in local");
      isAuthenticated = false;
      // setIsAuth(false);
      return false;
    }
  };

  const [isAuth, setIsAuth] = useState(false);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    console.log("verify user in private Router");
    verifyUser(token).then(() => {
      console.log("isAuthenticated: " + isAuthenticated);
    });
  });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
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
