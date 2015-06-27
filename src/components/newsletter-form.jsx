"use strict";

import $ from "jquery";
import React from "react";
import { Row, Col, Input, ButtonInput, ListGroup, ListGroupItem } from "react-bootstrap";

export default React.createClass({
  displayName: "NewsletterForm",

  getEmailRegex() {
      return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;
  },

  getInitialState() {
    return {
      subscribed: false,
      hasErrored: false,
      newsletterEmail: ""
    };
  },

  onEmailChange(event) {
    this.setState({
      newsletterEmail: event.currentTarget.value
    });
  },

  validationState() {
    if (!this.state.newsletterEmail.length) {
      return null;
    }
    if (this.getEmailRegex().exec(this.state.newsletterEmail)) {
      return "success";
    }
    return "error";
  },

  onSubmit(event) {
    event.preventDefault();

    if (!this.getEmailRegex().exec(this.state.newsletterEmail)) {
      return null;
    }

    let data = {
      "EMAIL": this.state.newsletterEmail
    };

    $.ajax({
      url: "//upir.us8.list-manage.com/subscribe/post-json" +
           "?u=3f6ccc8a6a63be50b4bb9b1b1&id=3a8ffa6e4f&c=?",
      method: "POST",
      dataType: "jsonp",
      data: data,
      complete: this.subscribeResponse
    });
  },

  subscribeResponse(response) {
    let data = response.responseJSON;
    if (data.result === "error") {
      this.setState({
        hasErrored: true
      });
    } else {
      this.setState({
        subscribed: true
      });
    }
  },

  renderError() {
    return <Row>
      <ListGroup>
        <ListGroupItem bsStyle="danger">
          Adresa de email este deja înregistrată sau un email de
          confirmare a fost deja trimis către tine.
        </ListGroupItem>
      </ListGroup>
    </Row>;
  },

  renderForm() {
    return <Row>
      <Col md={8} mdOffset={2}>
        <form onSubmit={this.onSubmit}>
          <Row>
            <Input required
                   hasFeedback
                   ref="newsletterInput"
                   type="text"
                   className="newsletter"
                   bsSize="large"
                   placeholder="Abonează-te la newsletter"
                   bsStyle={this.validationState()}
                   onChange={this.onEmailChange} />
          </Row>
          { this.state.hasErrored ? this.renderError() : null }
          <Row>
              <ButtonInput type="submit"
                           value="Abonează-te"
                           className="link link-ternary" />
          </Row>
          <Row className="small-spacing" />
        </form>
      </Col>
    </Row>;
  },

  renderSucces() {
    return <Col md={8} mdOffset={2}>
      <Row className="small-spacing" />
      <Row>
        <p>Ești aproape înscris. Mai trebuie să confirmi înscrierea dând
           click pe link-ul trimis către tine prin email.</p>
      </Row>
    </Col>;
  },

  render() {
    return this.state.subscribed ? this.renderSucces() : this.renderForm();
  }
});
