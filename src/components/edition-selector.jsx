"use strict";

import Ajax from "../lib/ajax"
import {Input} from "react-bootstrap";
import React from "react";


export default class EditionSelector extends React.Component {
  static displayName = "EditionSelector";
  static propTypes = {
    currentEditionId: React.PropTypes.number,
    onCallback: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editions: []
    };
  }

  componentDidMount() {
    Ajax("editions.json", (data) => {
      this.setState({ editions: data });
    });
  }

  render = () => {
    return <Input type="select" onChange={this.onEditionChange}>
      {this.state.editions.map((edition) => {
        return <option key={edition.id}
                       value={edition.id}>
          Ediția {edition.year}
        </option>;
      })}
    </Input>
  }

  onEditionChange(event) {
    let id = parseInt(event.target.value);
    this.setState({ selectedEditionId: id });
    this.props.onCallback(id);
  }
}
