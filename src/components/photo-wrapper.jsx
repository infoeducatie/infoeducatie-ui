"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
export default createLegacyComponent({
  displayName: "PhotoWrapper",

  render() {
    return <div className="photo-cover-wrapper">
        <div className="photo-cover">
          <a href={this.props.link} target="_blank"
             aria-label={this.props.ariaLabel}
             className="photo-album-link" rel="noreferrer">
            <div
              className="cover"
              style={{ backgroundImage: `url("${this.props.coverImageUrl}")` }}
            />
            <span className="more-details">{this.props.text || "Fotografii"}</span>
          </a>
        </div>
        <div className="album-title">
          <span className="pink-dash" />
            {this.props.title}
          <span className="pink-dash" />
        </div>
    </div>;
  }
});
