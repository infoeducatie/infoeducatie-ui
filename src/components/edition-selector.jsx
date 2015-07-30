"use strict";

import $ from "jquery";
import _ from "lodash";
import ajax from "../lib/ajax"
import {Input} from "react-bootstrap";
import React from "react";


export default class EditionSelector extends React.Component {
  static displayName = "EditionSelector"
  static propTypes = {
    onCallback: React.PropTypes.func.isRequired,
    filters: React.PropTypes.array,
    filter: React.PropTypes.string
  }

  state = {
    editions: [],
    selectedEditionId: 0
  }

  componentDidMount() {
    let params = {};
    _.forEach(this.getFilterList(), (filter) => {
      params[filter] = 'true'
    });

    ajax({
      endpoint: "editions.json?" + $.param(params),
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
      {this.state.editions.map(this.renderEdition)}
    </Input>
  }

  renderEdition = (edition) => {
    return (
      <option key={edition.id}
                        value={edition.id}>
        Ediția {edition.name}
      </option>
    );
  }

  onEditionChange = (event) => {
    let id = parseInt(event.target.value);
    let edition = _.find(this.state.editions, "id", id);

    this.props.onCallback(edition);
    this.setState({ selectedEditionId: id });
  }

  getFilterList() {
    if (this.props.filter) {
      return [this.props.filter];
    } else {
      return this.props.filters
    }
  }
}
