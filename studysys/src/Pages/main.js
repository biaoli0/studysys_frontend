import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './login';
import './main.css';

// main.js setup the router
function Main(){
     return(
        <Router>
            <Route path="/login" component = {Login} />
            <Route path="/homepage" component = {Homepage} />
        </Router>
    )
}

export default Main;