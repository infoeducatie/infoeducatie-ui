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
    return <div className="header">
      <Row className="small-spacing" />
      <Row>
        <Col>
          <Navbar toggleNavKey={0}>
            <Nav className="navbar-nav" eventKey={0} right ref="nav">
              <NavItemLink to="/">Acas&#259;</NavItemLink>
              <NavItemLink to="contestants">Participanți</NavItemLink>
              <NavItemLink to="jury">Juriu</NavItemLink>
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
