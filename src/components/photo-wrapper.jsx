"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
export default createLegacyComponent({
  displayName: "PhotoWrapper",

  render() {
    const className = `cover year-${this.props.year}`;
    return <div className="photo-cover-wrapper">
        <div className="photo-cover">
          <a href={this.props.link} target="_blank"
             aria-label={this.props.ariaLabel}
             className="photo-album-link" rel="noreferrer">
            <div className={className}></div>
            <span className="more-details">{this.props.text || "Fotografii"}</span>
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
