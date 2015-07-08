"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "../main.less";
import SignIn from "./sign-in"


export default React.createClass({
  displayName: "Header",

  render() {
    // TODO @palcu: refactor this when in React you will be able to return
    // multiple values
    return <div className="header">
      <Row className="small-spacing" />
      <Navbar toggleNavKey={0}>
        {this.props.isLoggedIn ? this.renderRegisterLinks()
                               : this.renderUnregisterLinks()}
      </Navbar>
    </div>;
  },

  renderRegisterLinks() {
    return <Nav className="navbar-nav" eventKey={0} right ref="nav">
      <NavItemLink to="/">Acas&#259;</NavItemLink>
      <NavItemLink to="alumni">Alumni</NavItemLink>
      <NavItemLink to="seminars">Seminarii</NavItemLink>
      <NavItemLink to="contestants">Participanți</NavItemLink>
      <NavItemLink to="jury">Juriu</NavItemLink>
      <NavItem onClick={this.props.logout}>Delogare</NavItem>
      <NavItemLink to="register-in-contest">Înscrie Proiect</NavItemLink>
    </Nav>;
  },

  renderUnregisterLinks() {
    return <Nav className="navbar-nav" eventKey={0} right ref="nav">
      <NavItemLink to="/">Acas&#259;</NavItemLink>
      <NavItemLink to="alumni">Alumni</NavItemLink>
      <NavItemLink to="seminars">Seminarii</NavItemLink>
      <NavItemLink to="contestants">Participanți</NavItemLink>
      <NavItemLink to="jury">Juriu</NavItemLink>
      <NavItem><SignIn login={this.props.login} /></NavItem>
      <NavItemLink to="register">Înregistrează-te</NavItemLink>
    </Nav>;
  }
});
