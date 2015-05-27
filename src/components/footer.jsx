// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";
import classSet from "classnames";

let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./footer.less";
import Facebook from "file!../../assets/img/icons/fb.png";

export default React.createClass({
  displayName: "Footer",

  render() {
    return <Row className="footer">
      <Row>
        <Col>
          <Navbar toggleNavKey={0} className="fluid">
            <Nav className="navbar-nav" eventKey={0} ref="nav">
              <NavItemLink to="alumni">Alumni</NavItemLink>
              <NavItemLink to="forum">Forum</NavItemLink>
              <NavItemLink to="schedule">Program</NavItemLink>
              <NavItemLink to="results">Rezultate</NavItemLink>
              <NavItemLink to="jury">Juriu</NavItemLink>
              <NavItemLink to="contact">Contact</NavItemLink>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row className='show-grid'>
        <Col xs={6} md={6} className="show-more right">
          <Row><div className="newsletter">abonează-te la newsletter</div></Row>
          <Row><div className="signup">înscrie-te</div></Row>
        </Col>
        <Col xs={6} md={6} className="showMore">
          <Row><div className="social"><img src={Facebook} /></div></Row>
        </Col>
      </Row>
    </Row>;
  }
});
