"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";
import { Row, Col, FormControl, FormGroup, Button, ListGroup, ListGroupItem } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

const NewsletterForm = createLegacyComponent({
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

    request({
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
            {this.props.t("footer.newsletterDuplicate")}
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
              <FormGroup controlId="newsletter-email">
                <label className="visually-hidden" htmlFor="newsletter-email">
                  {this.props.t("footer.newsletterLabel")}
                </label>
                <FormControl
                     aria-describedby="newsletter-description"
                     hasFeedback
                     required
                     type="email"
                     name="newsletter-email"
                     autoComplete="email"
                     className="newsletter"
                     bsSize="large"
                     placeholder={this.props.t("footer.newsletterPlaceholder")}
                     bsStyle={this.validationState()}
                     onChange={this.onEmailChange} />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
          { this.state.hasErrored ? this.renderError() : null }
          <Row>
            <Col xs={12}>
              <p className="visually-hidden" id="newsletter-description">
                {this.props.t("footer.newsletterDescription")}
              </p>
              <Button type="submit" className="newsletter-submit">
                {this.props.t("footer.newsletterAction")}
              </Button>
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
          <p>{this.props.t("footer.newsletterSuccess")}</p>
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

export default withTranslation("common")(NewsletterForm);
