"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import { Input, ButtonInput } from "react-bootstrap";
import DeepLinkedStateMixin from "react-deep-link-state";


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
        county: "Arad",
        country: "România",
        zip_code: "",

        sex: "1",
        cnp: "",
        id_card_type: "",
        id_card_number: "",
        phone_number: "",
        // TODO @palcu: add fallback with jQuery custom plugin
        date_of_birth: "",
        school_name: "",
        grade: "5",
        school_county: "Arad",
        school_city: "",
        school_country: "România",

        mentoring_teacher_first_name: "",
        mentoring_teacher_last_name: "",

        accompanying_teacher_first_name: "",
        accompanying_teacher_last_name: ""
        /*eslint-enable */
      },

      officialParticipant: "false",
      presentInCamp: "false"
    };
  },

  render() {
    return <form onSubmit={this.onFormSubmit} className="RegisterContestant">
      <Input type="select"
             label="Gen *"
             valueLink={this.deepLinkState(["contestant", "sex"])}>
        <option value="1">Masculin</option>
        <option value="2">Feminin</option>
      </Input>
      <Input
        type="text"
        placeholder="România"
        label="Țara *"
        onChange={this.onCountryChange}
        value={this.state.contestant.country}
        required />
      <Input type="select"
             onChange={this.onCountyChange}
             label="Județ *"
             required>
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
        placeholder="Gălăciuc"
        label="Oraș *"
        onChange={this.onCityChange}
        required />
      <Input
        type="text"
        placeholder="1 Infinite Loop"
        label="Adresa *"
        valueLink={this.deepLinkState(["contestant", "address"])}
        required />
      <Input
        type="text"
        placeholder="123456"
        pattern="[0-9]{6,6}"
        title="Codul poștal trebuie să conțină doar 6 caractere numerice"
        label="Cod poștal *"
        valueLink={this.deepLinkState(["contestant", "zip_code"])}
        required />
      <Input
        type="text"
        placeholder="1234567890123"
        label="CNP *"
        pattern="[0-9]{13,13}"
        title="CNP-ul trebuie să conțină doar 13 caractere numerice"
        valueLink={this.deepLinkState(["contestant", "cnp"])}
        required />
      <Input
        type="text"
        placeholder="AA"
        pattern="[a-zA-Z]{2,2}"
        title="Seria CI trebuie să conțină doar 2 litere"
        label="Seria CI *"
        className="uppercase"
        valueLink={this.deepLinkState(["contestant", "id_card_type"])}
        required />
      <Input
        type="text"
        placeholder="123456"
        pattern="[0-9]{6,6}"
        title="Numărul CI trebuie să conțină doar 6 caractere numerice"
        label="Număr CI *"
        valueLink={this.deepLinkState(["contestant", "id_card_number"])}
        required />
      <Input
        type="text"
        placeholder="0721234567"
        pattern="[0-9]{10}"
        title="Numărul de telefon trebuie să conțină doar 10 caractere numerice"
        label="Număr de telefon *"
        valueLink={this.deepLinkState(["contestant", "phone_number"])}
        required />
      <Input
        type="text"
        placeholder="Liceul Numărul 9"
        label="Școala *"
        valueLink={this.deepLinkState(["contestant", "school_name"])}
        required />
      <Input type="select"
             label="Clasa *"
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
        label="Orașul școlii *"
        valueLink={this.deepLinkState(["contestant", "school_city"])}
        required />
      <Input type="select"
             label="Județul școlii *"
             valueLink={this.deepLinkState(["contestant", "school_county"])}
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
        valueLink={this.deepLinkState(["contestant", "school_country"])}
        required />
      <Input
        type="date"
        label="Data nașterii *"
        valueLink={this.deepLinkState(["contestant", "date_of_birth"])}
        required />
      <Input
        type="text"
        placeholder="Ion"
        label="Prenumele profesorului îndrumător *"
        valueLink={this.deepLinkState(["contestant", "mentoring_teacher_first_name"])}
        required />
      <Input
        type="text"
        placeholder="Popescu"
        label="Numele profesorului îndrumător *"
        valueLink={this.deepLinkState(["contestant", "mentoring_teacher_last_name"])}
        required />
      <Input
        type="text"
        placeholder="Maria"
        label="Prenumele profesorului însoțitor "
        valueLink={this.deepLinkState(["contestant", "accompanying_teacher_first_name"])} />
      <Input
        type="text"
        placeholder="Popescu"
        label="Numele profesorului însoțitor"
        valueLink={this.deepLinkState(["contestant", "accompanying_teacher_last_name"])} />
      <Input type="select"
             label="Te-ai calificat la faza județeană? *"
             value={this.state.officialParticipant}
             onChange={this.onOfficialParticipantChange}>
        <option value="true">Da</option>
        <option value="false">Nu</option>
      </Input>
      <Input type="select"
             label="Vei fi prezent în tabără? *"
             value={this.state.presentInCamp}
             onChange={this.onPresentInCampChange}>
        <option value="true">Da</option>
        <option value="false">Nu</option>
      </Input>
      { this.state.presentInCamp === "true" && this.state.officialParticipant === "true" ?
          <Input type="select"
                 label="Vei participa pe un loc gratuit? *"
                 value={this.state.payingCampAcommodation}
                 onChange={this.onPayingCampAcommodation}>
            <option value="false">Da, locul gratuit aferent proiectului.</option>
            <option value="true">Nu, sunt al doilea concurent de la proiect.</option>
          </Input> : null }
      { this.state.payingCampAcommodation === "true" ?
        <p className="alert alert-danger">
          Pentru a participa la tabăra InfoEducație trebuie să te fi calificat prin intermediul etapei județene sau a celei online.
          Fiecare județ poate trimite maxim 5 lucrări și maxim 5 elevi.
          Dacă se trimit mai puțin de 5 lucrări, unele lucrări pot avea 2 elevi, în tabără.
        </p>
        : null }
      <ButtonInput type="submit"
                   value="Pasul următor"
                   disabled={this.state.waitingForServerResponse ||
                             this.state.payingCampAcommodation === "true"} />
      {this.renderErrors()}
    </form>;
  },

  onCityChange(event) {
    let newContestantState = _.clone(this.state.contestant);
    newContestantState.city = event.currentTarget.value;
    newContestantState.school_city = event.currentTarget.value;

    this.setState({contestant: newContestantState});
  },

  onCountyChange(event) {
    let newContestantState = _.clone(this.state.contestant);
    newContestantState.county = event.currentTarget.value;
    newContestantState.school_county = event.currentTarget.value;

    this.setState({contestant: newContestantState});
  },

  onCountryChange(event) {
    let newContestantState = _.clone(this.state.contestant);
    newContestantState.country = event.currentTarget.value;
    newContestantState.school_country = event.currentTarget.value;

    this.setState({contestant: newContestantState});
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

    $.ajax({
      method: "POST",
      url: window.config.API_URL + "contestants.json",
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
