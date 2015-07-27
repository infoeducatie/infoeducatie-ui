"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import { Input, ButtonInput } from "react-bootstrap";
import DeepLinkedStateMixin from "react-deep-link-state";


export default React.createClass({
  displayName: "RegisterTeacher",
  mixins: [DeepLinkedStateMixin],

  getInitialState() {
    return {
      hasErrored: false,
      waitingForServerResponse: false,
      errors: [],

      teacher: {
        /*eslint-disable */
        sex: "1",
        phone_number: "",
        school_name: "",
        school_county: "Arad",
        school_city: "",
        school_country: "România"
        /*eslint-enable */
      }
    };
  },

  render() {
    return <form onSubmit={this.onFormSubmit} className="RegisterTeacher">
      <Input type="select"
             label="Gen *"
             valueLink={this.deepLinkState(["teacher", "sex"])}>
        <option value="1">Masculin</option>
        <option value="2">Feminin</option>
        <option value="3">Nespecificat</option>
      </Input>

      <Input
        type="text"
        placeholder="0721234567"
        pattern="[0-9]{10}"
        title="Numărul de telefon trebuie să conțină doar 10 caractere numerice"
        label="Număr de telefon *"
        valueLink={this.deepLinkState(["teacher", "phone_number"])}
        required />
      <Input
        type="text"
        placeholder="Liceul Numărul 9"
        label="Școala *"
        valueLink={this.deepLinkState(["teacher", "school_name"])}
        required />
      <Input
        type="text"
        placeholder="București"
        label="Orașul școlii *"
        valueLink={this.deepLinkState(["teacher", "school_city"])}
        required />
      <Input type="select"
             label="Județul școlii *"
             valueLink={this.deepLinkState(["teacher", "school_county"])}
             required >
        <option value="Alba">Alba</option>
        <option value="Arad">Arad</option>
        <option value="Argeș">Argeș</option>
        <option value="Bacău">Bacău</option>
        <option value="Bihor">Bihor</option>
        <option value="Bistrița Năsăud">Bistrița Năsăud</option>
        <option value="Botoșani">Botoșani</option>
        <option value="Brașov">Brașov</option>
        <option value="Brăila">Brăila</option>
        <option value="București">București</option>
        <option value="Buzău">Buzău</option>
        <option value="Caraș Severin">Caraș Severin</option>
        <option value="Călărași">Călărași</option>
        <option value="Cluj">Cluj</option>
        <option value="Constanța">Constanța</option>
        <option value="Covasna">Covasna</option>
        <option value="Dâmbovița">Dâmbovița</option>
        <option value="Dolj">Dolj</option>
        <option value="Galați">Galați</option>
        <option value="Giurgiu">Giurgiu</option>
        <option value="Gorj">Gorj</option>
        <option value="Harghita">Harghita</option>
        <option value="Hunedoara">Hunedoara</option>
        <option value="Ialomița">Ialomița</option>
        <option value="Iași">Iași</option>
        <option value="Ilfov">Ilfov</option>
        <option value="Maramureș">Maramureș</option>
        <option value="Mehedinți">Mehedinți</option>
        <option value="Mureș">Mureș</option>
        <option value="Neamț">Neamț</option>
        <option value="Olt">Olt</option>
        <option value="Prahova">Prahova</option>
        <option value="Satu Mare">Satu Mare</option>
        <option value="Sălaj">Sălaj</option>
        <option value="Sibiu">Sibiu</option>
        <option value="Suceava">Suceava</option>
        <option value="Teleorman">Teleorman</option>
        <option value="Timiș">Timiș</option>
        <option value="Tulcea">Tulcea</option>
        <option value="Vaslui">Vaslui</option>
        <option value="Vâlcea">Vâlcea</option>
        <option value="Vrancea">Vrancea</option>
      </Input>
      <Input
        type="text"
        placeholder="România"
        label="Țara școlii *"
        valueLink={this.deepLinkState(["teacher", "school_country"])}
        required />
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
        errors.push("Formularul nu a putut fi trimis.");
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

    $.ajax({
      method: "POST",
      url: window.config.API_URL + "teachers.json",
      headers: {
        Authorization: this.props.access_token
      },
      data: data,
      success: this.props.onSubmit,
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
