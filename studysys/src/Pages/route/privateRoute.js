import React from "react";
import { Redirect, Route } from "react-router-dom";

export const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    fakeAuth.isAuthenticated = true;
    // setTimeout( 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    // setTimeout(cb, 100);
  },
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
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
