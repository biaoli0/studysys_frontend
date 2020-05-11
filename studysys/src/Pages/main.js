import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Login from "./login/login";
import "./main.css";
import Homepage from "./homepage";
import { routes } from "./routeConfig";

// main.js setup the router
function Main() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      {/*  404 */}
      {/*<PrivateRoute></PrivateRoute>*/}
      <Route path="/*" component={Homepage} />
      {/*  路由守卫*/}
      {/*<Route exact path="/" render={<Redirect to={{ pathname: "/login" }} />} />*/}
    </Router>
  );
}

export default Main;
