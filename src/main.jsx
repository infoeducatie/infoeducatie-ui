import "babel-core/polyfill";
import "./lib/auth.js";

import About from "./components/about.jsx";
import Dashboard from "./components/dashboard.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";

import React from "react";
import Router from "react-router";
let { Route, Link, RouteHandler } = Router;


let App = React.createClass({
  getInitialState() {
    return {
      loggedIn: false
    };
  },

  componentWillMount() {
    window.auth.onChange = this.setStateOnAuth;
  },

  render() {
    return <div id="app">
      <ul>
        <li><Link to="/">Index</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="dashboard">Dashboard (only if auth)</Link></li>
      </ul>
      <p>{this.state.loggedIn ? "I am signed in." :
                                "I am not signed in."}</p>
      <RouteHandler/>
    </div>;
  },

  setStateOnAuth() {
    this.setState({loggedIn: window.auth.loggedIn()});
  }
});


let routes = (
  <Route handler={App}>
    <Route name="about" handler={About} />
    <Route name="dashboard" handler={Dashboard} />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(<Handler />, document.getElementById("app"));
});
