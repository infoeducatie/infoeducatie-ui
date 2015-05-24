"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./footer.less";

export default React.createClass({
  displayName: "Footer",

  render() {
    return <div className="footer">
      <Navbar toggleNavKey={0} className="fluid">
        <Nav className="navbar-nav" eventKey={0} right ref="nav">
          <NavItemLink to="alumni">Alumni</NavItemLink>
          <NavItemLink to="forum">Forum</NavItemLink>
          <NavItemLink to="schedule">Program</NavItemLink>
          <NavItemLink to="results">Rezultate</NavItemLink>
          <NavItemLink to="jury">Juriu</NavItemLink>
          <NavItemLink to="contact">Contact</NavItemLink>
        </Nav>
      </Navbar>
    </div>;
  }
});
