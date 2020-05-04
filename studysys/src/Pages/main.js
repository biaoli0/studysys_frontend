import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './login';
import './main.css';
import Homepage from "./homepage";
import Home from "./home";
import StudentList from "./studentList";

// main.js setup the router
function Main(){
     return(
        <Router>
            <Route path="/login" component = {Login} />
            <Route path="/homepage" component = {Homepage} />
            <Route path="/home" component = {Home} />
            <Route path="/home" component = {StudentList} />
        </Router>
    )
}

export default Main;