"use strict";

import React from "react";
import { Button } from "react-bootstrap";
import { Form,
         CharField as charField,
         EmailField as emailField,
         DecimalField as decimalField,
         DateField as dateField,
         RenderForm } from "newforms";

let RegistrationFormSchema = Form.extend({
  email: emailField({required: true}),
  address: charField({required: true}),
  city: charField({required: true}),
  // TODO @palcu: this should be a select w/ data populated from a contant
  county: charField({required: true}),
  // TODO @palcu: this should be a select w/ data populated from a contant
  country: charField({required: true}),
  zipcode: charField({required: true}),
  cnp: charField({required: true, minLength: 13, maxLength: 13}),
  // TODO @palcu: make this radio buttons
  sex: decimalField({required: true}),
  id_card_type: charField({required: true}),
  id_card_number: charField({required: true}),
  phone_number: charField({required: true}),
  school_name: charField({required: true}),
  grade: decimalField({required: true}),
  // TODO @palcu: maybe we could find a gem w/ the data for the 3 fields below
  school_county: charField({required: true}),
  school_city: charField({required: true}),
  school_country: charField({required: true}),
  date_of_birth: dateField({required: true}),
  mentoring_teacher_first_name: charField({required: true}),
  mentoring_teacher_last_name: charField({required: true})
});


export default React.createClass({
  displayName: "Registration",

  render() {
    return <div>
      <h1 ref="heading">înregistrare</h1>
      <form onSubmit={this.onSubmit}>
        <RenderForm form={RegistrationFormSchema} ref="registrationForm" />
        <Button bsStyle="primary" onClick={this.onSubmit}>
          Înregistrează-te
        </Button>
      </form>
    </div>;
  },

  onSubmit(event) {
    event.preventDefault();

    let form = this.refs.signInForm.getForm();
    if (form.validate()) {
      this.onRegister(form.cleanedData);
    }
  },

  onRegister(formData) {
    // TODO @palcu: find the right URL
    let url = window.config.API_URL + "";

    $.post(url, formData, data => {
      console.log('Poate a mers sa ma inregistrez', data);
    });
  }
});
