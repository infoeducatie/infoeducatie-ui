"use strict";

import "!style!css!less!./../main.less";
import "!style!css!less!./header.less";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

export default React.createClass({
  displayName: "Header",

  render() {
    let dashboardNavItem = <NavItem>
      <Link to="dashboard">Dashboard</Link>
    </NavItem>;

    return <div>
        <div id="navbar-img"></div>
        <Navbar brand="InfoEducatie">
            <Nav right ref="nav">
                <NavItemLink to="/">Acasa</NavItemLink>
                <NavItemLink to="news">Stiri</NavItemLink>
                <NavItemLink to="alumni">Alumni</NavItemLink>
                <NavItemLink to="photos">Poze</NavItemLink>
                <NavItemLink to="galaciuc">Galaciuc</NavItemLink>
                <NavItemLink className="register-label" to="register">Inscrie-te!</NavItemLink>
                {this.props.isLoggedIn ? {dashboardNavItem} : null}
            </Nav>
        </Navbar>
    </div>;
  }
});
