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
      isModalOpen: false
    };
  },

  openModal() {
    this.setState({
      isModalOpen: true
    });
  },

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  },

  render() {
    return <span onClick={this.openModal}>Autentificare</span>;
  },

  onSignIn(formData) {
    let data = { };
    _.keys(formData).forEach(function(key) {
      data[`user[${key}]`] = formData[key];
    });

    $.post(window.config.API_URL + "users/sign_in.json", data, data => {
      window.Auth.login(data);
      this.closeModal();
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
          <SignInForm onSignIn={this.onSignIn} />
        </div>
      </Modal>
    );
  }
});
