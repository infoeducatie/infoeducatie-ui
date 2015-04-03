"use strict";

import "babel-core/polyfill";
import "./lib/auth.js";
import "!style!css!less!./main.less";

import Header from "./components/header";
import About from "./components/about.jsx";
import Dashboard from "./components/dashboard.jsx";

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
    window.Auth.onChange = this.setStateOnAuth;
  },

  render() {
    return <div id="app">
        <Header loggedIn={this.state.loggedIn} />
    </div>;
  },

  setStateOnAuth() {
    this.setState({loggedIn: window.Auth.loggedIn()});
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

export default App;
