"use strict";

import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import { browserHistory } from 'react-router';

import SignInForm from "./sign-in-form";


export default React.createClass({
  displayName: "SignInModal",

  getInitialState() {
    return {
      hasErrored: false
    };
  },

  closeModal() {
    browserHistory.push({
      pathname: window.location.pathname,
      query: { }
    });
  },

  onSignIn(formData) {
    let data = { };
    data["user[email]"] = formData.email;
    data["user[password]"] = formData.password;

    $.ajax({
      url: window.config.API_URL + "sign_in",
      method: "POST",
      success: this.onSignInSuccess,
      error: this.onSignInError,
      data: data
    });
  },

  onSignInSuccess(data) {
    this.closeModal();
    this.props.login(data);
  },

  onSignInError() {
    this.setState({
      hasErrored: true
    });
  },

  showModal() {
    return (location.search.indexOf("login=true") == 1)
  },

  render() {
    return (
      <Modal show={this.showModal()} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Autentificare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm onSignIn={this.onSignIn}
                      hasErrored={this.state.hasErrored} />
          {this.renderRegisterMessage()}
        </Modal.Body>
      </Modal>
    );
  },

  renderRegisterMessage() {
    return <p>
      Dacă nu ai un cont,&nbsp;
      <a href="#" onClick={this.onRegisterClick}>creează unul nou aici</a>.
    </p>;
  },

  onRegisterClick(event) {
    event.preventDefault();
    this.closeModal();
    browserHistory.push("/inregistrare");
  }
});
