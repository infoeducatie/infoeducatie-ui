"use strict";

import _ from "lodash";
import createLegacyComponent from "@lib/create-legacy-component";
import { FormControl, ControlLabel, FormGroup, Button } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import FormMixin from "../../mixins/form"


const RegisterTeacher = createLegacyComponent({
  displayName: "RegisterTeacher",
  mixins: [FormMixin],

  getDefaultProps() {
    return {
      formEndpoint: "teachers.json"
    };
  },

  getInitialState() {
    return {
      teacher: {

        sex: "1",
        phone_number: "",
        school_name: "",
        school_county: "Arad",
        school_city: "",
        school_country: "România"

      }
    };
  },

  onChange(field, event) {
    let teacher = _.clone(this.state.teacher);
    teacher[field] = event.target.value;
    this.setState({ teacher: teacher });
  },

  render() {
    let teacherForm = <p className="alert alert-warning">
        {this.props.t("alreadyRegistered")}
    </p>;

    if (this.props.is_contestant) {
      teacherForm = <p className="alert alert-warning">
          {this.props.t("alreadyRegistered")}
      </p>;
    } else if (!this.props.is_teacher) {
      teacherForm = <form onSubmit={this.onFormSubmit} className="RegisterTeacher">
        <FormGroup controlId="teacher-sex">
          <ControlLabel>{this.props.t("common.gender")}</ControlLabel>
          <FormControl componentClass="select"
                 onChange={this.onChange.bind(this, "sex")}>
            <option value="1">{this.props.t("common.male")}</option>
            <option value="2">{this.props.t("common.female")}</option>
            <option value="3">{this.props.t("common.unspecified")}</option>
          </FormControl>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="teacher-phone-number">
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
        <FormGroup controlId="teacher-school-name">
          <ControlLabel>{this.props.t("common.school")}</ControlLabel>
          <FormControl
            type="text"
            placeholder={this.props.t("common.schoolPlaceholder")}
            onChange={this.onChange.bind(this, "school_name")}
            required />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="teacher-school-city">
          <ControlLabel>{this.props.t("common.schoolCity")}</ControlLabel>
          <FormControl
            type="text"
            placeholder={this.props.t("common.cityPlaceholder")}
            onChange={this.onChange.bind(this, "school_city")}
            required />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="teacher-school-county">
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
        <FormGroup controlId="teacher-school-country">
          <ControlLabel>{this.props.t("common.schoolCountry")}</ControlLabel>
          <FormControl
            type="text"
            placeholder={this.props.t("common.countryPlaceholder")}
            onChange={this.onChange.bind(this, "school_country")}
            required />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <Button type="submit"
                  disabled={this.state.waitingForServerResponse}>
            {this.props.t("common.submit")}
          </Button>
          <FormControl.Feedback />
        </FormGroup>
        {this.renderErrors()}
      </form>;
    }
    return teacherForm;
  },

  getFormData() {
    let data = {};

    _.forIn(this.state.teacher, (value, key) => {
      let transformedKey = `teacher[${key}]`;
      data[transformedKey] = value;
    });

    return data;
  }

});

export default withTranslation("registration")(RegisterTeacher);
