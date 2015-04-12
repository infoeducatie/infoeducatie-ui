"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./header.less";

import SignIn from "./sign-in"


export default React.createClass({
  displayName: "Header",

  render() {
    return <div className="header">
        <div className="header-img" />
        <Navbar brand="InfoEducatie">
            <Nav className="navbar-nav" right ref="nav">
                <NavItemLink to="/">Acasa</NavItemLink>
                <NavItemLink to="news">Stiri</NavItemLink>
                <NavItemLink to="alumni">Alumni</NavItemLink>
                <NavItemLink to="photos">Poze</NavItemLink>
                <NavItemLink to="galaciuc">Galaciuc</NavItemLink>
                {this.props.isLoggedIn ? null
                                       : <NavItem><SignIn /></NavItem>}
                <NavItemLink className="register-label" to="registration">
                    Înscrie-te!
                </NavItemLink>
            </Nav>
        </Navbar>
    </div>;
  }
});
