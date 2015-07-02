"use strict";

import React from "react";
import { OverlayMixin, Modal } from "react-bootstrap";
import $ from "jquery";
import _ from "lodash";

import SignInForm from "./sign-in-form";


export default React.createClass({
  displayName: "SignIn",
  mixins: [OverlayMixin],

  getInitialState() {
    return {
      isModalOpen: false,
      hasErrored: false
    };
  },

  openModal() {
    this.setState({
      isModalOpen: true
    });
  },

  closeModal() {
    this.setState({
      isModalOpen: false,
      hasErrored: false
    });
  },

  componentDidMount() {
    if (location.search.indexOf("login=true") > 0) {
      this.openModal();
    }
  },

  render() {
    return <span onClick={this.openModal}>Autentificare</span>;
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

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return null;
    }

    return (
      <Modal animation={true}
             bsStyle="primary"
             onRequestHide={this.closeModal}
             title="Autentificare">
        <div className="modal-body">
          <SignInForm onSignIn={this.onSignIn}
                      hasErrored={this.state.hasErrored} />
        </div>
      </Modal>
    );
  }
});
