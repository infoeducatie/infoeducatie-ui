"use strict";

import React from "react";
import PropTypes from "prop-types";
import { MessageCircle } from "lucide-react";

import "../main.less";

export default class CloudCount extends React.Component {
  static displayName = "CloudCount"
  static propTypes = { count: PropTypes.number }


  render() {
    return <span className="cloud-count">
      <MessageCircle aria-hidden="true" size={18} />
      <span>{this.props.count}</span>
    </span>;
  }
}
