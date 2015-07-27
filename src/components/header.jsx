"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "../main.less";
import SignIn from "./sign-in"

import ROFlag from "../../assets/img/icons/RO.png";
import ENFlag from "../../assets/img/icons/US.png";


export default React.createClass({
  displayName: "Header",

  render() {
    // TODO @palcu: refactor this when in React you will be able to return
    // multiple values
    return <div className="header">
      <Row className="xxsmall-spacing" />
      <Navbar toggleNavKey={0}>
        {this.props.isLoggedIn ? this.renderRegisterLinks()
                               : this.renderUnregisterLinks()}
      </Navbar>
    </div>;
  },

  changeLanguage() {
    if (this.props.language === "en") {
      this.props.changeLanguage("ro");
    } else {
      this.props.changeLanguage("en");
    }
  },

  renderNextLanguage() {
    if (this.props.language === "en") {
      return <img src={ROFlag} />;
    } else {
      return <img src={ENFlag} />;
    }
  },

  renderEnglishHeader() {
    return <Nav className="navbar-nav" eventKey={0} right ref="nav">
      <NavItemLink to="home-english">Home</NavItemLink>
      <NavItemLink to="photos-english">Photos</NavItemLink>
      <NavItemLink to="about-english">About</NavItemLink>
      <NavItem onClick={this.changeLanguage}>{this.renderNextLanguage()}</NavItem>
    </Nav>;
  },

  renderRegisterLinks() {
    if (this.props.language === "ro") {
      return <Nav className="navbar-nav" eventKey={0} right ref="nav">
        <NavItemLink to="/">Acas&#259;</NavItemLink>
        <NavItemLink to="alumni">Alumni</NavItemLink>
        <NavItemLink to="talks">Seminarii</NavItemLink>
        <NavItemLink to="contestants">Participanți</NavItemLink>
        <NavItemLink to="jury">Juriu</NavItemLink>
        <NavItem onClick={this.props.logout}>Delogare</NavItem>
        <NavItemLink to="register-in-contest">Înscriere</NavItemLink>
        <NavItem onClick={this.changeLanguage}>{this.renderNextLanguage()}</NavItem>
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
        <NavItemLink to="talks">Seminarii</NavItemLink>
        <NavItemLink to="contestants">Participanți</NavItemLink>
        <NavItemLink to="jury">Juriu</NavItemLink>
        <NavItem><SignIn login={this.props.login} /></NavItem>
        <NavItem onClick={this.changeLanguage}>{this.renderNextLanguage()}</NavItem>
      </Nav>;
    } else {
      return this.renderEnglishHeader();
    }
  }
});
