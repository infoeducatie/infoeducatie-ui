"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./header.less";
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

  renderNextLanguage() {
    if (this.props.language === "en") {
      return "ro";
    } else {
      return "en";
    }
  },

  renderEnglishHeader() {
    return <Nav className="navbar-nav" eventKey={0} right ref="nav">
      <NavItemLink to="/">Home</NavItemLink>
      <NavItemLink to="about-english">About</NavItemLink>
      <NavItem onClick={this.props.changeLanguage}>{this.renderNextLanguage()}</NavItem>
    </Nav>;
  },

  renderRegisterLinks() {
    if (this.props.language === "ro") {
      return <Nav className="navbar-nav" eventKey={0} right ref="nav">
        <NavItemLink to="/">Acas&#259;</NavItemLink>
        <NavItemLink to="alumni">Alumni</NavItemLink>
        <NavItemLink to="seminars">Seminarii</NavItemLink>
        <NavItemLink to="contestants">Participanți</NavItemLink>
        <NavItemLink to="jury">Juriu</NavItemLink>
        <NavItem onClick={this.props.logout}>Delogare</NavItem>
        <NavItemLink to="register-in-contest">Înscrie Proiect</NavItemLink>
        <NavItem onClick={this.props.changeLanguage}>{this.renderNextLanguage()}</NavItem>
      </Nav>;
    } else {
      return this.renderEnglishHeader();
    }
  },

  renderUnregisterLinks() {
    if (this.props.language === "ro") {
      return <Nav className="navbar-nav" eventKey={0} right ref="nav">
        <NavItemLink to="/">Acas&#259;</NavItemLink>
        <NavItemLink to="alumni">Alumni</NavItemLink>
        <NavItemLink to="seminars">Seminarii</NavItemLink>
        <NavItemLink to="contestants">Participanți</NavItemLink>
        <NavItemLink to="jury">Juriu</NavItemLink>
        <NavItem><SignIn login={this.props.login} /></NavItem>
        <NavItemLink to="register">Înregistrează-te</NavItemLink>
        <NavItem onClick={this.props.changeLanguage}>{this.renderNextLanguage()}</NavItem>
      </Nav>;
    } else {
      return this.renderEnglishHeader();
    }
  }
});
