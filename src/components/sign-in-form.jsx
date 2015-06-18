"use strict";

import React from "react";

import { Button } from "react-bootstrap";
let BootstrapForm = require('newforms-bootstrap');
import { Form,
         CharField as charField,
         EmailField as emailField,
         PasswordInput,
         RenderForm } from "newforms";


let SignInFormSchema = Form.extend({
  email: emailField({required: true}),
  password: charField({widget: PasswordInput, required: true})
});


export default React.createClass({
  displayName: "SignInForm",

  propTypes: {
    onSignIn: React.PropTypes.func.isRequired
  },

  render() {
    return <form onSubmit={this.onSubmit}>
      <RenderForm form={SignInFormSchema} ref="signInForm">
        <BootstrapForm />
      </RenderForm>
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
