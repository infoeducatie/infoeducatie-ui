"use strict";

import React from "react";
import Router from "react-router";
import { Navbar, Nav, NavItem, Row, Col, Thumbnail, Grid, Input, ButtonInput } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";

let { Route, Link, RouteHandler } = Router; // eslint-disable-line

import "./footer.less";
import Facebook from "../../assets/img/icons/fb.png";
import Twitter from "../../assets/img/icons/twitter.png";
import Google from "../../assets/img/icons/gplus.png";
import Github from "../../assets/img/icons/github.png";

import $ from "jquery";

export default React.createClass({
  displayName: "Footer",

  newsletterEmailChange(event) {
    this.setState({
      newsletterEmail: event.currentTarget.value
    });
  },

  newsletterSubmit(event) {
    event.preventDefault();

    var re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.exec(this.state.newsletterEmail)) {
      //alert("Emailul nu este valid");
      return;
    }

    let data = {
      EMAIL: this.state.newsletterEmail
    };


    $.ajax({
      url: "//upir.us8.list-manage.com/subscribe/post-json" +
           "?u=3f6ccc8a6a63be50b4bb9b1b1&id=3a8ffa6e4f&c=?",
      method: "POST",
      dataType: "jsonp",
      data: data,
      error: this.newsletterSubscribeError,
      complete: this.newsletterSubscribeResponse
    });
  },

  newsletterSubscribeResponse(response) {
    let data = response.responseJSON;
    return data;
  },

  render() {
    return <Grid className="footer">
      <Row className="small-spacing" />
      <Row className="small-spacing second" />
      <Row>
        <Col>
          <Navbar>
            <Nav className="navbar-nav" ref="nav">
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
      <Row className="small-spacing" />
      <Row className="call-to-action">
        <Col md={6} className="left hidden-xs">
          <Row onSumbmit={this.newsletterSubmit}>
            <Col md={8} mdOffset={2}>
              <form onSubmit={this.newsletterSubmit}>
                <Row className="small-spacing" />
                <Row>
                  <Input required
                         type="text"
                         className="newsletter"
                         bsSize="large"
                         placeholder="Abonează-te la newsletter"
                         onChange={this.newsletterEmailChange} />
                </Row>
                <Row className="small-spacing" />
                <Row>
                  <p className="signup">
                    <ButtonInput type="submit"
                                 value="Abonează-te"
                                 className="link link-ternary" />
                  </p>
                </Row>
                <Row className="small-spacing" />
              </form>
            </Col>
          </Row>
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
