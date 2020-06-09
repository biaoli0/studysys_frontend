import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login/login";
import "../public/css/pages/teacher/main.css";
import Homepage from "./homepage";
import PrivateRoute from "./route/privateRoute";

// main.js setup the route
function Main() {
  return (
    <Router>
      {/*/!*  404 *!/*/}
      {/*<PrivateRoute path="/home">*/}
      {/*  <Homepage />*/}
      {/*</PrivateRoute>*/}
      <Route path="/home" component={Homepage} />
      {/*<Route exact path="/home" component={Login} />*/}
      <Route exact path="/user/login" component={Login} />
    </Router>
  );
}

export default Main;
