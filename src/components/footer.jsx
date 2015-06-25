"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col, Thumbnail, Grid } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";

let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./footer.less";
import Facebook from "../../assets/img/icons/fb.png";
import Twitter from "../../assets/img/icons/twitter.png";
import Google from "../../assets/img/icons/gplus.png";
import Github from "../../assets/img/icons/github.png";

export default React.createClass({
  displayName: "Footer",

  render() {
    return <Grid className="footer">
      <Row className="small-spacing" />
      <Row className="small-spacing second" />
      <Row>
        <Col md={12}>
          <Navbar>
            <Nav className="navbar-nav" ref="nav">
              <NavItemLink to="alumni">Alumni</NavItemLink>
              <NavItemLink to="forum">Forum</NavItemLink>
              <NavItemLink to="calendar">Calendar</NavItemLink>
              <NavItemLink to="results">Rezultate</NavItemLink>
              <NavItemLink to="jury">Juriu</NavItemLink>
              <NavItemLink to="contact">Contact</NavItemLink>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row className="small-spacing" />
      <Row className="call-to-action">
        <Col md={6} className="left hidden-xs">
          <Row><p className="newsletter">aboneaz&#258;-te la newsletter</p></Row>
          <Row className="small-spacing" />
          <Row><p className="signup"><a href="#" className="link link-ternary">Înscrie-te</a></p></Row>
        </Col>
        <Col md={6}>
          <Row>
            <ul className="social-logos">
              <li><a href="https://www.facebook.com/infoeducatie" target="_blank"><img alt='Facebook' src={Facebook} /></a></li>
              <li><a href="https://twitter.com/infoeducatie" target="_blank"><img alt='Twitter' src={Twitter} /></a></li>
              <li><a href="https://plus.google.com/+InfoeducatieRomania" target="_blank"><img alt='Google+' src={Google} /></a></li>
              <li><a href="https://github.com/infoeducatie" target="_blank"><img alt='Github' src={Github} /></a></li>
            </ul>
          </Row>
          <Row>
            <p className="privacy">
              Protec&#355;ia datelor / Termene &amp; condi&#355;ii
            </p>
          </Row>
          <Row>
            <p className="copyright">
              &copy; 2015 InfoEduca&#355;ie
            </p>
          </Row>
        </Col>
      </Row>
    </Grid>;
  }
});
