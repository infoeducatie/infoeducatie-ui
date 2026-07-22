"use strict";

import React from "react";
import PropTypes from "prop-types";

import "../main.less";

export default class CloudCount extends React.Component {
  static displayName = "CloudCount"
  static propTypes = { count: PropTypes.number }


  render() {
    return <div className="cloud-count">
      {this.props.count}
    </div>;
  }
}
