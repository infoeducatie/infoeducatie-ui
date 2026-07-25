"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Nav, NavItem, Row, Col, Grid } from "@ui/bootstrap";
import { LinkContainer } from "@ui/router-bootstrap";
import Facebook from "../../../assets/img/icons/fb.png";
import Twitter from "../../../assets/img/icons/twitter.png";
import Github from "../../../assets/img/icons/github.png";


export default createLegacyComponent({
  displayName: "FooterEnglish",

  render() {
    return <Grid className="footer">
      <Row className="small-spacing" />
      <Row className="small-spacing second" />
      <Row>
        <Col xs={12}>
          <nav aria-label="Secondary navigation" className="navbar-default">
            <Nav className="navbar-nav">
              <NavItem target="_blank" href="https://community.infoeducatie.ro">Forum</NavItem>
              <NavItem target="_blank" rel="noopener noreferrer" href="https://discord.gg/Ef6yav7wAs">Discord</NavItem>
              <NavItem target="_blank" href="https://blog.infoeducatie.ro">Blog</NavItem>
              <LinkContainer to="/contact"><NavItem>Contact</NavItem></LinkContainer>
            </Nav>
          </nav>
        </Col>
      </Row>
      <Row className="small-spacing" />
      <Row className="call-to-action">
        <Col sm={6} smOffset={3} className="text-center">
          <Row>
            <Col xs={12}>
              <ul className="social-logos list-inline">
                <li><a href="https://www.facebook.com/infoeducatie" target="_blank" rel="noreferrer"><img alt="Facebook" height="58" src={Facebook} width="58" /></a></li>
                <li><a href="https://twitter.com/infoeducatie" target="_blank" rel="noreferrer"><img alt="InfoEducatie on X" height="58" src={Twitter} width="58" /></a></li>
                <li><a href="https://github.com/infoeducatie" target="_blank" rel="noreferrer"><img alt="InfoEducatie on GitHub" height="58" src={Github} width="59" /></a></li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="copyright">
                &copy; {new Date().getFullYear()} InfoEducatie
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>;
  }
});
