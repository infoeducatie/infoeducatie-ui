"use strict";

import Logo from "file!../../assets/img/logo.png"

import React from "react";
import Router from "react-router";
import { Jumbotron } from "react-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

export default React.createClass({
  displayName: "Header",

  render() {
    return <Jumbotron>
        <img src={Logo} />
        <ul>
          <li><Link to="/">Index</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="dashboard">Dashboard (only if auth)</Link></li>
        </ul>
        <p>{this.props.loggedIn ? "I am signed in." :
                                  "I am not signed in."}</p>
        <RouteHandler/>
      </Jumbotron>
  }
});
