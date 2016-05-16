"use strict";

import React from "react";
import { Navbar, Nav, NavItem, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../main.less";

import ROFlag from "../../assets/img/icons/RO.png";
import ENFlag from "../../assets/img/icons/US.png";


export default React.createClass({
  displayName: "Header",

  render() {
    // TODO @palcu: refactor this when in React you will be able to return
    // multiple values
    return <div className="header">
      <Row className="xxsmall-spacing" />
      <Navbar toggleNavKey={0}>
        {this.props.isLoggedIn ? this.renderRegisterLinks()
                               : this.renderUnregisterLinks()}
      </Navbar>
    </div>;
  },

  changeLanguage() {
    if (this.props.language === "en") {
      this.props.changeLanguage("ro");
    } else {
      this.props.changeLanguage("en");
    }
  },

  renderNextLanguage() {
    if (this.props.language === "en") {
      return <img src={ROFlag} />;
    } else {
      return <img src={ENFlag} />;
    }
  },

  renderEnglishHeader() {
    return <Nav className="navbar-nav" eventKey={0} right ref="nav">
      <LinkContainer to="/home"><NavItem>Home</NavItem></LinkContainer>
      <LinkContainer to="/photos"><NavItem>Photos</NavItem></LinkContainer>
      <LinkContainer to="/about"><NavItem>About</NavItem></LinkContainer>
      <NavItem onClick={this.changeLanguage}>{this.renderNextLanguage()}</NavItem>
    </Nav>;
  },

  renderResultsContestants() {
    if (this.props.current.edition.id == this.props.current.last_edition_with_results.id) {
      return <LinkContainer to="/rezultate"><NavItem>Rezultate</NavItem></LinkContainer>;
    } else {
      return <LinkContainer to="/participanti"><NavItem>Participanți</NavItem></LinkContainer>;
    }
  },

  renderRegisterLinks() {
    if (this.props.language === "ro") {
      return <Nav className="navbar-nav" eventKey={0} right ref="nav">
        <LinkContainer to="/acasa"><NavItem>Acas&#259;</NavItem></LinkContainer>
        <LinkContainer to="/alumni"><NavItem>Alumni</NavItem></LinkContainer>
        <LinkContainer to="/seminarii"><NavItem>Seminarii</NavItem></LinkContainer>
        <LinkContainer to="/program"><NavItem>Program</NavItem></LinkContainer>
        { this.renderResultsContestants() }
        <LinkContainer to="/juriu"><NavItem>Juriu</NavItem></LinkContainer>
        <NavItem onClick={this.props.logout}>Delogare</NavItem>
        <LinkContainer to="/inscriere"><NavItem>Înscriere</NavItem></LinkContainer>
        <NavItem onClick={this.changeLanguage}>{this.renderNextLanguage()}</NavItem>
      </Nav>;
    } else {
      return this.renderEnglishHeader();
    }
  },

  renderUnregisterLinks() {
    if (this.props.language === "ro") {
      return <Nav className="navbar-nav" eventKey={0} right ref="nav">
        <LinkContainer to="/acasa"><NavItem>Acas&#259;</NavItem></LinkContainer>
        <LinkContainer to="/alumni"><NavItem>Alumni</NavItem></LinkContainer>
        <LinkContainer to="/seminarii"><NavItem>Seminarii</NavItem></LinkContainer>
        <LinkContainer to="/program"><NavItem>Program</NavItem></LinkContainer>
        { this.renderResultsContestants() }
        <LinkContainer to="/juriu"><NavItem>Juriu</NavItem></LinkContainer>
        <NavItem onClick={this.changeLanguage}>{this.renderNextLanguage()}</NavItem>
      </Nav>;
    } else {
      return this.renderEnglishHeader();
    }
  }
});
