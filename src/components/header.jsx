"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import SignIn from "./sign-in"


export default React.createClass({
  displayName: "Header",

  render() {
    let dashboardNavItem = <NavItem>
      <Link to="dashboard">Dashboard</Link>
    </NavItem>;

    return <Navbar brand="InfoEducatie">
        <Nav ref="nav">
            <NavItem><Link to="/">Acasa</Link></NavItem>
            <NavItem><Link to="news">Stiri</Link></NavItem>
            <NavItem><Link to="alumini">Alumni</Link></NavItem>
            <NavItem><Link to="photos">Poze</Link></NavItem>
            <NavItem><Link to="galaciuc">Galaciuc</Link></NavItem>
            <NavItem><Link to="register">Inscrie-te!</Link></NavItem>
            <NavItem><SignIn /></NavItem>
            {this.props.isLoggedIn ? {dashboardNavItem} : null}
        </Nav>
    </Navbar>;
  }
});
