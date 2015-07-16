"use strict";

import React from "react";
import ctx from "classnames";


export default React.createClass({
  displayName: "PhotoWrapper",

  render() {
    var className = ctx("cover", "year-" + this.props.year,
                        {hover: this.props.hovered});
    return <div className="photo-cover-wrapper">
        <div className="photo-cover">
          <a href={this.props.link} target="_blank"
             className={this.props.year}
             onMouseOver={this.props.onHover}>
            <div className={className}></div>
            <div className="more-details">{this.props.text || "Fotografii"}</div>
          </a>
        </div>
        <div className="year">
          <span className="pink-dash" />
            {this.props.year}
          <span className="pink-dash" />
        </div>
    </div>;
  }
});
