"use strict";

import request from "@lib/request";

import _ from "lodash";
import createLegacyComponent from "@lib/create-legacy-component";
import { FormControl, ControlLabel, FormGroup, Button } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

const RegisterContestant = createLegacyComponent({
  displayName: "RegisterContestant",

  getInitialState() {
    return {
      hasErrored: false,
      waitingForServerResponse: false,
      errors: [],

      contestant: {

        address: "",
        city: "",
        county: "Alba",
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
        grade: "9",
        school_county: "Alba",
        school_city: "",
        school_country: "România",

        mentoring_teacher_first_name: "",
        mentoring_teacher_last_name: "",

      },

      officialParticipant: "false",
      presentInCamp: "false"
    };
  },

  onChange(field, event) {
    let contestant = _.clone(this.state.contestant);
    contestant[field] = event.target.value;
    this.setState({ contestant: contestant });
  },

  render() {
    return <form onSubmit={this.onFormSubmit} className="RegisterContestant">
      <FormGroup>
        <ControlLabel>{this.props.t("common.gender")}</ControlLabel>
        <FormControl componentClass="select"
               onChange={this.onChange.bind(this, "sex")}>
          <option value="1">{this.props.t("common.male")}</option>
          <option value="2">{this.props.t("common.female")}</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.country")}</ControlLabel>
        <FormControl
          type="text"
          placeholder={this.props.t("common.countryPlaceholder")}
          onChange={this.onCountryChange}
          value={this.state.contestant.country}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.county")}</ControlLabel>
        <FormControl componentClass="select"
               onChange={this.onCountyChange}
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
          <option value="Alt județ">{this.props.t("common.otherCounty")}</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.city")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="Gălăciuc"
          onChange={this.onCityChange}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.address")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="1 Infinite Loop"
          onChange={this.onChange.bind(this, "address")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.zipCode")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="123456"
          pattern="[0-9]{6,6}"
          title={this.props.t("contestant.zipCodeRule")}
          onChange={this.onChange.bind(this, "zip_code")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.personalId")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="1234567890123"
          pattern="[0-9]{13,13}"
          title={this.props.t("contestant.personalIdRule")}
          onChange={this.onChange.bind(this, "cnp")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.idSeries")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="AA"
          pattern="[a-zA-Z]{2,2}"
          title={this.props.t("contestant.idSeriesRule")}
          className="uppercase"
          onChange={this.onChange.bind(this, "id_card_type")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.idNumber")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="123456"
          pattern="[0-9]{6,6}"
          title={this.props.t("contestant.idNumberRule")}
          onChange={this.onChange.bind(this, "id_card_number")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("common.phone")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="0721234567"
          pattern="[0-9]{10}"
          title={this.props.t("common.phoneRule")}
          onChange={this.onChange.bind(this, "phone_number")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("common.school")}</ControlLabel>
        <FormControl
          type="text"
          placeholder={this.props.t("common.schoolPlaceholder")}
          onChange={this.onChange.bind(this, "school_name")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.grade")}</ControlLabel>
        <FormControl componentClass="select"
               onChange={this.onChange.bind(this, "grade")}
               required>
          <option value="9">{this.props.t("contestant.gradeOption", { grade: "IX" })}</option>
          <option value="10">{this.props.t("contestant.gradeOption", { grade: "X" })}</option>
          <option value="11">{this.props.t("contestant.gradeOption", { grade: "XI" })}</option>
          <option value="12">{this.props.t("contestant.gradeOption", { grade: "XII" })}</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("common.schoolCity")}</ControlLabel>
        <FormControl
          type="text"
          placeholder={this.props.t("common.cityPlaceholder")}
          onChange={this.onChange.bind(this, "school_city")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("common.schoolCounty")}</ControlLabel>
        <FormControl componentClass="select"
               onChange={this.onChange.bind(this, "school_county")}
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
          <option value="Alt județ">{this.props.t("common.otherCounty")}</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("common.schoolCountry")}</ControlLabel>
        <FormControl
          type="text"
          placeholder={this.props.t("common.countryPlaceholder")}
          onChange={this.onChange.bind(this, "school_country")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.birthDate")}</ControlLabel>
        <FormControl
          type="date"
          onChange={this.onChange.bind(this, "date_of_birth")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.mentorFirstName")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="Ion"
          onChange={this.onChange.bind(this, "mentoring_teacher_first_name")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.mentorLastName")}</ControlLabel>
        <FormControl
          type="text"
          placeholder="Popescu"
          onChange={this.onChange.bind(this, "mentoring_teacher_last_name")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.qualified")}</ControlLabel>
        <FormControl componentClass="select"
               value={this.state.officialParticipant}
               onChange={this.onOfficialParticipantChange}>
          <option value="true">{this.props.t("common.yes")}</option>
          <option value="false">{this.props.t("common.no")}</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("contestant.attending")}</ControlLabel>
        <FormControl componentClass="select"
               value={this.state.presentInCamp}
               onChange={this.onPresentInCampChange}>
          <option value="true">{this.props.t("common.yes")}</option>
          <option value="false">{this.props.t("common.no")}</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      { this.state.presentInCamp === "true" && this.state.officialParticipant === "true" ?
          <FormGroup>
            <ControlLabel>{this.props.t("contestant.freePlace")}</ControlLabel>
            <FormControl componentClass="select"
                   value={this.state.payingCampAcommodation}
                   onChange={this.onPayingCampAcommodation}>
              <option value="false">{this.props.t("contestant.freePlaceYes")}</option>
              <option value="true">{this.props.t("contestant.freePlaceNo")}</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup> : null }
      { this.state.payingCampAcommodation === "true" ?
        <p className="alert alert-danger">
          {this.props.t("contestant.campNotice")}
        </p>
        : null }
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse ||
                          this.state.payingCampAcommodation === "true"}>
          {this.props.t("common.next")}
        </Button>
      </FormGroup>
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
        errors.push(this.props.t("contestant.genericError"));
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

    request({
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

export default withTranslation("registration")(RegisterContestant);
