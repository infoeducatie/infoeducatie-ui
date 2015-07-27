"use strict";

import React from "react";

import "../main.less";

export default class CloudCount extends React.Component {
  static displayName = "CloudCount"
  static propTypes = { count: React.PropTypes.number }


  render() {
    return <div className="cloud-count">
      {this.props.count}
    </div>;
  }
}
