"use strict";

import "babel-core/polyfill";
import "./lib/auth.js";
import "!style!css!less!./main.less"

import About from "./components/about.jsx";
import Dashboard from "./components/dashboard.jsx";
import Logo from "file!../assets/img/logo.png"

import { Jumbotron } from "react-bootstrap";
import React from "react";
import Router from "react-router";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line


let App = React.createClass({
  displayName: "App",

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
      <Jumbotron>
        <img src={Logo} />
        <ul>
          <li><Link to="/">Index</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="dashboard">Dashboard (only if auth)</Link></li>
        </ul>
        <p>{this.state.loggedIn ? "I am signed in." :
                                  "I am not signed in."}</p>
        <RouteHandler/>
      </Jumbotron>
    </div>;
  },

  setStateOnAuth() {
    this.setState({loggedIn: window.auth.loggedIn()});
  }
});


let routes = (
  <Route handler={App}>
    <Route handler={About} name="about" />
    <Route handler={Dashboard} name="dashboard" />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById("app"));
});
