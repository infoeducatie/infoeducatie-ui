"use strict";

import { toQueryString } from "@lib/request";

import _ from "lodash";
import PropTypes from "prop-types";
import ajax from "../lib/ajax"
import {FormControl} from "@ui/bootstrap";
import React from "react";
import { withTranslation } from "react-i18next";


class EditionSelector extends React.Component {
  static displayName = "EditionSelector"
  static propTypes = {
    ariaLabel: PropTypes.string,
    id: PropTypes.string,
    onCallback: PropTypes.func.isRequired,
    filters: PropTypes.array,
    filter: PropTypes.string
  }

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
      endpoint: "editions.json?" + toQueryString(params),
      success: this.updateEditions.bind(this)
    });
  }

  updateEditions(data) {
    let selectedEdition = _.last(data);

    this.setState({
      editions: data,
      selectedEditionId: selectedEdition ? selectedEdition.id : 0
    });
  }

  render = () => {
    let selectedEdition = _.find(this.state.editions, {
      id: this.state.selectedEditionId,
    });
    let selectedLabel = selectedEdition
      ? this.props.t("edition.label", { edition: selectedEdition.name })
      : "";

    return <>
      <FormControl componentClass="select"
                  id={this.props.id}
                  aria-label={this.props.ariaLabel}
                  aria-busy={!this.state.editions.length}
                  disabled={!this.state.editions.length}
                  onChange={this.onEditionChange}
                  title={selectedLabel}
                  value={this.state.selectedEditionId}>
      {!this.state.editions.length ? (
        <option value="0">{this.props.t("edition.loading")}</option>
      ) : null}
      {this.state.editions.map(this.renderEdition)}
      </FormControl>
      {selectedLabel ? (
        <p aria-live="polite" className="selected-edition-name">
          {selectedLabel}
        </p>
      ) : null}
    </>
  }

  renderEdition = (edition) => {
    return (
      <option key={edition.id}
                        value={edition.id}>
        {this.props.t("edition.label", { edition: edition.name })}
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

export default withTranslation("public")(EditionSelector);
