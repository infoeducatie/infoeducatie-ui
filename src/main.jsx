/**
 * App entry point
 */

import "babel-core/polyfill";

import About from "./components/about.jsx"
import Dashboard from "./components/dashboard.jsx"
import Login from "./components/login.jsx"
import Logout from "./components/logout.jsx"

import React from "react";
import Router from "react-router";
let { Route, Link, RouteHandler } = Router;

// TODO @palcu: implement this. Currently in index.html window.user is set.
window.auth = {
  loggedIn() {
    return window.user;
  },
  onChange() { },
  login() {
    window.user = true;
    this.onChange();
  },
  logout() {
    window.user = false;
    this.onChange();
  }
};

let App = React.createClass({
  getInitialState() {
    return {
      loggedIn: false
    };
  },

  componentWillMount() {
    auth.onChange = this.setStateOnAuth;
  },

  render() {
    return <div id={'app'}>
      <ul>
        <li><Link to="about">About</Link></li>
        <li><Link to="dashboard">Dashboard (only if auth)</Link></li>
      </ul>
      <p>{this.state.loggedIn ? "I am signed in." :
                                "I am not signed in."}</p>
      <RouteHandler/>
    </div>;
  },

  setStateOnAuth() {
    this.setState({loggedIn: auth.loggedIn()});
  }
});

let routes = (
  <Route handler={App}>
    <Route name="about" handler={About} />
    <Route name="dashboard" handler={Dashboard} />
  </Route>
);

// Start the router
Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  let data = {
    'current-edition-slug': '2015',
    'current-edition-name': 'InfoEducatie 2015'
  };
  React.render(<Handler data={data} />, document.getElementById('app'));
});
