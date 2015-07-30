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
import Schedule from "./components/schedule";

import HomeEnglish from "./components/english/home";
import AboutEnglish from "./components/english/about";
import FooterEnglish from "./components/english/footer";
import ContactEnglish from "./components/english/contact";
import PhotoEnglish from "./components/english/photos";


let App = React.createClass({
  displayName: "App",
  mixins: [Navigation],

  getDefaultProps() {
    return {
      current: {
        edition: {
          motto: "Perseverează, mergi mai departe!",
          year: 2015,
          count: 22
        },
        stats: {
          total_participants: 0,
          total_projects: 0,
          total_counties: 0
        },
        last_edition_with_results: {
          year: 2014,
          id: 0,
          name: 'Editia 2014'
        }
      },
    };
  },

  getInitialState() {
    let accesToken = ReactCookie.load("accesToken");
    return {
      current: this.props.current,
      isLoggedIn: accesToken ? true : false,
      language: "ro"
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
                    logout={this.logout}
                    lastEditionWithResults={this.state.current.last_edition_with_results} />
      {this.state.language === "ro" ? <Footer /> : <FooterEnglish />}
    </div>;
  },

  changeLanguage(newLanguage) {
    let path = this.context.router.getCurrentPathname();

    this.setState({
      language: newLanguage
    });

    if (newLanguage === "en" && path !== "/en/home") {
      this.transitionTo("/home");
    } else if (newLanguage === "ro" && path !== "/") {
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
    <Route handler={Home} name="home" path="acasa"/>
    <Route handler={Jury} name="jury" path="juriu" />
    <Route handler={RegisterInContest} name="register-in-contest" path="inscriere" />
    <Route handler={Alumni} name="alumni" />
    <Route handler={Photos} name="photos" path="poze" />
    <Route handler={Contact} name="contact" path="contacte" />
    <Route handler={About} name="about" path="despre" />
    <Route handler={Register} name="register" path="inregistrare" />
    <Route handler={Calendar} name="calendar" />
    <Route handler={Results} name="results" path="rezultate" />
    <Route handler={Kitchen} name="kitchen" />
    <Route handler={Contestants} name="contestants" path="participanti" />
    <Route handler={HomeEnglish} name="home-english" path="home" />
    <Route handler={AboutEnglish} name="about-english" path="about" />
    <Route handler={ContactEnglish} name="contact-english" path="contact" />
    <Route handler={PhotoEnglish} name="photos-english" path="photos" />
    <Route handler={Talks} name="talks"path="seminarii" />
    <Route handler={Schedule} name="schedule"path="program" />
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
