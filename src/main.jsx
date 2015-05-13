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
import Register from "./components/register";
import Dashboard from "./components/dashboard";


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
      <Header isLoggedIn={this.state.isLoggedIn} />
      <h1>InfoEducație Ediția 2015</h1>
      <h2>Concurs Național de Informatică</h2>
      <p className="tagline">Maria Tănase și vinul de Vrancea fac minuni</p>
      <p className="call-to-action">
        <a href="#" className="link link-primary">Înregistrează-te</a>
        <a href="#" className="link link-secondary">Citește mai multe</a>
      </p>

      <table>
        <tr className="entities">
          <td>Participanți</td>
          <td>Proiecte</td>
          <td>Județe</td>
        </tr>
        <tr className="values">
          <td>250+</td>
          <td>120+</td>
          <td>35+</td>
        </tr>
      </table>

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
    <Route handler={Alumni} name="alumni" />
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
