"use strict";

import "babel-core/polyfill";
import "./lib/auth.js";
import "!style!css!less!./main.less";

import Header from "./components/header";
import News from "./components/news.jsx";
import Photos from "./components/photos.jsx";
import Alumni from "./components/alumni.jsx";
import Galaciuc from "./components/galaciuc.jsx";
import Register from "./components/register.jsx";
import Dashboard from "./components/dashboard.jsx";

import React from "react";
import Router from "react-router";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line


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
    return <div id="app">
        <Header isLoggedIn={this.state.isLoggedIn} />
            <p>{this.state.isLoggedIn ? "I am signed in." :
                                      "I am not signed in."}</p>
            <RouteHandler/>
    </div>;
  },

  setStateOnAuth() {
    this.setState({isLoggedIn: window.Auth.isLoggedIn()});
  }
});


let routes = (
  <Route handler={App}>
    <Route handler={News} name="news" />
    <Route handler={Alumni} name="alumini" />
    <Route handler={Photos} name="photos" />
    <Route handler={Galaciuc} name="galaciuc" />
    <Route handler={Register} name="register" />
    <Route handler={Dashboard} name="dashboard" />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById("app"));
});

export default App;
