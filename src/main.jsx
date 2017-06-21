"use strict";

import $ from "jquery";
import Raven from "raven-js"
import React from "react";
import ReactDOM from "react-dom"
import ReactCookie from "react-cookie";
import { Router, Route, DefaultRoute, Navigation, browserHistory, IndexRoute } from 'react-router';
import ga from "react-ga";
import "./main.less";

import SignInModal from "./components/sign-in-modal";
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
          year: 2017,
          id: 1,
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
          name: "Editia 2017 Online"
        }
      }
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
      {React.cloneElement(this.props.children, {
        current: this.state.current,
        edition: this.state.current.edition,
        user: this.state.current.user,
        registration: this.state.current.registration,
        refreshCurrent: this.getCurrent,
        isLoggedIn: this.state.isLoggedIn,
        language: this.state.language,
        changeLanguage: this.changeLanguage,
        logout: this.logout,
        lastEditionWithResults: this.state.current.last_edition_with_results
      })}
      {this.state.language === "ro" ? <Footer current={this.state.current} /> : <FooterEnglish />}
      <SignInModal login={this.login} />
    </div>;
  },

  changeLanguage(newLanguage) {
    this.setState({
      language: newLanguage
    });

    if (newLanguage === "en") {
      browserHistory.push('/home')
    } else if (newLanguage === "ro") {
      browserHistory.push('/')
    }
  },

  login(user) {
    ReactCookie.save("accesToken", user.access_token);
    this.getCurrent();
    browserHistory.push("/inscriere");
  },

  logout() {
    ReactCookie.remove("accesToken");
    this.setState({
      isLoggedIn: false
    });
    this.getCurrent();
    browserHistory.push("/");
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
  <Router  history={browserHistory} onUpdate={logPageView}>
    <Route component={App} path="/">
       <IndexRoute component={Home} />
       <Route component={Home} path="acasa"/>
       <Route component={Jury} path="juriu" />
       <Route component={RegisterInContest} path="inscriere" />
       <Route component={Alumni} path="alumni" />
       <Route component={Photos} path="poze" />
       <Route component={Contact} path="contacte" />
       <Route component={About} path="despre" />
       <Route component={Register} path="inregistrare" />
       <Route component={Calendar} path="calendar" />
       <Route component={Results} path="rezultate" />
       <Route component={Kitchen} path="kitchen" />
       <Route component={Contestants} path="participanti" />
       <Route component={HomeEnglish} path="home" />
       <Route component={AboutEnglish} path="about" />
       <Route component={ContactEnglish} path="contact" />
       <Route component={PhotoEnglish} path="photos" />
       <Route component={Talks} path="seminarii" />
       <Route component={Schedule} path="program" />
    </Route>
  </Router>
);

if ("GA_TRACKING_ID" in window.config && window.config.GA_TRACKING_ID.length) {
  ga.initialize(window.config.GA_TRACKING_ID);
  window.config.useGA = true;
}

function logPageView() {
  if (window.config.useGA) {
    ga.pageview(window.location.pathname);
  }
}

ReactDOM.render(routes, document.getElementById("app"))

if ("SENTRY_DSN" in window.config && window.config.SENTRY_DSN.length) {
  Raven.config(window.config.SENTRY_DSN, {
    whitelistUrls: [/((ui\.dev|www|new)\.)?infoeducatie\.ro/]
  }).install();
} else {
  Raven.config(false);
}

export default App;
