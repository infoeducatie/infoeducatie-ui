"use strict";

import React from "react";
import Router from "react-router";
let { Route, RouteHandler, DefaultRoute } = Router; // eslint-disable-line

import "babel-core/polyfill";
import "./main.less";

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
import Footer from "./components/footer";


let App = React.createClass({
  displayName: "App",

  getInitialState() {
    let user = localStorage.getItem('user');
    return {
      currentUser: user,
      isLoggedIn: user ? true : false
    };
  },

  componentDidMount() {
    // TODO @palcu: Do API request to /current and re-render whole app
  },

  render() {
    return <div className="main">
      <RouteHandler currentUser={this.state.currentUser}
                    isLoggedIn={this.state.isLoggedIn}
                    login={this.login}
                    logout={this.logout} />
      <Footer />
    </div>;
  },

  login(user) {
    this.setState({
      isLoggedIn: true,
      currentUser: user
    });
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('user');
    this.setState({
      isLoggedIn: false,
      currentUser: null
    });
  }
});


let routes = (
  <Route path="/" handler={App}>
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

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root />, document.getElementById("app"));
});

export default App;
