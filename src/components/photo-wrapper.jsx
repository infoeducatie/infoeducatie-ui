"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { ArrowUpRight } from "lucide-react";

export default createLegacyComponent({
  displayName: "PhotoWrapper",

  render() {
    return <article className="photo-cover-wrapper">
      <a href={this.props.link} target="_blank"
         aria-label={this.props.ariaLabel}
         className="photo-album-link" rel="noreferrer">
        <div className="photo-cover">
          <div
            className="cover"
            style={{ backgroundImage: `url("${this.props.coverImageUrl}")` }}
          />
          <span className="more-details">{this.props.text || "Fotografii"}</span>
        </div>
        <div className="album-title">
          <span>{this.props.title}</span>
          <span className="album-link-icon" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={2} />
          </span>
        </div>
      </a>
    </article>;
  }
});
