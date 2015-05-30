// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./header.less";
import Logo from "../../assets/img/logo.png"

import SignIn from "./sign-in"


export default React.createClass({
  displayName: "Header",

  render() {
    return <div className="header">
      <Navbar toggleNavKey={0}>
        <a className="navbar-brand" href="#">
          <img width="200" height="43" alt="Brand" src={Logo} />
        </a>
        <Nav className="navbar-nav" eventKey={0} right ref="nav">
          <NavItemLink to="/">Acas&#259;</NavItemLink>
          <NavItemLink to="news">&#350;tiri</NavItemLink>
          <NavItemLink to="alumni">Alumni</NavItemLink>
          <NavItemLink to="photos">Poze</NavItemLink>
          <NavItemLink to="galaciuc">G&#259;l&#259;ciuc</NavItemLink>
          {this.props.isLoggedIn ? null
                                 : <NavItem><SignIn /></NavItem>}
          <NavItemLink className="link link-primary" to="register">
            Înregistrează-te
          </NavItemLink>
        </Nav>
      </Navbar>
    </div>;
  }
});
