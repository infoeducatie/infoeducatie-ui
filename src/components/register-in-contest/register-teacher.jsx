"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import { FormControl, ControlLabel, FormGroup, Button } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
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

  onChange(field, event) {
    let teacher = _.clone(this.state.teacher);
    teacher[field] = event.target.value;
    this.setState({ teacher: teacher });
  },

  render() {
    let teacherForm = <p className="alert alert-warning">
        Sunteți deja înregistrat.
    </p>;

    if (this.props.is_contestant) {
      teacherForm = <p className="alert alert-warning">
          Sunteți deja înregistrat.
      </p>;
    } else if (!this.props.is_teacher) {
      teacherForm = <form onSubmit={this.onFormSubmit} className="RegisterTeacher">
        <FormGroup>
          <ControlLabel>Gen *</ControlLabel>
          <FormControl componentClass="select"
                 onChange={this.onChange.bind(this, "sex")}>
            <option value="1">Masculin</option>
            <option value="2">Feminin</option>
            <option value="3">Nespecificat</option>
          </FormControl>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Număr de telefon *</ControlLabel>
          <FormControl
            type="text"
            placeholder="0721234567"
            pattern="[0-9]{10}"
            title="Numărul de telefon trebuie să conțină doar 10 caractere numerice"
            onChange={this.onChange.bind(this, "phone_number")}
            required />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Școala *</ControlLabel>
          <FormControl
            type="text"
            placeholder="Liceul Numărul 9"
            onChange={this.onChange.bind(this, "school_name")}
            required />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Orașul școlii *</ControlLabel>
          <FormControl
            type="text"
            placeholder="București"
            onChange={this.onChange.bind(this, "school_city")}
            required />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Județul școlii *</ControlLabel>
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
            <option value="Alt județ">Alt județ(altă țară)</option>
          </FormControl>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Țara școlii *</ControlLabel>
          <FormControl
            type="text"
            placeholder="România"
            onChange={this.onChange.bind(this, "school_country")}
            required />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <Button type="submit"
                  disabled={this.state.waitingForServerResponse}>
            Înscrie-te
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
