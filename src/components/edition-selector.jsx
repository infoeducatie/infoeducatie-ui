"use strict";

import _ from "lodash";
import ajax from "../lib/ajax"
import {Input} from "react-bootstrap";
import React from "react";


export default class EditionSelector extends React.Component {
  static displayName = "EditionSelector";
  static propTypes = {
    onCallback: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editions: [],
      selectedEditionId: 0
    };
  }

  componentDidMount() {
    ajax({
      endpoint: "editions.json",
      success: (data) => {
        let currentEdition = _.find(data, "current");

        this.setState({
          editions: data,
          selectedEditionId: currentEdition.id
        });
      }
    });
  }

  render = () => {
    return <Input type="select"
                  onChange={this.onEditionChange}
                  value={this.state.selectedEditionId}>
      {this.state.editions.map((edition) => {
        return <option key={edition.id}
                       value={edition.id}>
          Ediția {edition.year}
        </option>;
      })}
    </Input>
  }

  onEditionChange = (event) => {
    let id = parseInt(event.target.value);
    let edition = _.find(this.state.editions, "id", id);

    this.props.onCallback(edition);
    this.setState({ selectedEditionId: id });
  }
}
