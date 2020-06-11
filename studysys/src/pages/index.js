import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./user/login";
// import "./css/styles.css";
import Subcategory from "./home/[category]/[subcategory]";
import PrivateRoute from "./route/privateRoute";

// main.js setup the route
function Main() {
  return (
    // <Router>
    //   {/*/!*  404 *!/*/}
    //   {/*<PrivateRoute path="/home">*/}
    //   {/*  <Subcategory />*/}
    //   {/*</PrivateRoute>*/}
    //   <Route path="/home" component={Subcategory} />
    //   {/*<Route exact path="/home" component={Login} />*/}
    //   <Route exact path="/user/login" component={Login} />
    // </Router>
    <div>dsf</div>
  );
}

export default Main;
