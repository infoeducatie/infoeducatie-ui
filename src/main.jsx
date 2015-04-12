"use strict";

import React from "react";
import Router from "react-router";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "babel-core/polyfill";
import "./lib/auth";
import "./main.less";

import Header from "./components/header";
import News from "./components/news";
import Photos from "./components/photos";
import Alumni from "./components/alumni";
import Galaciuc from "./components/galaciuc";
import Registration from "./components/registration";
import Dashboard from "./components/dashboard";


let App = React.createClass({
  displayName: "App",

  getInitialState() {
    return {
      isLoggedIn: window.Auth.isLoggedIn()
    };
  },

  componentWillMount() {
    // TODO @palcu: make another request to see if I am still logged in
    window.Auth.onChange = this.setStateOnAuth;
  },

  render() {
    return <div id="app">
        <Header isLoggedIn={this.state.isLoggedIn} />
        <p>{this.state.isLoggedIn ? "I am signed in."
                                  : "I am not signed in."}</p>
        <RouteHandler />
    </div>;
  },

  setStateOnAuth() {
    this.setState({isLoggedIn: window.Auth.isLoggedIn()});
  }
});


let routes = (
  <Route handler={App}>
    <Route handler={News} name="news" />
    <Route handler={Alumni} name="alumni" />
    <Route handler={Photos} name="photos" />
    <Route handler={Galaciuc} name="galaciuc" />
    <Route handler={Registration} name="registration" />
    <Route handler={Dashboard} name="dashboard" />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById("app"));
});

export default App;
