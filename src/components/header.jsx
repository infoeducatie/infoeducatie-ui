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
      <Navbar>
        <a className="navbar-brand" href="#">
          <img width="200" alt="Brand" src={Logo} />
        </a>
        <Nav className="navbar-nav" right ref="nav">
          <NavItemLink to="/">Acasa</NavItemLink>
          <NavItemLink to="news">Stiri</NavItemLink>
          <NavItemLink to="alumni">Alumni</NavItemLink>
          <NavItemLink to="photos">Poze</NavItemLink>
          <NavItemLink to="galaciuc">Galaciuc</NavItemLink>
          {this.props.isLoggedIn ? null
                                 : <NavItem><SignIn /></NavItem>}
          <NavItemLink className="link link-primary" to="register">
            Inscrie-te!
          </NavItemLink>
        </Nav>
      </Navbar>
    </div>;
  }
});
