import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Index from "./AdminIndex";

export default function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" exac component={Index}></Route>
      </Switch>
    </Router>
  );
}
