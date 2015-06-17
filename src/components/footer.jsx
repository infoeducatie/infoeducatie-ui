"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col, Thumbnail } from "react-bootstrap";
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
      <Row>
        <Col xs={6} md={6} className="block right">
          <Row><div className="newsletter">aboneaz&#258;-te la newsletter</div></Row>
          <Row><div className="signup">&#206;nscrie-te</div></Row>
        </Col>
        <Col xs={6} md={6} className="block">
          <Row>
            <div className="social-logos">
              <ul>
                <li><a href="https://www.facebook.com/infoeducatie" target="_blank"><img alt='Facebook' src={Facebook} /></a></li>
                <li><a href="https://twitter.com/infoeducatie" target="_blank"><img alt='Twitter' src={Twitter} /></a></li>
                <li><a href="https://plus.google.com/+InfoeducatieRomania" target="_blank"><img alt='Google+' src={Google} /></a></li>
                <li><a href="https://github.com/infoeducatie" target="_blank"><img alt='Github' src={Github} /></a></li>
              </ul>
            </div>
          </Row>

          <Row>
            <div className="privacy">
              Protec&#355;ia datelor / Termene &amp; condi&#355;ii
            </div>
          </Row>
          <Row>
            <div className="copyright">
              &copy; 2015 InfoEduca&#355;ie
            </div>
          </Row>
        </Col>
      </Row>
    </Row>;
  }
});
