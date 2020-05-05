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
      <Route path="/" component={Homepage} />
      {/*<Route exact path="/" render={<Redirect to={{ pathname: "/login" }} />} />*/}
      <Route exact path="/login" component={Login} />
      {/*{routes.map((route) => (*/}
      {/*  <Route path={route.path} exact component={Homepage} />*/}
      {/*))}*/}
    </Router>
  );
}

export default Main;
