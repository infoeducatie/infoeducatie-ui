"use strict";

import $ from "jquery";
import Raven from "raven-js"
import React from "react";
import ReactCookie from "react-cookie";
import Router from "react-router";
let { Route, RouteHandler, DefaultRoute, Navigation } = Router; // eslint-disable-line
import ga from "react-ga";
import "babel-core/polyfill";
import "./main.less";

import Photos from "./components/photos";
import Alumni from "./components/alumni";
import RegisterInContest from "./components/register-in-contest";
import About from "./components/about";
import Contact from "./components/contact";
import Register from "./components/register";
import Jury from "./components/jury";
import Home from "./components/home";
import Calendar from "./components/calendar";
import Results from "./components/results";
import Kitchen from "./components/kitchen";
import Footer from "./components/footer";
import Contestants from "./components/contestants/contestants";
import Talks from "./components/talks";

import HomeEnglish from "./components/home-english";
import AboutEnglish from "./components/about-english";
import FooterEnglish from "./components/footer-english";


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
        }
      }
    };
  },

  getInitialState() {
    let accesToken = ReactCookie.load("accesToken");
    return {
      current: this.props.current,
      isLoggedIn: accesToken ? true : false,
      language: "ro",
    };
  },

  componentDidMount() {
    this.getCurrent();
  },

  render() {
    return <div className="main">
      <RouteHandler current={this.state.current}
                    edition={this.state.current.edition}
                    user={this.state.current.user}
                    registration={this.state.current.registration}
                    refreshCurrent={this.getCurrent}
                    isLoggedIn={this.state.isLoggedIn}
                    language={this.state.language}
                    changeLanguage={this.changeLanguage}
                    login={this.login}
                    logout={this.logout} />
      {this.state.language === "ro" ? <Footer /> : <FooterEnglish />}
    </div>;
  },

  changeLanguage() {
    if (this.state.language === "ro") {
      this.setState({
        language: "en"
      });
      this.transitionTo("/en/home");
    } else {
      this.setState({
        language: "ro"
      });
      this.transitionTo("/");
    }
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
    let headers = {};

    if (accesToken) {
      headers = {
        Authorization: accesToken
      };
    }
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "current.json",
      headers: headers,
      success: (data) => {
        this.setState({
          current: data,
          isLoggedIn: data.is_logged_in
        });
      }
    });
  }
});


let routes = (
  <Route path="/" handler={App}>
    <Route handler={Home} name="home" />
    <Route handler={Jury} name="jury" />
    <Route handler={RegisterInContest} name="register-in-contest" />
    <Route handler={Alumni} name="alumni" />
    <Route handler={Photos} name="photos" />
    <Route handler={Contact} name="contact" />
    <Route handler={About} name="about" />
    <Route handler={Register} name="register" />
    <Route handler={Calendar} name="calendar" />
    <Route handler={Results} name="results" />
    <Route handler={Kitchen} name="kitchen" />
    <Route handler={Contestants} name="contestants" />
    <Route handler={HomeEnglish} name="home-english" path="/en/home" />
    <Route handler={AboutEnglish} name="about-english" path="/en/about" />
    <Route handler={Talks} name="talks" />
    <DefaultRoute handler={Home} />
  </Route>
);

if ("GA_TRACKING_ID" in window.config && window.config.GA_TRACKING_ID.length) {
  ga.initialize(window.config.GA_TRACKING_ID);
  window.config.useGA = true;
}

Router.run(routes, Router.HistoryLocation, (Root, state) => {
  if (window.config.useGA) {
    ga.pageview(state.pathname);
  }

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
