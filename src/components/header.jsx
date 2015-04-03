"use strict";

import Logo from "file!../../assets/img/logo.png"

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

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
            {this.props.isLoggedIn ? {dashboardNavItem} : null}
        </Nav>
    </Navbar>;
  }
});
