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
    if (!this.state.newsletterEmail.length)
      return;
    if (this.getEmailRegex().exec(this.state.newsletterEmail))
      return "success";
    return "error";
  },

  onSubmit(event) {
    event.preventDefault();

    if (!this.getEmailRegex().exec(this.state.newsletterEmail))
      return;

    let data = { };
    data["EMAIL"] = this.state.newsletterEmail;

    $.ajax({
      url: "//upir.us8.list-manage.com/subscribe/post-json" +
           "?u=3f6ccc8a6a63be50b4bb9b1b1&id=3a8ffa6e4f&c=?",
      method: "POST",
      dataType: "jsonp",
      data: data,
      complete: this.subscribeResponse,
    });
  },

  subscribeResponse(response) {
    let data = response.responseJSON;
    if (data["result"] == "error")
      this.setState({
        hasErrored: true
      });
    else
      this.props.setNewsletterSubscribed();
  },

  renderError() {
    return <ListGroup>
      <ListGroupItem bsStyle="danger">
        Adresa de email este deja inregistrata sau un email de
        confirmare a fost deja trimis catre tine
      </ListGroupItem>
    </ListGroup>;
  },

  render() {
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
          <Row>
            { this.state.hasErrored ? this.renderError() : null }
          </Row>
          <Row>
              <ButtonInput type="submit"
                           value="Abonează-te"
                           className="link link-ternary" />
          </Row>
          <Row className="small-spacing" />
        </form>
      </Col>
    </Row>;
  }
});
