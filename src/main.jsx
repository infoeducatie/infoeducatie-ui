"use strict";

import React from "react";
import Router from "react-router";
let { Route, Link, RouteHandler, DefaultRoute } = Router; // eslint-disable-line

import "babel-core/polyfill";
import "./lib/auth";
import "./main.less";

import Header from "./components/header";
import News from "./components/news";
import Photos from "./components/photos";
import Alumni from "./components/alumni";
import Galaciuc from "./components/galaciuc";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Jury from "./components/jury";
import Home from "./components/home";
import Forum from "./components/forum";
import Schedule from "./components/schedule";
import Contact from "./components/contact";
import Results from "./components/results";


let App = React.createClass({
  displayName: "App",

  getInitialState() {
    return {
      isLoggedIn: false
    };
  },

  componentWillMount() {
    window.Auth.onChange = this.setStateOnAuth;
  },

  render() {
    return <div className="main">
        <RouteHandler />
  </div>;
  },

  setStateOnAuth() {
    this.setState({isLoggedIn: window.Auth.isLoggedIn()});
  }
});


let routes = (
  <Route handler={App}>
    <Route handler={Home} name="home" />
    <Route handler={Jury} name="jury" />
    <Route handler={News} name="news" />
    <Route handler={Alumni} name="alumni" />
    <Route handler={Photos} name="photos" />
    <Route handler={Galaciuc} name="galaciuc" />
    <Route handler={Register} name="register" />
    <Route handler={Dashboard} name="dashboard" />
    <Route handler={Forum} name="forum" />
    <Route handler={Schedule} name="schedule" />
    <Route handler={Results} name="results" />
    <Route handler={Contact} name="contact" />
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById("app"));
});

export default App;
