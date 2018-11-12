// @flow

import $ from "jquery";
import _ from "lodash";
import ajax from "../lib/ajax"
import {FormControl} from "react-bootstrap";
import React from "react";

type Props = {
  onCallback: Function,
  filters: Array,
  filter: string
}

export default class EditionSelector extends React.Component<Props> {
  state = {
    editions: [],
    selectedEditionId: 0
  }

  componentDidMount() {
    let params = {};
    _.forEach(this.getFilterList(), (filter) => {
      params[filter] = "true";
    });

    ajax({
      endpoint: "editions.json?" + $.param(params),
      success: this.updateEditions.bind(this)
    });
  }

  updateEditions(data) {
    let selectedEdition = _.last(data);

    this.setState({
      editions: data,
      selectedEditionId: selectedEdition.id
    });
  }

  render = () => {
    return <FormControl componentClass="select"
                  onChange={this.onEditionChange}
                  value={this.state.selectedEditionId}>
      {this.state.editions.map(this.renderEdition)}
    </FormControl>
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
    let edition = _.find(this.state.editions, {"id": id});

    this.props.onCallback(edition);
    this.setState({ selectedEditionId: id });
  }

  getFilterList() {
    if (this.props.filter) {
      return [this.props.filter];
    } else {
      return this.props.filters;
    }
  }
}
