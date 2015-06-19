"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./header.less";
import Logo from "../../assets/img/logo.png"

import SignIn from "./sign-in"


export default React.createClass({
  displayName: "Header",

  render() {
    return <div className="header">
      <Row className="small-spacing" />
      <Row>
        <Col md={12}>
          <Navbar toggleNavKey={0}>
            <Nav className="navbar-nav" eventKey={0} right ref="nav">
              <NavItemLink to="/">Acas&#259;</NavItemLink>
              <NavItemLink to="news">&#350;tiri</NavItemLink>
              <NavItemLink to="alumni">Alumni</NavItemLink>
              <NavItemLink to="photos">Poze</NavItemLink>
              <NavItemLink to="galaciuc">G&#259;l&#259;ciuc</NavItemLink>
              {this.props.isLoggedIn ? <NavItem onClick={this.props.logout}>Delogare</NavItem>
                                     : <NavItem><SignIn login={this.props.login} /></NavItem>}
              <NavItemLink to="register">
                Înregistrează-te
              </NavItemLink>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </div>;
  }
});
