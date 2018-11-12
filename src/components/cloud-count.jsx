// @flow

import React from "react";

import "../main.less";

type Props = {
  count: number
}

export default class CloudCount extends React.Component<Props> {
  render() {
    return <div className="cloud-count">
      {this.props.count}
    </div>;
  }
}
