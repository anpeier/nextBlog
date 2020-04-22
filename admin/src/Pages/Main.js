import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Index from './AdminIndex';

export default function Main() {
  return (
    <Router>
      <Route path="/login" exac component={Login}></Route>
      <Route path="/index" exac component={Index}></Route>
    </Router>
  );
}
