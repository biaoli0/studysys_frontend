import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login";
import "./main.css";
import Home from "./home";
import StudentList from "./studentList";

// main.js setup the router
function Main() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/student/studentList" component={StudentList} />
    </Router>
  );
}

export default Main;
