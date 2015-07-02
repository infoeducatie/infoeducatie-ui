"use strict";

import $ from "jquery";
import Raven from "raven-js"
import React from "react";
import ReactCookie from "react-cookie";
import Router from "react-router";
let { Route, RouteHandler, DefaultRoute, Navigation } = Router; // eslint-disable-line
import "babel-core/polyfill";
import "./main.less";

import Photos from "./components/photos";
import Alumni from "./components/alumni";
import RegisterInContest from "./components/register-in-contest";
import About from "./components/about";
import Register from "./components/register";
import Jury from "./components/jury";
import Home from "./components/home";
import Calendar from "./components/calendar";
import Results from "./components/results";
import Kitchen from "./components/kitchen";
import Footer from "./components/footer";
import Contestants from "./components/contestants/contestants";
import Seminars from "./components/seminars";


let App = React.createClass({
  displayName: "App",
  mixins: [Navigation],

  getDefaultProps() {
    return {
      current: {
        edition: {
          motto: "Perseverează, mergi mai departe!",
          year: 2015
        },
        stats: {
          total_participants: 0,
          total_projects: 0,
          total_counties: 0
        },
        registration: {
          has_contestant: false
        }
      }
    };
  },

  getInitialState() {
    let accesToken = ReactCookie.load("accesToken");
    return {
      current: this.props.current,
      isLoggedIn: accesToken ? true : false
    };
  },

  componentDidMount() {
    this.getCurrent();
  },

  render() {
    return <div className="main">
      <RouteHandler current={this.state.current}
                    refreshCurrent={this.getCurrent}
                    isLoggedIn={this.state.isLoggedIn}
                    login={this.login}
                    logout={this.logout} />
      <Footer />
    </div>;
  },

  login(user) {
    ReactCookie.save("accesToken", user.access_token);
    this.getCurrent();
    this.transitionTo("register-in-contest");
  },

  logout() {
    ReactCookie.remove("accesToken");
    this.setState({
      isLoggedIn: false
    });
    this.getCurrent();
    this.transitionTo("/");
  },

  getCurrent() {
    let accesToken = ReactCookie.load("accesToken");
    if (accesToken) {
      $.ajax({
        method: "GET",
        url: window.config.API_URL + "current.json",
        headers: {
          Authorization: accesToken
        },
        success: (data) => {
          this.setState({
            current: data,
            isLoggedIn: true
          });
        },
        error: () => {
          // This means the user token has expired.
          this.logout();
        }
      });
    }
  }
});


let routes = (
  <Route path="/" handler={App}>
    <Route handler={Home} name="home" />
    <Route handler={Jury} name="jury" />
    <Route handler={RegisterInContest} name="register-in-contest" />
    <Route handler={Alumni} name="alumni" />
    <Route handler={Photos} name="photos" />
    <Route handler={About} name="about" />
    <Route handler={Register} name="register" />
    <Route handler={Calendar} name="calendar" />
    <Route handler={Results} name="results" />
    <Route handler={Kitchen} name="kitchen" />
    <Route handler={Contestants} name="contestants" />
    <Route handler={Seminars} name="seminars" />
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root />, document.getElementById("app"));
});

if ("SENTRY_DSN" in window.config && window.config.SENTRY_DSN.length) {
  Raven.config(window.config.SENTRY_DSN, {
    whitelistUrls: [/((ui\.dev|www|new)\.)?infoeducatie\.ro/]
  }).install();
} else {
  Raven.config(false);
}

export default App;
