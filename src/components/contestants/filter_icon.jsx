// @flow

import React from "react";

import ctx from "classnames";

import "../../main.less";


export default class FilterIcon extends React.Component {
  toggleCategory() {
    this.props.toggleCategory(this.props.category);
  }

  render() {
    let parentClasses = ctx({
      "round-icon": true,
      "inactive": (this.props.currentCategory !== this.props.category)
    });
    let childClasses = ctx("section-icon", this.props.category);

    return <div onClick={this.toggleCategory} className={parentClasses}>
      <span className={childClasses} />
    </div>;
  }

}
