"use strict";
import React from "react";

import ctx from "classnames";

import "./filter_icon.less";


export default React.createClass({
  displayName: "FilterIcon",

  toggleCategory() {
    this.props.toggleCategory(this.props.category);
  },

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

});
