"use strict";

import React from "react";
import { Input, ButtonInput } from "react-bootstrap";

export default React.createClass({
  displayName: "RegisterContestant",

  getInitialState() {
    return {
      hasSubmited: false,
      hasErrored: false,
      waitingForServerResponse: false,
      errors: [],
      contestantAddress: "",
      contestantCity: "",
      contestantCounty: "",
      contestantCountry: "",
      contestantZIP: "",
      contestantCNP: "",
      contestantIDCardType: "",
      contestantIDCardNumber: "",
      contestantPhoneNumber: "",
      contestantSchoolName: "",
      contestantGradeNumber: "",
      schoolCity: "",
      schoolCounty: "",
      schoolCountry: "",
      // TODO @palcu: add fallback with jQuery custom plugin
      contestantBirthday: "",
      teacherFirstName: "",
      teacherLastName: "",
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
        onChange={this.onAdressChange}
        required />
      <Input
        type="text"
        placeholder="Gălăciuc"
        label="Oraș"
        onChange={this.onCityChange}
        required />
      <Input
        type="text"
        placeholder="Vrancea"
        label="Județ"
        onChange={this.onCountyChange}
        required />
      <Input
        type="text"
        placeholder="România"
        label="Țara"
        onChange={this.onCountryChange}
        required />
      <Input
        type="text"
        placeholder="123456"
        label="Cod Poștal"
        onChange={this.onZIPChange}
        required />
      <Input
        type="text"
        placeholder="1234567890123"
        label="Codul Numeric Personal"
        onChange={this.onCNPChange}
        required />
      <Input
        type="text"
        placeholder="AA"
        label="Seria CI"
        onChange={this.onIDCardTypeChange}
        required />
      <Input
        type="text"
        placeholder="123456"
        label="Număr CI"
        onChange={this.onIDCardNumberChange}
        required />
      <Input
        type="text"
        placeholder="0721234567"
        label="Număr De Telefon"
        onChange={this.onPhoneNumberChange}
        required />
      <Input
        type="text"
        placeholder="Liceul Numărul 9"
        label="Școala"
        onChange={this.onSchoolNameChange}
        required />
      <Input type="select"
             label="Clasa"
             value={this.state.gradeNumber}
             onChange={this.onGradeNumberChange}
             required>
        <option value="5">Clasa a V-a</option>
        <option value="6">Clasa a VI-a</option>
        <option value="7">Clasa a VII-a</option>
        <option value="8">Clasa a VIII-a</option>
        <option value="9">Clasa a XI-a</option>
        <option value="10">Clasa a X-a</option>
        <option value="11">Clasa a XI-a</option>
        <option value="12">Clasa a XII-a</option>
      </Input>
      <Input
        type="text"
        placeholder="București"
        label="Orașul Școlii"
        onChange={this.onSchoolCityChange}
        required />
      <Input
        type="text"
        placeholder="București"
        label="Județul Școlii"
        onChange={this.onSchoolCountyChange}
        required />
      <Input
        type="text"
        placeholder="România"
        label="Țara Școlii"
        onChange={this.onSchoolCountryChange}
        required />
      <Input
        type="date"
        label="Data Nașterii"
        onChange={this.onBirthdayChange}
        required />
      <Input
        type="text"
        placeholder="Ion"
        label="Prenumele Profesorului"
        onChange={this.onTeacherFirstNameChange}
        required />
      <Input
        type="text"
        placeholder="Popescu"
        label="Numele Profesorului"
        onChange={this.onTeacherLastNameChange}
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
    </form>;
  },

  onAdressChange(event) {
    this.setState({
      contestantAddress: event.currentTarget.value
    });
  },

  onCityChange(event) {
    this.setState({
      contestantCity: event.currentTarget.value
    });
  },

  onCountyChange(event) {
    this.setState({
      contestantCounty: event.currentTarget.value
    });
  },

  onCountryChange(event) {
    this.setState({
      contestantCountry: event.currentTarget.value
    });
  },

  onZIPChange(event) {
    this.setState({
      contestantZIP: event.currentTarget.value
    });
  },

  onCNPChange(event) {
    this.setState({
      contestantCNP: event.currentTarget.value
    });
  },

  onIDCardTypeChange(event) {
    this.setState({
      contestantIDCardType: event.currentTarget.value
    });
  },

  onIDCardNumberChange(event) {
    this.setState({
      contestantIDCardNumber: event.currentTarget.value
    });
  },

  onPhoneNumberChange(event) {
    this.setState({
      contestantPhoneNumber: event.currentTarget.value
    });
  },

  onSchoolNameChange(event) {
    this.setState({
      contestantSchoolName: event.currentTarget.value
    });
  },

  onGradeNumberChange(event) {
    this.setState({
      contestantGradeNumber: event.currentTarget.value
    });
  },

  onSchoolCityChange(event) {
    this.setState({
      schoolCity: event.currentTarget.value
    });
  },

  onSchoolCountyChange(event) {
    this.setState({
      schoolCounty: event.currentTarget.value
    });
  },

  onSchoolCountryChange(event) {
    this.setState({
      schoolCountry: event.currentTarget.value
    });
  },

  onBirthdayChange(event) {
    this.setState({
      contestantBirthday: event.currentTarget.value
    });
  },

  onTeacherFirstNameChange(event) {
    this.setState({
      teacherFirstName: event.currentTarget.value
    });
  },

  onTeacherLastNameChange(event) {
    this.setState({
      teacherLastName: event.currentTarget.value
    });
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
    console.log(this.state)
    // TODO @palcu: send to server
  }
});
