"use strict";

import React from "react";
import { Modal, Button, OverlayMixin } from "react-bootstrap";
import { Form, CharField, EmailField, PasswordInput, RenderForm } from "newforms"


let SignInFormSchema = Form.extend({
  email: EmailField(),
  password: CharField({widget: PasswordInput})
});


let SignInForm = React.createClass({
  displayName: "SignInForm",

  render() {
    return <form onSubmit={this.onSubmit}>
      <RenderForm form={SignInFormSchema} ref="signInForm" />
      <Button bsStyle="primary" onClick={this.onSubmit}>Loghează-te</Button>
    </form>;
  },

  onSubmit(event) {
    event.preventDefault();

    let form = this.refs.signInForm.getForm();
    if (form.validate()) {
      this.props.onSignIn(form.cleanedData);
    }
  }
});


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
    return <a href="#" onClick={this.openModal}>Autentificare</a>;
  },

  onSignIn(formData) {
    console.log(formData);
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
