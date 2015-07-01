"use strict";

import React from "react";
import DeepLinkedStateMixin from "react-deep-link-state";
import $ from "jquery";
import _ from "lodash";
import { Input, ButtonInput } from "react-bootstrap";

export default React.createClass({
  displayName: "RegisterContestant",
  mixins: [DeepLinkedStateMixin],

  getInitialState() {
    return {
      hasErrored: false,
      waitingForServerResponse: false,
      errors: [],

      contestant: {
        /*eslint-disable */
        address: "",
        city: "",
        county: "",
        country: "",
        zip_code: "",

        sex: "male",
        cnp: "",
        id_card_type: "",
        id_card_number: "",
        phone_number: "",
        // TODO @palcu: add fallback with jQuery custom plugin
        date_of_birth: "",
        school_name: "",
        grade: "5",
        school_county: "",
        school_city: "",
        school_country: "",

        mentoring_teacher_first_name: "",
        mentoring_teacher_last_name: ""
        /*eslint-enable */
      },

      officialParticipant: "false",
      presentInCamp: "false"
    };
  },

  render() {
    return <form onSubmit={this.onFormSubmit} className="RegisterContestant">
      <Input
        type="text"
        placeholder="1 Infinite Loop"
        label="Adresa"
        valueLink={this.deepLinkState(["contestant", "address"])}
        required />
      <Input type="select"
             label="Gen"
             valueLink={this.deepLinkState(["contestant", "sex"])}>
        <option value="male">Masculin</option>
        <option value="female">Feminin</option>
        <option value="undisclosed">N/A</option>
      </Input>
      <Input
        type="text"
        placeholder="Gălăciuc"
        label="Oraș"
        valueLink={this.deepLinkState(["contestant", "city"])}
        required />
      <Input
        type="text"
        placeholder="Vrancea"
        label="Județ"
        valueLink={this.deepLinkState(["contestant", "county"])}
        required />
      <Input
        type="text"
        placeholder="România"
        label="Țara"
        valueLink={this.deepLinkState(["contestant", "country"])}
        required />
      <Input
        type="text"
        placeholder="123456"
        label="Cod Poștal"
        valueLink={this.deepLinkState(["contestant", "zip_code"])}
        required />
      <Input
        type="text"
        placeholder="1234567890123"
        label="CNP"
        valueLink={this.deepLinkState(["contestant", "cnp"])}
        required />
      <Input
        type="text"
        placeholder="AA"
        label="Seria CI"
        valueLink={this.deepLinkState(["contestant", "id_card_type"])}
        required />
      <Input
        type="text"
        placeholder="123456"
        label="Număr CI"
        valueLink={this.deepLinkState(["contestant", "id_card_number"])}
        required />
      <Input
        type="text"
        placeholder="0721234567"
        label="Număr De Telefon"
        valueLink={this.deepLinkState(["contestant", "phone_number"])}
        required />
      <Input
        type="text"
        placeholder="Liceul Numărul 9"
        label="Școala"
        valueLink={this.deepLinkState(["contestant", "school_name"])}
        required />
      <Input type="select"
             label="Clasa"
             valueLink={this.deepLinkState(["contestant", "grade"])}
             required>
        <option value="5">Clasa a V-a</option>
        <option value="6">Clasa a VI-a</option>
        <option value="7">Clasa a VII-a</option>
        <option value="8">Clasa a VIII-a</option>
        <option value="9">Clasa a IX-a</option>
        <option value="10">Clasa a X-a</option>
        <option value="11">Clasa a XI-a</option>
        <option value="12">Clasa a XII-a</option>
      </Input>
      <Input
        type="text"
        placeholder="București"
        label="Orașul Școlii"
        valueLink={this.deepLinkState(["contestant", "school_city"])}
        required />
      <Input
        type="text"
        placeholder="București"
        label="Județul Școlii"
        valueLink={this.deepLinkState(["contestant", "school_county"])}
        required />
      <Input
        type="text"
        placeholder="România"
        label="Țara Școlii"
        valueLink={this.deepLinkState(["contestant", "school_country"])}
        required />
      <Input
        type="date"
        label="Data Nașterii"
        valueLink={this.deepLinkState(["contestant", "date_of_birth"])}
        required />
      <Input
        type="text"
        placeholder="Ion"
        label="Prenumele Profesorului Îndrumător"
        valueLink={this.deepLinkState(["contestant", "mentoring_teacher_first_name"])}
        required />
      <Input
        type="text"
        placeholder="Popescu"
        label="Numele Profesorului Îndrumător"
        valueLink={this.deepLinkState(["contestant", "mentoring_teacher_last_name"])}
        required />
      <Input type="select"
             label="Te-ai calificat la faza județeană?"
             value={this.state.officialParticipant}
             onChange={this.onOfficialParticipantChange}>
        <option value="true">Da</option>
        <option value="false">Nu</option>
      </Input>
      <Input type="select"
             label="Vei fi prezent în tabără?"
             value={this.state.presentInCamp}
             onChange={this.onPresentInCampChange}>
        <option value="true">Da</option>
        <option value="false">Nu</option>
      </Input>
      { this.state.presentInCamp === "true" && this.state.officialParticipant === "true" ?
          <Input type="select"
                 label="Vei participa pe un loc gratuit?"
                 value={this.state.payingCampAcommodation}
                 onChange={this.onPayingCampAcommodation}>
            <option value="false">Da, locul gratuit aferent proiectului.</option>
            <option value="true">Nu, sunt al doilea participant de la proiect.</option>
          </Input> : null }
      { this.state.payingCampAcommodation === "true" ?
        <p className="alert alert-warning">
          La sosirea în tabără va trebui să achiți suma pentru cazare și masă.
        </p>
        : null }
      <ButtonInput type="submit"
                   value="Pasul următor"
                   disabled={this.state.waitingForServerResponse} />
      {this.renderErrors()}
    </form>;
  },

  renderErrors() {
    if (this.state.hasErrored) {
      let errors = _.clone(this.state.errors);

      if (!errors.length) {
        errors.push("Ne pare rău, avem o problemă cu serverul!");
      }

      return <ul className="errors list-group">
        {errors.map((error) => {
          return <li className="list-group-item list-group-item-danger"
                     key={error}>
            {error}
          </li>;
        })}
      </ul>;
    }
  },

  onOfficialParticipantChange(event) {
    if (this.state.presentInCamp === "true") {
      this.setState({
        payingCampAcommodation: "true"
      });
    }
    this.setState({
      officialParticipant: event.currentTarget.value
    });
  },

  onPresentInCampChange(event) {
    /// XXX: here be dragons flying
    if (event.currentTarget.value === "true") {
      this.setState({
        payingCampAcommodation: "true"
      });
    } else {
      this.setState({
        payingCampAcommodation: "false"
      });
    }

    this.setState({
      presentInCamp: event.currentTarget.value
    });
  },

  onPayingCampAcommodation(event) {
    this.setState({
      payingCampAcommodation: event.currentTarget.value
    });
  },

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.waitingForServerResponse) {
      return false;
    }

    this.setState({
      waitingForServerResponse: true
    });

    let data = {};
    _.forIn(this.state.contestant, (value, key) => {
      let transformedKey = `contestant[${key}]`;
      data[transformedKey] = value;
    });
    data["contestant[official]"] = this.state.officialParticipant;
    data["contestant[present_in_camp]"] = this.state.presentInCamp;
    data["contestant[paying_camp_accommodation]"] = false;

    let headers = {
      "Authorization": this.props.currentUser.access_token
    };

    $.ajax({
      method: "POST",
      url: window.config.API_URL + "contestants.json",
      headers: headers,
      data: data,
      success: this.props.hasSubmited,
      error: this.onRequestError
    });
  },

  onRequestError(data) {
    this.setState({
      hasErrored: true,
      waitingForServerResponse: false
    });

    let errors = [];

    if (("responseJSON" in data) && _.isArray(data.responseJSON)) {
      _.forIn(data.responseJSON, (value, key) => {
        value.map((error) => {
          errors.push(key + " " + error);
        });
      });

      this.setState({
        errors: errors
      });
    }
  }
});
