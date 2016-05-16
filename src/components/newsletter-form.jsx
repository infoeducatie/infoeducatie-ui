"use strict";

import $ from "jquery";
import React from "react";
import { Row, Col, FormControl, FormGroup, Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default React.createClass({
  displayName: "NewsletterForm",

  getInitialState() {
    return {
      hasSubmitted: false,
      hasErrored: false,
      newsletterEmail: ""
    };
  },

  onEmailChange(event) {
    this.setState({
      newsletterEmail: event.currentTarget.value
    });
  },

  onSubmit(event) {
    event.preventDefault();

    if (!this.isEmailValid(this.state.newsletterEmail)) {
      return null;
    }

    let data = {
      "EMAIL": this.state.newsletterEmail
    };

    $.ajax({
      url: window.config.MAILCHIMP_URL,
      method: "POST",
      dataType: "jsonp",
      data: data,
      complete: this.subscribeResponse
    });
  },

  renderError() {
    return <Row>
      <Col xs={12}>
        <ListGroup>
          <ListGroupItem bsStyle="danger">
            Adresa de email este deja înregistrată sau un email de
            confirmare a fost deja trimis către tine.
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>;
  },

  renderForm() {
    return <Row>
      <Col xs={8} xsOffset={2}>
        <form onSubmit={this.onSubmit}>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <FormControl
                     hasFeedback
                     required
                     ref="newsletterInput"
                     type="text"
                     className="newsletter"
                     bsSize="large"
                     placeholder="Abonează-te la newsletter"
                     bsStyle={this.validationState()}
                     onChange={this.onEmailChange} />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
          { this.state.hasErrored ? this.renderError() : null }
          <Row>
            <Col xs={12}>
              <Button type="submit" className="link link-ternary">Abonează-te</Button>
            </Col>
          </Row>
          <Row className="small-spacing" />
        </form>
      </Col>
    </Row>;
  },

  renderSucces() {
    return <Col xs={8} xsOffset={2}>
      <Row className="small-spacing" />
      <Row>
        <Col xs={12}>
          <p>Ești aproape înscris. Mai trebuie să confirmi înscrierea dând
             click pe link-ul trimis către tine prin email.</p>
        </Col>
      </Row>
      <Row className="small-spacing" />
    </Col>;
  },

  render() {
    return this.state.hasSubmitted ? this.renderSucces() : this.renderForm();
  },

  isEmailValid(email) {
      let re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;
      if (re.exec(email)) {
        return true;
      }
      return false;
  },

  validationState() {
    if (!this.state.newsletterEmail.length) {
      return null;
    }
    if (this.isEmailValid(this.state.newsletterEmail)) {
      return "success";
    }
    return "error";
  },

  subscribeResponse(response) {
    let data = response.responseJSON;
    if (data.result === "error") {
      this.setState({
        hasErrored: true
      });
    } else {
      this.setState({
        hasSubmitted: true
      });
    }
  }
});
