// @flow

import $ from "jquery";
import Raven from "raven-js"
import React from "react";
import ReactDOM from "react-dom"
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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


class App extends React.Component {
  static defaultProps = {
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
  }

  state = {
    current: this.props.current,
    isLoggedIn: !!Cookies.get("accesToken"),
    language: "ro"
  }

  componentDidMount() {
    this.getCurrent();
  }

  render() {
    return <Router>
        <div className="main">
          <Route component={() => <Home {...this.props} />} path="/" />
          <Route component={() => <Jury {...this.props} /> } path="juriu" />
          <Route component={() => <RegisterInContest {...this.props} />} path="inscriere" />
          <Route component={() => <Alumni {...this.props} />} path="alumni" />
          <Route component={() => <Photos {...this.props} />} path="poze" />
          <Route component={() => <Contact {...this.props} />} path="contacte" />
          <Route component={() => <About {...this.props} />} path="despre" />
          <Route component={() => <Register {...this.props} />} path="inregistrare" />
          <Route component={() => <Calendar {...this.props} />} path="calendar" />
          <Route component={() => <Results {...this.props} />} path="rezultate" />
          <Route component={() => <Kitchen {...this.props} />} path="kitchen" />
          <Route component={() => <Contestants {...this.props} />} path="participanti" />
          <Route component={() => <HomeEnglish {...this.props} />} path="home" />
          <Route component={() => <AboutEnglish {...this.props} />} path="about" />
          <Route component={() => <ContactEnglish {...this.props} />} path="contact" />
          <Route component={() => <PhotoEnglish {...this.props} />} path="photos" />
          <Route component={() => <Talks {...this.props} />} path="seminarii" />
          <Route component={() => <Schedule {...this.props} />} path="program" />
          {this.state.language === "ro" ? <Footer current={this.state.current} /> : <FooterEnglish />}
          <SignInModal login={this.login} />
        </div>
      </Router>
  }

  changeLanguage(newLanguage) {
    this.setState({
      language: newLanguage
    });

    if (newLanguage === "en") {
      browserHistory.push('/home')
    } else if (newLanguage === "ro") {
      browserHistory.push('/')
    }
  }

  login(user) {
    Cookies.set("accesToken", user.access_token);
    this.getCurrent();
    browserHistory.push("/inscriere");
  }

  logout() {
    Cookies.remove("accesToken");
    this.setState({
      isLoggedIn: false
    });
    this.getCurrent();
    browserHistory.push("/");
  }

  getCurrent() {
    let accesToken = Cookies.get("accesToken");
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
}

if ("GA_TRACKING_ID" in window.config && window.config.GA_TRACKING_ID.length) {
  ga.initialize(window.config.GA_TRACKING_ID);
  window.config.useGA = true;
}

function logPageView() {
  if (window.config.useGA) {
    ga.pageview(window.location.pathname);
  }
}

ReactDOM.render(<App />, document.getElementById("app"))

if ("SENTRY_DSN" in window.config && window.config.SENTRY_DSN.length) {
  Raven.config(window.config.SENTRY_DSN, {
    whitelistUrls: [/((ui\.dev|www|new)\.)?infoeducatie\.ro/]
  }).install();
} else {
  Raven.config(false);
}

export default App;
